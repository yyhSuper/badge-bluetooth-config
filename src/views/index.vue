<template>
  <div>
    <div class="showLog_Wrap">
      <el-button @click="showLog" v-show="!isShowLog" type="primary" size="mini">显示log</el-button>
      <el-button @click="closeLog" v-show="isShowLog" type="info" size="mini">关闭log</el-button>
    </div>
    <div id="consoleOutput" v-show="isShowLog"></div>
    <el-container class="main-wrap">

      <div class="nav">
        <div class="logo-wrap">
          <img src="../assets/img/logo.png" alt="" class="logo">
          <h1>Badge Settings</h1>
        </div>

        <div class="header-button-wrap">
          <el-button size="mini" type="primary" @click="connectToDevice" :disabled="isConnected">Connect</el-button>
          <el-button size="mini" type="danger" @click="rebootDevice":disabled="!isConnected">Restart</el-button>
        </div>

      </div>
      <el-main class="index-main">
        <div class="title-wrap"><h1 class="title">Device Information</h1></div>
        <el-card class="box-card">
          <div class="list-list">
            <div class="list-item">
              <div class="list-item-body">
                <div class="list-item-body-item noBorder">
                  <div class="item-label">deviceSn：</div>
                  <div class="list-item-button-wrap">
                    <span>V1.5452.454</span>
                  </div>
                </div>
                <div class="list-item-body-item noBorder">
                  <div class="item-label">Firmware version：</div>
                  <div class="list-item-button-wrap">
                    <span>V1.5452.454</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </el-card>
        <div class="title-wrap"><h1 class="title">WIFI Network</h1></div>
        <el-card class="box-card">
          <div class="card-title">Connected</div>
          <div class="list-list">
            <div class="list-item">
              <div class="list-item-body">
                <div class="list-item-body-item" v-for="(item,index) in isConnectList" :key="index">
                  <div class="item-label">Chinanet-001</div>
                  <div class="list-item-button-wrap">
                    <el-icon class="el-icon-success icon"/>
                    <el-button size="mini" type="primary" :disabled="!isConnected">Forget</el-button>
                  </div>
                </div>
                <div v-show="isConnectList.length===0">
                  <el-empty :image-size="50" :description="noDataString"></el-empty>
                </div>
              </div>

            </div>
          </div>
          <div class="card-title">Memory List</div>
          <div class="list-list">
            <div class="list-item">
              <div class="list-item-body">
                <div class="list-item-body-item" v-for="(item,index) in memoryList" :key="index">
                  <div class="item-label">Chinanet-001</div>
                  <div class="list-item-button-wrap">
                    <el-button size="mini" type="primary" :disabled="!isConnected">Forget</el-button>
                  </div>
                </div>
                <div v-show="memoryList.length===0">
                  <el-empty :image-size="50" :description="noDataString"></el-empty>
                </div>

              </div>

            </div>
          </div>
          <div class="card-title">Other Networks</div>
          <div class="list-list">
            <div class="list-item">
              <div class="list-item-body">
                <div class="list-item-body-item" v-for="(item,index) in otherList" :key="index">
                  <div class="item-label">Chinanet-001</div>
                  <div class="list-item-button-wrap">
                    <el-input placeholder="请输入WiFi密码" size="mini" class="input-item"
                              :disabled="!isConnected"></el-input>
                    <el-button size="mini" type="primary" :disabled="!isConnected">Connect</el-button>
                  </div>
                </div>
                <div v-show="memoryList.length===0">
                  <el-empty :image-size="50" :description="noDataString"></el-empty>
                </div>
              </div>

            </div>
          </div>

        </el-card>
        <div class="title-wrap">
          <h1 class="title">SaaS Platform</h1>
          <div class="icon-wrap">
            <span class="iconfont icon-baocun"></span>
            <span class="iconfont icon-bianji"></span>
          </div>
        </div>
        <el-card class="box-card">
          <el-form>
            <el-form-item label="IP Address：">
              <el-input placeholder="Please enter the IP address" v-model="SaaSForm.ip"
                        :disabled="!isConnected"></el-input>
            </el-form-item>
            <el-form-item label="Port：">
              <el-input placeholder="Please enter the port number" v-model="SaaSForm.port"
                        :disabled="!isConnected"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
        <div class="title-wrap">
          <h1 class="title">Sound Recording</h1>
          <div class="icon-wrap">
            <span class="iconfont icon-baocun"></span>
            <span class="iconfont icon-bianji"></span>
          </div>
        </div>
        <el-card class="box-card">
          <el-form label-width="220px">
            <el-form-item label="Maximum duration (seconds)：">
              <el-input placeholder="" type="number" :disabled="!isConnected"></el-input>
            </el-form-item>
            <el-form-item label="Automatically start work：">
              <el-switch
                v-model="recordingForm.isOpenToWork"
                :disabled="!isConnected"
                active-color="#13ce66" active-text="ON" inactive-text="OFF"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="automatically leave work：">
              <el-switch
                v-model="recordingForm.isCloseToWork"
                :disabled="!isConnected"
                active-color="#13ce66" active-text="ON" inactive-text="OFF"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-form>
        </el-card>
        <div class="title-wrap">
          <h1 class="title">USB Unlock</h1>
          <div class="icon-wrap">
            <span class="iconfont icon-baocun"></span>
            <span class="iconfont icon-bianji"></span>
          </div>
        </div>
        <el-card class="box-card">
          <el-form label-width="120px">
            <el-form-item label="USB Unlock：">
              <el-switch
                v-model="USBForm.USBUnlock"
                :disabled="!isConnected"
                active-color="#13ce66" active-text="ON" inactive-text="OFF"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-form>
        </el-card>
        <div class="title-wrap">
          <h1 class="title">Restore factory settings</h1>
          <div class="icon-wrap"></div>
        </div>
        <el-card class="box-card">
          <div class="warning-wrap">
            <div class="warning-wrap-title">Warning clause</div>
            <div class="warning-wrap-body">
              <p>1. Your modified settings will be restored to default settings</p>
              <p>2. Your machine needs to be reset before it can work properly</p>
              <p>3. Your firmware version remains unchanged and cannot be restored to the default firmware</p>
            </div>
            <div class="warning-wrap-button-wrap">
              <el-button size="mini" type="danger" :disabled="!isConnected">I have read the warning and I want to restore
                the menu
              </el-button>
            </div>
          </div>


        </el-card>
      </el-main>
    </el-container>


  </div>


</template>
<script>

// 导入组件
import TopNav from "../components/TopNav.vue";
import BluetoothDeviceManager from '../api/bluetoothCommands'; // 引入蓝牙命令模块
export default {
  name: 'index',
  data() {
    return {
      isShowLog:false,
      isConnected: false,//标记是否已连接设备
      deviceOption: {
        // deviceNamePrefix: {namePrefix: 'EM'},
        deviceNamePrefix: {namePrefix: 'BSF_'},
        serviceId: '0000fee0-0000-1000-8000-00805f9b34fb',
        characteristicWriteChannelId: '0000fee3-0000-1000-8000-00805f9b34fb',
        characteristicReadChannelId: '0000fee3-0000-1000-8000-00805f9b34fb',
        characteristicWriteChannel: null,
        characteristicReadChannel: null,
        connect: false
      },
      device: null,//蓝牙设备对象
      service: null,//蓝牙GATT服务器对象
      characteristic: null,//蓝牙特征对象
      isWifiList: true,
      isConnectList: [//连接列表

      ],
      memoryList: [//记忆列表

      ],
      otherList: [
        //其他网络
      ],
      noDataString: 'No data yet',
      SaaSForm: {//SaaS平台
        ip: null,//IP地址
        port: null,//端口
      },
      recordingForm: {//录音
        maxTime: null,//最大时长
        isOpenToWork: false,//开机自动上班
        isCloseToWork: false,//关机自动下班
      },
      USBForm: {//U盘解锁
        USBUnlock: false,//U盘解锁
      }


    }
  },
  computed: {},
  // 监听语言变化
  watch: {},

  // 注册组件
  components: {
    TopNav

  },
  created() {


  },
  mounted() {

    this.checkBluetoothSupport();
    this.init();
    this.setup();

  },
  methods: {

    async init() {
      //初始化

    },
    logSomething() {
      console.log('这是一个测试日志');
    },
    setup() {
      // 保存原始的 console.log 方法
      let originalConsoleLog = console.log;

      // 覆盖 console.log 方法
      console.log = function () {
        const outputDiv = document.getElementById('consoleOutput');
        const newLog = document.createElement('p');
        const timestamp = `[${new Date().toLocaleString()}]`;
        const logMessage = `${timestamp} ${Array.from(arguments).join(' ')}`;

        newLog.textContent = logMessage;
        outputDiv.appendChild(newLog);
        originalConsoleLog.apply(console, arguments);
      };
    },

     toggleConsoleOutput() {
      var consoleOutput = document.querySelector('.console-output');
      consoleOutput.style.display = consoleOutput.style.display === 'none' ? 'block' : 'none';
    },
    async connectToDevice() {
      let isSupport = this.checkBluetoothSupport()
      console.log(isSupport)
      if (isSupport) {
        //当前浏览器支持连接蓝牙设备
        this.onReadConnectClick().then(res => {
          if (this.deviceOption.connect) {
            // 连接成功
            this.isConnected = true
          }
        })
      }
    },
    /*
       准备开始连接蓝牙
       */
    async onReadConnectClick() {
      try {
        if (!this.device || !this.deviceOption.connect) {
          // 扫码蓝牙设备
          await this.startScan();
          // 获取蓝牙Servcie服务
          await this.getServcie();
          // 获取GATT服务
          await this.connectDeviceAndCacheCharacteristics();
          // 读取WiFi热点列表
          this.fetchMemorizedWifiList().then(() => {

          });
         /* // 读SasS平台配置
          await this.getSaaS();
          //读录音配置
          await  this.getRecord();*/
          //读U盘配置
        }
      } catch (error) {
        console.log('Argh! ' + error);
        alert('Argh! ' + error);
      }
    },
    /*
        扫描蓝牙设备
       */
    async startScan() {
      console.log('Requesting any Bluetooth Device...');

      try {
        const config={
          // filters: [] ,/*<- Prefer filters to save energy & show relevant devices.*/
          // filters: [this.deviceOption.deviceNamePrefix],
          acceptAllDevices: true,// 不设置 filters 以显示所有设备
          optionalServices: [this.deviceOption.serviceId]
        }
        const  device = await navigator.bluetooth.requestDevice(config);
        // 尝试连接到GATT服务器
        const server = await device.gatt.connect();

        // 获取指定的蓝牙服务
        const service = await server.getPrimaryService('0000fee0-0000-1000-8000-00805f9b34fb');

        // 获取服务中的特征，用于后续的读写操作
        const characteristic = await service.getCharacteristic('0000fee3-0000-1000-8000-00805f9b34fb');

        // 保存连接信息到组件状态
        this.device = device;
        this.server = server;
        this.service = service;
        this.characteristic = characteristic;
        this.isConnected = true; // 更新连接状态

        console.log('已连接到设备:', JSON.stringify(device));
        // 开始监听设备的通知（如果需要）
        //this.startNotifications();
        this.device.addEventListener('gattserverdisconnected', this.handleDisconnected.bind(this));


      } catch (error) {
        console.error('Error requesting Bluetooth device:', error);
        console.error('连接设备失败:', error);
        this.isConnected = false; // 确保连接失败时标记为未连接状态
      }
    },
    /*
       处理断开蓝牙连接
       */
    async handleDisconnected() {
      console.log('> Bluetooth Device disconnected');
      try {
        this.rest()
        this.isConnected = false
      } catch (error) {
        this.$message.error('Argh! ' + error)

      }
    },
    /*
       重置全局设备变量
       */
    rest() {
      this.device = '';
      this.deviceOption.connect = false;
      console.log('设备已断开连接');
      this.isConnected = false; // 更新状态为未连接
      this.device = null; // 清空设备信息
      this.server = null; // 清空服务器信息
      this.service = null; // 清空服务信息
      this.characteristic = null; // 清空特征信息
    },
    /*
        获取service服务
        */
    async getServcie() {
      console.log('获取蓝牙Servcie服务')
      console.log('Connecting to GATT Server...');
      const server = await this.device.gatt.connect();
      this.deviceOption.connect = await this.device.gatt.connected;
      console.log('Getting Service...');
      this.service = await server.getPrimaryService(this.deviceOption.serviceId);
    },
    /* // 获取GATT服务*/
    async connectDeviceAndCacheCharacteristics() {
      console.log('获取GATT服务')
      this.deviceOption.characteristicWriteChannel = await this.service.getCharacteristic(this.deviceOption.characteristicWriteChannelId);
      this.deviceOption.characteristicReadChannel = await this.service.getCharacteristic(this.deviceOption.characteristicReadChannelId);
    },

    // 写指令
    writeCommand(characteristic, data) {
      return new Promise((resolve, reject) => {
        characteristic.writeValue(new TextEncoder().encode(JSON.stringify(data)))
          .then(() => {
            console.log('Command send success', data);
            this.$message.success('Command send success')
            resolve();
          })
          .catch(error => {
            console.error('指令发送失败:', error);
            this.$message.error('指令发送失败:', error)
            reject(error);
          });
      });
    },

    // 重启设备的命令
    async rebootDevice() {
      return new Promise(async (resolve,reject) => {
        let loading=this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 构建重启设备的JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 100, // 命令ID，用于匹配请求和响应
          method: "reboot", // 调用的方法名
          params: null // 此命令不需要参数
        };
        await this.startNotifications();
        // 发送命令
        const res=await this.writeCommand(this.deviceOption.characteristicWriteChannel,command);
        //延迟200毫秒关闭加载
        await new Promise(resolve => setTimeout(resolve, 200));
        loading.close()
        reject(res)
      })
    },

    /*
      读取WiFi热点列表
      */
    async fetchMemorizedWifiList() {
      console.log('读取WiFi热点列表')
      return new Promise(async (resolve,reject) => {
        let loading=this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 201, // 命令ID，用于匹配请求和响应
          method: "getWiFiList", // 调用的方法名
          params: null // 此命令不需要参数
        };
        await this.startNotifications();

        // 发命令
        const res=await this.writeCommand(this.deviceOption.characteristicWriteChannel,command);

        loading.close()
        resolve(res)

      });
    },
    /*
      连接指定WiFi热点
      */
    async getWifiBYSSID(ssid,pwd) {
      console.log('连接指定WiFi热点')
      return new Promise(async (resolve,reject) => {
        let loading=this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 202, // 命令ID，用于匹配请求和响应
          method: "connectWiFi", // 调用的方法名
          params:{
            ssid:ssid,
            password: pwd
          }
        };
        await this.startNotifications();
        // 发命令
        const res=await this.writeCommand(this.deviceOption.characteristicWriteChannel,command);
        //延迟200毫秒关闭加载
        await new Promise(resolve => setTimeout(resolve, 200));
        loading.close()
        reject(res)
      });
    },
    /*
      忘记指定WiFi热点
      */
    async forgetWifiBySSID(ssid) {
      console.log('忘记某Wi-Fi')
      return new Promise(async (resolve,reject) => {
        let loading=this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 203, // 命令ID，用于匹配请求和响应
          method: "forgetWiFi", // 调用的方法名
          params:{
            ssid:ssid
          }
        };
        await this.startNotifications();
        // 发命令
        const res=await this.writeCommand(this.deviceOption.characteristicWriteChannel,command);
        //延迟200毫秒关闭加载
        await new Promise(resolve => setTimeout(resolve, 200));
        loading.close()
        reject(res)
      });
    },
    /*
      读SasS平台配置
      */
    async getSaaS() {
      console.log('读SasS平台配置')
      return new Promise(async (resolve,reject) => {
        let loading=this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 204, // 命令ID，用于匹配请求和响应
          method: "getSaaS", // 调用的方法名
          params:null
        };
        await this.startNotifications();
        // 发命令
        const res=await this.writeCommand(this.deviceOption.characteristicWriteChannel,command);
        //延迟200毫秒关闭加载
        await new Promise(resolve => setTimeout(resolve, 200));
        loading.close()
        reject(res)
      });
    },
    /*
      写入SasS平台修改配置
      */
    async setSaaS(ipAddress,port) {
      console.log('写入SasS平台修改配置')
      return new Promise(async (resolve,reject) => {
        let loading=this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 205, // 命令ID，用于匹配请求和响应
          method: "setSaaS", // 调用的方法名
          params:{
            ipAddress: ipAddress,
            port: port
          }
        };
        await this.startNotifications();
        // 发命令
        const res=await this.writeCommand(this.deviceOption.characteristicWriteChannel,command);
        //延迟200毫秒关闭加载
        await new Promise(resolve => setTimeout(resolve, 200));
        loading.close()
        resolve(res)
      });
    },
    /*
      读录音配置
      */
    async getRecord() {
      console.log('getRecord')
      return new Promise(async (resolve,reject) => {
        let loading=this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 206, // 命令ID，用于匹配请求和响应
          method: "getRecord", // 调用的方法名
          params:null


        };
        
        // 发命令
        const res=await this.writeCommand(this.deviceOption.characteristicWriteChannel,command);
        await this.startNotifications();
        //延迟200毫秒关闭加载
        await new Promise(resolve => setTimeout(resolve, 200));
        loading.close()
        resolve(res)
      });
    },
    /*
      写录音配置
      */
    async setRecord(maxRecordDuration,autoOnDutyWhenPowerOn,autoOffDutyWhenPowerDown) {
      console.log('写入录音修改配置')
      return new Promise(async (resolve,reject) => {
        let loading=this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 207, // 命令ID，用于匹配请求和响应
          method: "setRecord", // 调用的方法名
          params:{
            maxRecordDuration ,
            autoOnDutyWhenPowerOn,
            autoOffDutyWhenPowerDown
          }
        };
        await this.startNotifications();
        // 发命令
        const res=await this.writeCommand(this.deviceOption.characteristicWriteChannel,command);
        //延迟200毫秒关闭加载
        await new Promise(resolve => setTimeout(resolve, 200));
        loading.close()
        resolve(res)
      });
    },
    /*
     读U盘配置
     */
    async getUStorage() {
      console.log('读U盘配置')
      return new Promise(async (resolve,reject) => {
        let loading=this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 208, // 命令ID，用于匹配请求和响应
          method: "getUStorage", // 调用的方法名
          params:null
        };
        await this.startNotifications();
        // 发命令
        const res=await this.writeCommand(this.deviceOption.characteristicWriteChannel,command);
        //延迟200毫秒关闭加载
        await new Promise(resolve => setTimeout(resolve, 200));
        loading.close()
        resolve(res)
      });
    },
    /*
     写入U盘修改配置
     */
    async setUStorage(unlockedStatus) {
      console.log('写入U盘修改配置')
      return new Promise(async (resolve,reject) => {
        let loading=this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 209, // 命令ID，用于匹配请求和响应
          method: "setUStorage", // 调用的方法名
          params:{
            unlocked:unlockedStatus
          }
        };
        await this.startNotifications();
        // 发命令
        const res=await this.writeCommand(this.deviceOption.characteristicWriteChannel,command);
        //延迟200毫秒关闭加载
        await new Promise(resolve => setTimeout(resolve, 200));
        loading.close()
        resolve(res)
      });
    },
    // 开始监听设备的通知
    async startNotifications() {
      return new Promise((resolve, reject) => {
        var characteristicReadChannel = this.deviceOption.characteristicReadChannel;
        console.log('Starting Notifications...');
        //// 启动特征的通知功能
        characteristicReadChannel.startNotifications()
          .then(() => {
            console.log('Notifications started');
            // 添加监听事件，当特征值改变时触发
            characteristicReadChannel.addEventListener('characteristicvaluechanged', this.handleCharacteristicvaluechanged);
            resolve();
          })
          .catch(error => {
            console.error('Notifications Error:', error);
            console.error('无法启动通知:', error);
            reject(error);
          });
      });
    },
    /**
     处理监听接收 GATT 通知
     */
    handleCharacteristicvaluechanged(event) {
      var value = event.target.value;
      var text = new TextDecoder().decode(value);
      console.log('返回的通知指令 -->', text);
      let response = JSON.parse(text);
      if (response.id === 100) {
       //重启设备
      }
      if (response.id === 201) {
        // 读取WiFi热点列表
        console.log('读取WiFi热点列表',JSON.stringify(response))

      }
      if (response.id === 202) {
        // 连接指定WiFi热点

      }
      if (response.id === 203) {
        // 忘记指定WiFi热点

      }
      if (response.id === 204) {
        // 读SasS平台配置

      }
      if (response.id === 205) {
        // 写入SasS平台修改配置

      }
      if (response.id === 206) {
        // 读录音配置

      }
      if (response.id === 207) {
        // 写入录音配置

      }
      if (response.id === 208) {
        // 读U盘配置

      }
      if (response.id === 208) {
        // 写入U盘修改配置

      }
      event.target.removeEventListener('characteristicvaluechanged', new function () {
        console.log('移除监听');
      });
      console.log(111);
    },
    // 构建记忆wifi模板
    appendMemorizrdWiFiList(wifiName) {
      // 构建记忆wifi模板
      this.memoryList.push(wifiName);

    },
    // 渲染邻里周围wifi列表
    appendAddingWiFiList(nearbyWifiListJson) {

      if (nearbyWifiListJson.code !== 0 && nearbyWifiListJson.code !== '0') {
        this.isConnected = false
        return;
      }
      var nearbyWifiList = nearbyWifiListJson.msg;
      if (!nearbyWifiList || nearbyWifiList.length <= 0) {
        this.isConnected = false
        return;
      }

    },
//  加载中逻辑
    toggleLoading(status, prefix) {

    },
    // 检查浏览器是否支持蓝牙
    checkBluetoothSupport() {
      // 检查浏览器是否支持蓝牙
      const isBluetoothSupported = !!navigator.bluetooth;
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
    ,
    showLog(){
      this.isShowLog = true
    },
    closeLog(){
      this.isShowLog = false;
    },


  },

  beforeUpdate() {
  },
  beforeDestroy() {

  },
  // 挂载前状态(里面是操作)
  beforeMount() {

  }
}
</script>
<style>
.showLog_Wrap{position: absolute;top:10px;right: 0;padding: 0 15px;}
#consoleOutput{position: absolute;right: 0;top:60px;width: 50%;background: rgba(0,0,0,.8);color: #fff;z-index: 999;padding: 30px;
height:auto;
  overflow-y: auto;
}

.nav {
  width: 700px;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  height: 60px;
  position: fixed;
  top: 0;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  background: #fff;
  padding: 0 15px;

  .logo-wrap {
    display: flex;
    height: 100%;
    align-items: center;

    .logo {
      display: inline-block;
      width: auto;
      height: 80%;
      margin-right: 10px;
    }
  }

  .header-button-wrap {
    display: flex;
    flex-direction: row;
  }
}

.main-wrap {
  width: 100%;
  padding-bottom: 60px;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .index-header {
    width: 100%;
  }

  .index-main {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0;

  }

  .title-wrap {
    margin: 20px auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;

    .title {
      font-size: 18px;
      font-weight: bold;

    }

    .icon-wrap {
      margin-left: 15px;
    }
  }


  .icon {
    color: green;
    font-size: 30px;
    margin-right: 15px;
  }

  .box-card {
    width: 100%;

    .card-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 15px;

    }

    .list-list {
      width: 100%;
      display: flex;

      .list-item {
        width: 100%;
        display: flex;
        margin-bottom: 15px;
        flex-direction: column;
        min-height: 35px;
        align-items: center;
        justify-content: center;

        .list-item-body {
          display: flex;
          flex-direction: column;
          width: 100%;

          .list-item-body-item {
            display: flex;
            width: 100%;

            border-bottom: 1px solid #ddd;
            padding: 10px 15px;
            flex-direction: row;

            .item-label {
              display: flex;
              flex-direction: row;
              align-items: center;
              width: 80%;
              flex: 1;
            }

            &.noBorder {
              border: none;
            }

          }

          .list-item-body-item:hover {
            background: rgba(64, 158, 255, 0.2);
            cursor: pointer;
          }
        }

        .list-item-button-wrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: right;

          .input-item {
            margin-right: 10px;
          }


        }
      }
    }

  }
}


.iconfont {
  font-size: 26px;
  color: #377DFF;

}

.warning-wrap {
  .warning-wrap-title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }

  .warning-wrap-body {
    p {
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 10px;
    }
  }

  .warning-wrap-button-wrap {
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  /* 移动端样式 */
  .nav {
    width: 100%;
    max-width: 100%;

    .logo-wrap {
      height: 100%;

      .logo {
        width: 80px;
        height: auto;

      }

      h1 {
        font-size: 12px;
      }
    }
  }

  .main-wrap {
    width: 100%;
    padding-bottom: 30px;

    .index-header {
      width: 100%;
    }

    .index-main {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      padding: 0 15px;

    }

    .title-wrap {
      margin: 10px auto;
      width: 100%;

      .title {
        font-size: 14px;


      }

      .icon-wrap {
        margin-left: 15px;
      }
    }


    .icon {
      color: green;
      font-size: 30px;
      margin-right: 15px;
    }

    .box-card {
      width: 100%;

      .card-title {
        font-size: 16px;
        margin-bottom: 5px;

      }

      .list-list {
        width: 100%;
        display: flex;

        .list-item {
          width: 100%;
          margin-bottom: 15px;
          min-height: 35px;

          .list-item-body {

            width: 100%;

            .list-item-body-item {

              .item-label {
                width: 80%;
              }

            }

            .list-item-body-item:hover {

            }
          }

          .list-item-button-wrap {

            .input-item {
              margin-right: 10px;
            }


          }
        }
      }

    }
  }


  .iconfont {
    font-size: 26px;
    color: #377DFF;

  }

  .warning-wrap {
    .warning-wrap-title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
    }

    .warning-wrap-body {
      p {
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 10px;
      }
    }

    .warning-wrap-button-wrap {
      padding-top: 20px;

    }
  }
}
</style>
