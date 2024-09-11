// bluetoothCommands.js

class BluetoothDeviceManager {
  constructor() {
    this.device = null; // 蓝牙设备对象
    this.server = null; // GATT服务器对象
    this.service = null; // 蓝牙服务对象
    this.characteristic = null; // 蓝牙特征对象
  }

  // 检查蓝牙支持
  checkBluetoothSupport() {
    // 检查浏览器是否支持蓝牙
    const isBluetoothSupported = !!navigator.bluetooth;
    if (!isBluetoothSupported) {
      console.log("当前浏览器不支持 Web Bluetooth API");
      return false;
    }

    const userAgent = navigator.userAgent;

    // Chrome 和 Edge 的最低版本要求
    const minAndroidChromeVersion = 56;
    const minPCChromeVersion = 70;
    const minEdgeVersion = 79;

    // 操作系统判断
    const isAndroid = /Android/.test(userAgent);
    const isMacOS = /Macintosh/.test(userAgent);
    const isWindows = /Windows/.test(userAgent);
    const isChromeOS = /CrOS/.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/.test(userAgent);  // iOS 设备

    // 判断是否是 Chrome 浏览器
    const isChrome = /Chrome\/(\d+)/.test(userAgent) && !/Edg/.test(userAgent) && !isIOS;
    const chromeVersion = isChrome ? parseInt(userAgent.match(/Chrome\/(\d+)/)[1]) : null;

    // 判断是否是 Edge 浏览器 (基于 Chromium 的 Edge)
    const isEdge = /Edg\/(\d+)/.test(userAgent);
    const edgeVersion = isEdge ? parseInt(userAgent.match(/Edg\/(\d+)/)[1]) : null;

    // 检查操作系统和版本信息
    if (!isBluetoothSupported) {
      console.log("当前浏览器不支持 Web Bluetooth API");
      return false;
    }

    if (isChrome) {
      if (isAndroid && chromeVersion >= minAndroidChromeVersion) {
        console.log(`Android Chrome 浏览器版本 ${chromeVersion} 支持 Web Bluetooth API`);
        return true;
      } else if ((isMacOS || isWindows || isChromeOS) && chromeVersion >= minPCChromeVersion) {
        console.log(`PC Chrome 浏览器版本 ${chromeVersion} 支持 Web Bluetooth API`);
        return true;
      } else if (chromeVersion < minPCChromeVersion) {
        console.log(`PC Chrome 浏览器版本 ${chromeVersion} 不支持 Web Bluetooth API，最低要求版本为 ${minPCChromeVersion}`);
        return false;
      } else if (chromeVersion < minAndroidChromeVersion) {
        console.log(`Android Chrome 浏览器版本 ${chromeVersion} 不支持 Web Bluetooth API，最低要求版本为 ${minAndroidChromeVersion}`);
        return false;
      } else {
        console.log("未能检测到明确的 Chrome 平台");
        return false;
      }
    } else if (isEdge) {
      if (edgeVersion >= minEdgeVersion) {
        console.log(`Edge 浏览器版本 ${edgeVersion} 支持 Web Bluetooth API`);
        return true;
      } else {
        console.log(`Edge 浏览器版本 ${edgeVersion} 不支持 Web Bluetooth API，最低要求版本为 ${minEdgeVersion}`);
        return false;
      }
    } else if (isIOS) {
      console.log("iOS Chrome 不支持 Web Bluetooth API");
      return false;
    } else {
      console.log("其他支持 Web Bluetooth API 的浏览器");
      return true; // 假设其他支持的浏览器无需版本检查
    }
  }

  // 连接蓝牙设备
  async connectToDevice(serviceId, writeCharacteristicId) {
    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [serviceId] }]
      });
      this.server = await this.device.gatt.connect();
      this.service = await this.server.getPrimaryService(serviceId);
      this.characteristic = await this.service.getCharacteristic(writeCharacteristicId);

      // 监听设备断开
      this.device.addEventListener('gattserverdisconnected', this.onDeviceDisconnected.bind(this));

      // 开始监听设备通知
      await this.startNotifications();

      console.log('已连接到设备:', this.device);
      return true;
    } catch (error) {
      console.error('连接设备失败:', error);
      return false;
    }
  }

  // 断开连接处理
  onDeviceDisconnected() {
    console.log('设备已断开连接');
    this.device = null;
    this.server = null;
    this.service = null;
    this.characteristic = null;
  }

  // 启动通知监听
  async startNotifications() {
    try {
      await this.characteristic.startNotifications();
      this.characteristic.addEventListener('characteristicvaluechanged', this.handleNotifications);
      console.log('开始监听设备通知');
    } catch (error) {
      console.error('无法启动通知:', error);
    }
  }

  // 处理设备通知
  handleNotifications(event) {
    const value = event.target.value;
    const decoder = new TextDecoder();
    const responseText = decoder.decode(value);
    const response = JSON.parse(responseText);
    console.log('收到设备响应:', response);
  }

  // 发送JSON-RPC命令
  async sendJsonRpcCommand(command) {
    if (!this.characteristic) {
      console.error('设备未连接或特征不可用');
      return;
    }
    try {
      const jsonCommand = JSON.stringify(command);
      const encoder = new TextEncoder();
      const commandBuffer = encoder.encode(jsonCommand);
      await this.characteristic.writeValueWithoutResponse(commandBuffer);
      console.log('命令发送成功:', command);
    } catch (error) {
      console.error('发送命令失败:', error);
    }
  }

  // 重启设备
  async rebootDevice() {
    const command = {
      jsonrpc: "2.0",
      id: 100,
      method: "reboot",
      params: null
    };
    await this.sendJsonRpcCommand(command);
  }
}

// 导出单例
export default new BluetoothDeviceManager();
