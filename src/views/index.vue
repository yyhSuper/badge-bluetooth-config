<template>
  <div>
    <div class="showLog_Wrap" v-if="isShowLogButton">
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
          <el-button size="mini" type="danger" @click="rebootDevice" :disabled="!isConnected">Restart</el-button>
        </div>

      </div>
      <el-main class="index-main">
        <!--        Device Information-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="title-wrap"><span class="title">Device Information</span></div>
            <!--            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div class="list-list">
            <div class="list-item">
              <div class="list-item-body">
                <div class="list-item-body-item noBorder">
                  <div class="item-label">deviceSn：</div>
                  <div class="list-item-button-wrap">
                    <span>{{ deviceInfo.SN }}</span>
                  </div>
                </div>
                <div class="list-item-body-item noBorder">
                  <div class="item-label">Firmware version：</div>
                  <div class="list-item-button-wrap">
                    <span>{{ deviceInfo.fwVersion }}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </el-card>
        <!--        WIFI Network-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="title-wrap"><span class="title">WIFI Network</span></div>
            <!--            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div class="list-list">
            <div class="list-item">
              <div class="list-item-body">
                <div class="list-item-body-item" :class="{ active: index === selectedWifiIndex }"
                     v-for="(item,index) in wifiList" v-bind:key="index" @click="selectWifi(item,item.type,index)">
                  <div class="item-label"><span class="iconfont icon-wifi wifi-icon icon"></span><span
                    class="wifi-name">{{ item.ssid }}</span></div>
                  <div class="list-item-button-wrap" v-show="item.type===1">
                    <el-icon class="el-icon-success icon"/>
                  </div>
                  <!--                  <div class="list-item-button-wrap" v-show="item.type===2">
                                      <el-icon class="iconfont icon-yibaocun icon" style="color: #eee"/>
                                    </div>-->
                </div>

                <div class="wifi-password">
                  <el-form :label-width="isMobile?'100px':'220px'" label-position="left" v-show="active_wifi_type===3">
                    <el-form-item label="Password：">
                      <el-input v-model="wifi_pwd" placeholder="Please enter WiFi password" size="mini"
                                class="input-item"
                                :disabled="!isConnected"></el-input>
                    </el-form-item>
                  </el-form>
                  <div class="todo-wifi-button-wrap">
                    <el-button size="mini" type="info"
                               v-show="active_wifi_type===1||active_wifi_type===2||active_wifi_type===3"
                               @click="cancelSelect">Cancel
                    </el-button>
                    <el-button size="mini" type="primary" :disabled="!isConnected"
                               v-show="active_wifi_type===1||active_wifi_type===2" @click="forgetWifiClick">Forget
                    </el-button>
                    <el-button size="mini" type="primary" :disabled="!isConnected" v-show="active_wifi_type===3"
                               @click="connectWifi">Connect
                    </el-button>
                  </div>


                </div>
                <div v-show="wifiList_scanned.length===0">
                  <el-empty :image-size="50" :description="noDataString"></el-empty>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <!--        SaaS Platform-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="title-wrap">
              <span class="title">SaaS Platform</span>
              <div class="icon-wrap">
                <span class="iconfont icon-baocun" v-show="SaaSFormIsEditor&&isConnected"
                      @click="saveForm('sass')"></span>
                <span class="iconfont icon-bianji" v-show="!SaaSFormIsEditor&&isConnected"
                      @click="editFrom('sass')"></span>
              </div>
            </div>
            <!--            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <el-form :label-width="isMobile?'100px':'220px'" label-position="left">
            <el-form-item label="IP Address：">
              <el-input placeholder="Please enter the IP address" v-model="SaaSForm.ipAddress"
                        :disabled="!SaaSFormIsEditor"></el-input>
            </el-form-item>
            <el-form-item label="Port：">
              <el-input placeholder="Please enter the port number" v-model="SaaSForm.port" type="number"
                        :disabled="!SaaSFormIsEditor"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
        <!--        Sound Recording-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="title-wrap">
              <span class="title">Sound Recording</span>
              <div class="icon-wrap">
                <span class="iconfont icon-baocun" v-show="recordingFormIsEditor&&isConnected"
                      @click="saveForm('recording')"></span>
                <span class="iconfont icon-bianji" v-show="!recordingFormIsEditor&&isConnected"
                      @click="editFrom('recording')"></span>
              </div>
            </div>
            <!--            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <el-form :label-width="isMobile?'260px':'220px'" label-position="left">
            <el-form-item label="Maximum duration (seconds)：">
              <el-input v-model="recordingForm.maxRecordDuration" placeholder="" type="number"
                        :disabled="!recordingFormIsEditor"></el-input>
            </el-form-item>
            <el-form-item label="Automatically start work：">
              <el-switch
                v-model="recordingForm.autoOnDutyWhenPowerOn"
                :disabled="!recordingFormIsEditor"
                active-color="#13ce66"
                inactive-color="#eee">
              </el-switch>
            </el-form-item>
            <el-form-item label="automatically leave work：">
              <el-switch
                v-model="recordingForm.autoOffDutyWhenPowerDown"
                :disabled="!recordingFormIsEditor"
                active-color="#13ce66"
                inactive-color="#eee">
              </el-switch>
            </el-form-item>
          </el-form>
        </el-card>
        <!--        USB Unlock-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="title-wrap">
              <span class="title">USB Unlock</span>
              <div class="icon-wrap">
                <span class="iconfont icon-baocun" v-show="USBFormIsEditor&&isConnected"
                      @click="saveForm('usb')"></span>
                <span class="iconfont icon-bianji" v-show="!USBFormIsEditor&&isConnected"
                      @click="editFrom('usb')"></span>
              </div>
            </div>
            <!--            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <el-form :label-width="isMobile?'260px':'220px'" label-position="left">
            <el-form-item label="USB Unlock：">
              <el-switch
                v-model="USBForm.unlocked"
                :disabled="!USBFormIsEditor"
                active-color="#13ce66"
                inactive-color="#eee">
              </el-switch>
            </el-form-item>
          </el-form>
        </el-card>
        <!--        Restore factory settings-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="title-wrap">
              <span class="title">Restore factory settings</span>
              <!--              <div class="icon-wrap">
                              <span class="iconfont icon-baocun"></span>
                              <span class="iconfont icon-bianji"></span>
                            </div>-->
            </div>
            <!--            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div class="warning-wrap">
              <div class="warning-wrap-box">
                  <div class="warning-wrap-title">Warning clause</div>
                  <div class="warning-wrap-body">
                      <p>1. Your modified settings will be restored to default settings</p>
                      <p>2. Your machine needs to be reset before it can work properly</p>
                      <p>3. Your firmware version remains unchanged and cannot be restored to the default firmware</p>
                  </div>
              </div>
              <div class="warning-wrap-button-wrap">
                  <el-button size="mini" type="danger" :disabled="!isConnected" @click="restoreFactorySettings">I have read
                      the warning and I want to restore
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
      isMobile: false,//是否为移动端
      isShowLog: false,//是否显示日志
      isShowLogButton: true,//是否显示日志按钮
      isConnected: false,//标记是否已连接设备
      deviceOption: {
        deviceNamePrefix: {namePrefix: 'BSF'},//蓝牙设备前缀
        serviceId: '0000fee0-0000-1000-8000-00805f9b34fb',//服务ID
        characteristicWriteChannelId: '0000fee3-0000-1000-8000-00805f9b34fb',//写入通道ID
        characteristicReadChannelId: '0000fee3-0000-1000-8000-00805f9b34fb',//读取通道ID
        characteristicWriteChannel: null,//写入通道对象
        characteristicReadChannel: null,//读取通道对象
        connect: false//标记是否已连接
      },
      device: null,//蓝牙设备对象
      service: null,//蓝牙GATT服务器对象
      characteristic: null,//蓝牙特征对象
      isWifiList: true,
      active_wifi_type: -1,//wifi类型:1已连接，2已记住，3已扫描
      active_wifi_obj: {},//当前选择的wifishit
      selectedWifiIndex: -1,//当前选择的wifi index
      wifi_pwd: '',//wifi密码
      wifiList: [
        //所有设备列表


      ],
      wifiList_connected: [
        //已连接的设备列表

      ],
      wifiList_memorized: [
        //已记忆的设备列表

      ],
      wifiList_scanned: [
        //已扫描到的设备列表

      ],

      noDataString: 'No data yet',//暂无数据
      deviceInfo: {
        // 设备信息
        SN: "",
        fwVersion: "",
      },
      SaaSFormIsEditor: false,//SaaS平台是否为编辑状态
      SaaSForm: {//SaaS平台
        ip: null,//IP地址
        port: null,//端口
      },
      recordingFormIsEditor: false,//录音是否为编辑状态
      recordingForm: {//录音
        maxRecordDuration: null,//最大时长
        autoOnDutyWhenPowerOn: false,//开机自动上班
        autoOffDutyWhenPowerDown: false,//关机自动下班
      },
      USBFormIsEditor: false,//U盘解锁是否为编辑状态
      USBForm: {//U盘解锁
        unlocked: false,//U盘解锁
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
    //获取浏览器的当前宽度，做兼容适配移动端
    let w = document.body.clientWidth;
    if (w <= 768) {
      this.isMobile = true;
    }
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    window.addEventListener('unload', this.handleUnload);
    this.checkBluetoothSupport();
    this.setup();

  },
  methods: {
    saveForm(type) {
      // TODO: 保存数据
      // this.SaaSFormIsEditor = false;
      if (type === 'sass') {
        // TODO: sass校验数据
        if (!this.SaaSForm.ipAddress) {
          this.$message.error('IP address cannot be empty');
          return;
        }
        if (!this.SaaSForm.port) {
          this.$message.error('Port cannot be empty');
          return;
        }
        //校验ip地址
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (!reg.test(this.SaaSForm.ipAddress)) {
          this.$message.error('IP address format error');
          return;
        }
        //端口转为整数类型
        this.SaaSForm.port = parseInt(this.SaaSForm.port);
        // TODO: 校验端口
        if (this.SaaSForm.port <= 0 || this.SaaSForm.port > 65535) {
          this.$message.error('Port range is 1-65535');
          return;
        }

        this.setSaaS(this.SaaSForm.ipAddress, this.SaaSForm.port).then(res => {
        })
      }
      if (type === 'recording') {

        // TODO: 校验录音数据
        if (!this.recordingForm.maxRecordDuration) {
          this.$message.error('Max recording duration cannot be empty');

          return;
        }
        //转整为整数
        this.recordingForm.maxRecordDuration = parseInt(this.recordingForm.maxRecordDuration);
        //TODO 校验录音时长并转为整数类型
        if (isNaN(this.recordingForm.maxRecordDuration)) {
          this.$message.error('Max recording duration must be a number');
          return;
        }


        this.setRecord(this.recordingForm.maxRecordDuration, this.recordingForm.autoOnDutyWhenPowerOn, this.recordingForm.autoOffDutyWhenPowerDown).then(res => {
        })
      }
      if (type === 'usb') {
        // TODO: U盘解锁
        this.setUStorage(this.USBForm.unlocked).then(res => {
        })
      }

    },
    editFrom(type) {
      // TODO: 显示编辑框
      if (type === 'sass') {
        this.SaaSFormIsEditor = true;
      } else if (type === 'recording') {
        this.recordingFormIsEditor = true;
      } else if (type === 'usb') {
        this.USBFormIsEditor = true;
      } else {
        return
      }

    },
    restoreFactorySettings() {
      // 恢复出厂设置
      this.restoreFactory().then(res => {

      }).catch(err => {
        this.$message.error(err);
      })
    },
    async init() {
      //初始化
      // 读设备信息
      await this.getDevice().then(() => {
        // 读取WiFi热点列表
        this.fetchMemorizedWifiList().then(() => {
          // 读SasS平台配置
          this.getSaaS().then(() => {
            // 读录音配置
            this.getRecord().then(() => {
              // 读U盘配置
              this.getUStorage().then(() => {

              })
            })
          })

        });
      })
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
      if (isSupport) {
        //当前浏览器支持连接蓝牙设备
        this.onReadConnectClick().then(res => {
          if (this.deviceOption.connect) {
            // 连接成功
            this.isConnected = true
              localStorage.setItem('isConnected', true);

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
          //数据初始化
          this.init()


        }
      } catch (error) {
        console.error('Argh! ' + error);
        this.$message.error(error);

      }
    },
    /*
        扫描蓝牙设备
       */
    async startScan() {
      console.log('Requesting  Bluetooth Device...');

      try {
        const config = {
          // filters: [] ,/*<- Prefer filters to save energy & show relevant devices.*/
          filters: [this.deviceOption.deviceNamePrefix],
          // acceptAllDevices: true,// 不设置 filters 以显示所有设备
          optionalServices: [this.deviceOption.serviceId]
        }
        const device = await navigator.bluetooth.requestDevice(config);
        // 尝试连接到GATT服务器
        const server = await device.gatt.connect();

        // 获取指定的蓝牙服务
        const service = await server.getPrimaryService(this.deviceOption.serviceId);

        // 获取服务中的特征，用于后续的读写操作
        const characteristic = await service.getCharacteristic(this.deviceOption.characteristicWriteChannelId);

        // 保存连接信息到组件状态
        this.device = device;
        this.server = server;
        this.service = service;
        this.characteristic = characteristic;
        this.deviceOption.connect = true;// 标记为已连接
        this.isConnected = true; // 更新连接状态
          //保存连接状态到localStorage
          localStorage.setItem('isConnected', 'true');


        console.log('已连接到设备:', JSON.stringify(device));
        // 开始监听设备的通知（如果需要）
        //this.startNotifications();
        this.device.addEventListener('gattserverdisconnected', this.handleDisconnected.bind(this));


      } catch (error) {
        console.error('Error requesting Bluetooth device:', error);
        // console.error('连接设备失败:', error);
       this.$message.error(error)
        this.isConnected = false; // 确保连接失败时标记为未连接状态
          localStorage.removeItem('isConnected');
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
          localStorage.removeItem('isConnected');
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
      this.isConnected = false; // 更新状态为未连接
      this.device = null; // 清空设备信息
      this.server = null; // 清空服务器信息
      this.service = null; // 清空服务信息
      this.characteristic = null; // 清空特征信息
      this.active_wifi_type=-1
      this.active_wifi_obj=null
      this.wifiList=[]
      this.wifiList_connected=[]
      this.wifiList_memorized=[]
      this.wifiList_scanned=[]
      this.deviceInfo={
        SN: "",
        fwVersion: "",
      }
      this.SaaSFormIsEditor=false
      this.SaaSForm={
        ip: null,//IP地址
        port: null,//端口
      }
      this.recordingFormIsEditor=false
      this.recordingForm={
        maxRecordDuration: null,//最大时长
        autoOnDutyWhenPowerOn: false,//开机自动上班
        autoOffDutyWhenPowerDown: false,//关机自动下班
      }
      this.USBFormIsEditor=false
      this.USBForm= {
        unlocked: false,//U盘解锁
      }

        localStorage.removeItem('isConnected');
    },
    /*
        获取service服务
        */
    async getServcie() {
      // console.log('获取蓝牙Servcie服务')
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
      let loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      return new Promise((resolve, reject) => {
        characteristic.writeValue(new TextEncoder().encode(JSON.stringify(data)))
          .then(() => {
            // console.log('Command send success', data);
            this.$message.success('Command send success')
            loading.close()
            resolve();
          })
          .catch(error => {
            console.error('指令发送失败:', error);
            this.$message.error('指令发送失败:', error)
            loading.close()
            reject(error);
          });
      });
    },

    // 重启设备的命令
    async rebootDevice() {
      return new Promise(async (resolve, reject) => {

        // 构建重启设备的JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 100, // 命令ID，用于匹配请求和响应
          method: "reboot", // 调用的方法名
          params: null // 此命令不需要参数
        };
        await this.startNotifications();
        // 发送命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);
        //延迟200毫秒关闭加载
        await new Promise(resolve => setTimeout(resolve, 200));

        resolve(res)
      })
    },
    /*
         读设备信息
         */
    async getDevice() {
      console.log('读设备信息')
      return new Promise(async (resolve, reject) => {

        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 210, // 命令ID，用于匹配请求和响应
          method: "getDevice", // 调用的方法名
          params: null // 此命令不需要参数
        };
        await this.startNotifications();
        // 发命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);
        resolve(res)

      });
    },
    /*
      读取WiFi热点列表
      */
    async fetchMemorizedWifiList() {
      console.log('读取WiFi热点列表')
      return new Promise(async (resolve, reject) => {

        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 201, // 命令ID，用于匹配请求和响应
          method: "getWiFiList", // 调用的方法名
          params: null // 此命令不需要参数
        };
        await this.startNotifications();

        // 发命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);


        resolve(res)

      });
    },
    /*
      连接指定WiFi热点
      */
    async connectWiFiBYSSID(ssid, pwd) {
      console.log('连接指定WiFi热点')
      return new Promise(async (resolve, reject) => {

        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 202, // 命令ID，用于匹配请求和响应
          method: "connectWiFi", // 调用的方法名
          params: {
            ssid: ssid,
            password: pwd
          }
        };
        await this.startNotifications();
        // 发命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);
        resolve(res)
      });
    },
    /*
      忘记指定WiFi热点
      */
    async forgetWifiBySSID(ssid) {
      console.log('忘记某Wi-Fi')
      return new Promise(async (resolve, reject) => {

        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 203, // 命令ID，用于匹配请求和响应
          method: "forgetWiFi", // 调用的方法名
          params: {
            ssid: ssid
          }
        };
        await this.startNotifications();
        // 发命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);
        resolve(res)
      });
    },
    /*
      读SasS平台配置
      */
    async getSaaS() {
      console.log('读SasS平台配置')
      return new Promise(async (resolve, reject) => {

        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 204, // 命令ID，用于匹配请求和响应
          method: "getSaaS", // 调用的方法名
          params: null
        };
        await this.startNotifications();
        // 发命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);
        //延迟200毫秒关闭加载
        await new Promise(resolve => setTimeout(resolve, 200));
        resolve(res)
      });
    },
    /*
      写入SasS平台修改配置
      */
    async setSaaS(ipAddress, port) {
      console.log('写入SasS平台修改配置')
      return new Promise(async (resolve, reject) => {
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 205, // 命令ID，用于匹配请求和响应
          method: "setSaaS", // 调用的方法名
          params: {
            ipAddress: ipAddress,
            port: parseInt(port)
          }
        };
        await this.startNotifications();
        // 发命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);
        resolve(res)
      });
    },
    /*
      读录音配置
      */
    async getRecord() {
      console.log('getRecord')
      return new Promise(async (resolve, reject) => {

        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 206, // 命令ID，用于匹配请求和响应
          method: "getRecord", // 调用的方法名
          params: null
        };
        await this.startNotifications();
        // 发命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);
        resolve(res)
      });
    },
    /*
      写录音配置
      */
    async setRecord(maxRecordDuration, autoOnDutyWhenPowerOn, autoOffDutyWhenPowerDown) {
      console.log('写入录音修改配置')
      return new Promise(async (resolve, reject) => {

        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 207, // 命令ID，用于匹配请求和响应
          method: "setRecord", // 调用的方法名
          params: {
            maxRecordDuration: parseInt(maxRecordDuration),
            autoOnDutyWhenPowerOn,
            autoOffDutyWhenPowerDown
          }
        };
        await this.startNotifications();
        // 发命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);
        resolve(res)
      });
    },
    /*
     读U盘配置
     */
    async getUStorage() {
      console.log('读U盘配置')
      return new Promise(async (resolve, reject) => {

        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 208, // 命令ID，用于匹配请求和响应
          method: "getUStorage", // 调用的方法名
          params: null
        };
        await this.startNotifications();
        // 发命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);
        resolve(res)
      });
    },
    /*
     写入U盘修改配置
     */
    async setUStorage(unlockedStatus) {
      console.log('写入U盘修改配置')
      return new Promise(async (resolve, reject) => {
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 209, // 命令ID，用于匹配请求和响应
          method: "setUStorage", // 调用的方法名
          params: {
            unlocked: unlockedStatus
          }
        };
        await this.startNotifications();
        // 发命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);
        resolve(res)
      });
    },
    /*
    恢复出厂设置
    */
    async restoreFactory() {
      console.log('恢复出厂设置')
      return new Promise(async (resolve, reject) => {
        // JSON-RPC命令
        const command = {
          jsonrpc: "2.0",
          id: 101, // 命令ID，用于匹配请求和响应
          method: "restoreFactory", // 调用的方法名
          params: null
        };
        await this.startNotifications();
        // 发命令
        const res = await this.writeCommand(this.deviceOption.characteristicWriteChannel, command);
        resolve(res)
      });
    },
    // 开始监听设备的通知
    async startNotifications() {
      return new Promise((resolve, reject) => {
        var characteristicReadChannel = this.deviceOption.characteristicReadChannel;
        // console.log('Starting Notifications...');
        //// 启动特征的通知功能
        characteristicReadChannel.startNotifications()
          .then(() => {
            // console.log('Notifications started');
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
      // console.log('返回的通知源value -->');
      // console.log(value);
      // 创建 TextDecoder 实例并指定 UTF-8 编码
      var decoder = new TextDecoder('utf-8', {fatal: true});
      try {
        var text = decoder.decode(value);
        // console.log('返回的通知指令decode -->', text);
        // console.log('返回的通知指令类型 -->', typeof text);
        // 清理字符串中的空白字符和其他可能的干扰字符
        // text = JSON.stringify(text)
        // 检查 text 是否为 JSON
        if (this.isJson(text)) {
          try {
            // console.log('JSON.parse前:');
            // console.log(text);
            const response = JSON.parse(text); // 解析 JSON
            // console.log('JSON.parse后:');
            // console.log(response);
            //重启设备
            if (response.id === 100) {
              // console.log('通知返回重启设备response', response)
              if (response.error) {
                this.$message.error('reboot error message:', response.error.message)
                console.error('reboot error message:', response.error.message)
                return
              }
              if (response.result) {
                this.init()

              }
            }
            // 恢复出厂设置
            if (response.id === 101) {
              console.log('通知返回恢复出厂设置response', response)
              if (response.error) {
                this.$message.error('restoreFactory error message:', response.error.message)
                console.error('restoreFactory error message:', response.error.message)
                return
              }
              if (response.result) {
                this.init()

              }
            }
            // 读取WiFi热点列表
            if (response.id === 201) {

              console.log('通知返回读取WiFi热点列表response', response)
              if (response.error) {
                this.$message.error('getWiFiList error message:', response.error.message)
                console.error('getWiFiList error message:', response.error.message)
                return
              }
              //{"jsonrpc":"2.0","id":201,"result":{"scanned":[{"ssid":"ELFLECT"},{"ssid":"611"},{"ssid":"gjlx"},{"ssid":"DIRECT-gH-EShare-2321"},{"ssid":"ChinaNet-sbga"},{"ssid":"longsailing"},{"ssid":"cxzx666"},{"ssid":"cxzx666"}],"connected":null,"memorized":[]}}
              this.wifiList_scanned = response.result.scanned !== null ? response.result.scanned : [];//已扫描到的设备列表
              this.wifiList_connected = response.result.connected !== null ? response.result.connected : [];//已连接的设备列表
              this.wifiList_memorized = response.result.memorized !== null ? response.result.memorized : [];//已记忆的设备列表
              this.wifiList = []
              this.active_wifi_obj = null
              this.active_wifi_type = null
              this.selectedWifiIndex = -1


              if (this.wifiList_connected !== null && this.wifiList_connected.length) {
                //如果当前已经连接的wifiList_connected，不在扫描列表里面，删除
                for (let i = 0; i < this.wifiList_connected.length; i++) {
                  let index = this.wifiList_scanned.findIndex(item => item.ssid === this.wifiList_connected[i].ssid)
                  if (index === -1) {
                    this.wifiList_connected.splice(i, 1)
                  }
                }
                for (let i = 0; i < this.wifiList_connected.length; i++) {
                  let obj = {
                    ssid: this.wifiList_connected[i].ssid,
                    type: 1
                  }
                  this.wifiList.push(obj)
                }
              }

              if (this.wifiList_scanned.length) {
                for (let i = 0; i < this.wifiList_memorized.length; i++) {
                  let obj = {
                    ssid: this.wifiList_memorized[i].ssid,
                    type: 2
                  }
                  this.wifiList.push(obj)
                }
              }
              if (this.wifiList_scanned.length) {
                for (let i = 0; i < this.wifiList_scanned.length; i++) {
                  let obj = {
                    ssid: this.wifiList_scanned[i].ssid,
                    type: 3
                  }
                  this.wifiList.push(obj)
                }
              }
              //wifiList 去重，根据ssid判断
              let newArr = [];
              for (let i = 0; i < this.wifiList.length; i++) {
                let item = this.wifiList[i];
                let isExist = false;
                for (let j = 0; j < newArr.length; j++) {
                  if (item.ssid === newArr[j].ssid) {
                    isExist = true;
                    break;
                  }
                }
                if (!isExist) {
                  newArr.push(item);
                }
              }
              this.wifiList = newArr


              console.log('所有wifi 列表', this.wifiList)
            }
            // 连接指定WiFi热点
            if (response.id === 202) {


              console.log('通知返回连接指定WiFi热点response', response)
              if (response.error) {
                this.$message.error('connectWiFi error message:', response.error.message)
                console.error('connectWiFi error message:', response.error.message)
                return
              }
              if (response.result) {
                this.fetchMemorizedWifiList().then(() => {
                  this.$message.success('connectWiFi success')
                })

              }

            }
            // 忘记指定WiFi热点
            if (response.id === 203) {

              console.log('通知返回忘记指定WiFi热点response', response)
              if (response.error) {
                this.$message.error('forgetWiFi error message:', response.error.message)
                console.error('forgetWiFi error message:', response.error.message)
                return
              }
              if (response.result) {
                this.fetchMemorizedWifiList().then(() => {
                  this.$message.success('forgetWiFi success')
                })

              }
            }
            // 读SasS平台配置
            if (response.id === 204) {

              console.log('通知返回读SasS平台配置response', response)
              if (response.error) {
                this.$message.error('getSaaS error message:', response.error.message)
                console.error('getSaaS error message:', response.error.message)
                return
              }
              if (response.result) {
                this.SaaSForm = response.result
                this.SaaSFormIsEditor = false

              }
            }
            // 写入SasS平台修改配置
            if (response.id === 205) {
              console.log('通知返回写入SasS平台修改配置response', response)
              if (response.error) {
                this.$message.error('setSaaS error message:', response.error.message)
                console.error('setSaaS error message:', response.error.message)
                return
              }
              if (response.result) {
               this.SaaSFormIsEditor=false
                this.getSaaS().then(res => {
                  this.$message.success('setSaaS success')
                })


              }
            }
            // 读录音配置
            if (response.id === 206) {
              console.log('通知返回读录音配置response', response)
              if (response.error) {
                this.$message.error('getRecord error message:', response.error.message)
                console.error('getRecord error message:', response.error.message)
                return
              }
              if (response.result) {
                this.recordingForm = response.result
                this.recordingFormIsEditor = false

              }
            }
            // 写入录音配置
            if (response.id === 207) {
              console.log('通知返回写入录音配置response', response)
              if (response.error) {
                this.$message.error('setRecord error message:', response.error.message)
                console.error('setRecord error message:', response.error.message)
                return
              }
              if (response.result&&response.result===0) {
                this.recordingFormIsEditor=false
                this.getRecord().then(res => {
                  this.$message.success('setRecord success')
                })


              }
            }
            // 读U盘配置
            if (response.id === 208) {
              console.log('通知返回读U盘配置response', response)
              if (response.error) {
                this.$message.error('getUStorage error message:', response.error.message)
                console.error('getUStorage error message:', response.error.message)
                return
              }
              if (response.result) {
                this.USBForm = response.result
                this.USBFormIsEditor = false

              }
            }
            // 写入U盘修改配置
            if (response.id === 209) {
              console.log('通知返回写入U盘修改配置response', response)
              if (response.error) {
                this.$message.error('setUStorage error message:', response.error.message)
                console.error('setUStorage error message:', response.error.message)
                return
              }
              if (response.result) {
                this.USBFormIsEditor=false
                this.getUStorage().then(res => {
                  this.$message.success('setUStorage success')
                })
              }
            }
            // 读设备信息
            if (response.id === 210) {
              console.log('通知返回读设备信息response', response)
              if (response.error) {
                this.$message.error('getDevice error message:', response.error.message)
                console.error('getDevice error message:', response.error.message)
                return
              }
              if (response.result) {
                this.deviceInfo = response.result
                console.log('deviceInfo', this.deviceInfo)

              }
            }

            event.target.removeEventListener('characteristicvaluechanged', new function () {
              //console.log('移除监听');
            });
            // console.log('通知返回数据处理完成');


          } catch (error) {
            console.error('解析 JSON 失败:', error);
            // console.error('text 不是有效的 JSON 格式');
          }
        } else {
          console.error('text 不是有效的 JSON 格式');
        }
      } catch (error) {
        // console.error('解码失败:', error);
        console.error('数据不是有效的 UTF-8 编码');
        return;
      }


    },

    isJson(text) {
      if (typeof text !== 'string') {
        // console.error('text 不是string');
        text.toString()
        // console.log('转换string');
        // console.log(text);
      }
      try {
        JSON.parse(text);
        return true; // 如果没有抛出错误，则说明是有效的 JSON
      } catch (e) {
        console.error(e)
        return false; // 抛出错误则不是有效的 JSON
      }
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
    },
    selectWifi(item, type, index) {
      // 选择wifi
      this.active_wifi_obj = item
      this.active_wifi_type = type
      this.selectedWifiIndex = index
      this.wifi_pwd = ''
      console.log(this.active_wifi_obj, this.active_wifi_type)

    },

    cancelSelect() {
      this.selectedWifiIndex = -1
      this.active_wifi_type = ''
      this.active_wifi_obj = {}
      this.wifi_pwd = ''
    },
    async forgetWifiClick() {
      // 忘记指定WiFi热点
      if (!this.active_wifi_obj) {
        this.$message.error('Please select a WiFi')
        return;
      }
      await this.forgetWifiBySSID(this.active_wifi_obj.ssid).then(res => {

      })
    },
    async connectWifi() {
      // 连接指定WiFi热点
      if (!this.wifi_pwd) {
        this.$message.error('Please enter WiFi password')
        return;
      }
      if (!this.active_wifi_obj) {
        this.$message.error('Please select a WiFi')
        return;
      }
      //密码是否符合规则字母 ：大小写字母（A-Z, a-z）
      /* 数字 ：0-9
       特殊字符 ：
 !  @ #  $  % ^ &  *   (   )   -   _  + =  {   }   [   ]   |   \   :   ;   "   '  < >  ,   .   ?   /  ~ `
       长度
       最少8 个字符，最长 63 个字符*/
      // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+-=[\]{};':",./<>?])[A-Za-z\d~!@#$%^&*()_+-=[\]{};':",./<>?]{8,63}$/.test(this.wifi_pwd)){
      //   this.$message.error('WiFi password format is incorrect')
      //   return;
      // }
      await this.connectWiFiBYSSID(this.active_wifi_obj.ssid, this.wifi_pwd).then(res => {

      })


    },
    showLog() {
      this.isShowLog = true
    },
    closeLog() {
      this.isShowLog = false;
    },
      confirmReboot() {
          // 弹出一个自定义对话框，用户确认后执行 rebootDevice()
          if (confirm("是否确认关闭页面并重启设备？")) {
              this.rebootConfirmed = true;  // 用户确认

              window.close(); // 关闭页面
          } else {
              this.rebootConfirmed = false;  // 用户取消
          }
      },
    handleBeforeUnload() {
        // 显示默认的确认弹窗，用户可以选择是否离开
        event.preventDefault();
        event.returnValue = ''; // 根据浏览器要求，必须返回空字符串才能触发弹窗

        // 检查是否已经确认重启设备
        if (this.rebootConfirmed) {
            this.rebootDevice();  // 用户确认离开后，重启设备
        } else {
          this.rebootDevice();  // 用户确认离开后，重启设备
            console.log('设备会重启');
        }
    },
    handleUnload() {
      // 在页面已经被卸载时触发，可以在这里添加需要执行的逻辑
      console.log('页面已经被卸载');
      this.rebootDevice()
    },

  },
  beforeunload() {
  },

  beforeUpdate() {

  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    window.removeEventListener('unload', this.handleUnload);


  },
  // 挂载前状态(里面是操作)
  beforeMount() {

  }
}
</script>
<style>
.showLog_Wrap {
  position: fixed;
  top: 10px;
  left: 15px;
  padding: 0 15px;
  z-index: 1000
}

#consoleOutput {
  position: fixed;
  left: 15px;
  top: 60px;
  width: 50%;
  background: rgba(0, 0, 0, .8);
  color: #fff;
  z-index: 999;
  padding: 30px;
  height: auto;
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

  .title {
    font-size: 18px;
    font-weight: bold;

  }

  .title-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;


    .icon-wrap {
      margin-left: 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .iconfont {
        cursor: pointer;
      }
    }
  }


  .icon {
    color: #409EFF;
    font-size: 20px;

  }

  .box-card {
    width: 100%;
    margin-top: 30px;

    .card-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 15px;

    }

    .list-list {
      width: 100%;
      display: flex;
      flex-direction: column;

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

              .wifi-icon {
                margin-right: 10px;
              }

              .wifi-name {
                font-size: 14px;
              }
            }

            &.noBorder {
              border: none;
            }

          }

          .wifi-password {
            font-size: 14px;
            margin-top: 15px;
          }

          .list-item-body-item:hover {
            background: rgba(64, 158, 255, 0.1);
            cursor: pointer;
          }

          .list-item-body-item.active {
            background: rgba(64, 158, 255, 0.5);
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
  color: #409EFF;

}

.warning-wrap {
    .warning-wrap-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #ddd;
        padding: 20px 10px;
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


    }
    .warning-wrap-button-wrap {
        padding-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
}

.todo-wifi-button-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

@media (max-width: 768px) {
  /* 移动端样式 */
  .el-form-item__label {
    font-size: 12px;
  }

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
      width: 100%;


      .title {
        font-size: 14px;


      }

      .icon-wrap {
        margin-left: 15px;
      }
    }


    .icon {


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
    color: #409EFF;

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
