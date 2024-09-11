<template>
  <div>
    <el-container class="main-wrap">
      <div class="nav">
        <div class="logo-wrap">
          <img src="../assets/img/logo.png" alt="" class="logo">
          <h1>Badge Settings</h1>
        </div>

        <div class="header-button-wrap">
          <el-button size="mini" type="primary" @click="connectToDevice">Connect</el-button>
          <el-button size="mini" type="danger" :disabled="!isConnect">Restart</el-button>
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
                    <el-button size="mini" type="primary" :disabled="!isConnect">Forget</el-button>
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
                    <el-button size="mini" type="primary" :disabled="!isConnect">Forget</el-button>
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
                              :disabled="!isConnect"></el-input>
                    <el-button size="mini" type="primary" :disabled="!isConnect">Connect</el-button>
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
                        :disabled="!isConnect"></el-input>
            </el-form-item>
            <el-form-item label="Port：">
              <el-input placeholder="Please enter the port number" v-model="SaaSForm.port"
                        :disabled="!isConnect"></el-input>
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
              <el-input placeholder="" type="number" :disabled="!isConnect"></el-input>
            </el-form-item>
            <el-form-item label="Automatically start work：">
              <el-switch
                v-model="recordingForm.isOpenToWork"
                :disabled="!isConnect"
                active-color="#13ce66" active-text="ON" inactive-text="OFF"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="automatically leave work：">
              <el-switch
                v-model="recordingForm.isCloseToWork"
                :disabled="!isConnect"
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
                :disabled="!isConnect"
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
              <el-button size="mini" type="danger" :disabled="!isConnect">I have read the warning and I want to restore
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

export default {
  name: 'index',
  data() {
    return {

      isConnect: false,//是否连接
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
    this.init();


  },
  methods: {
    async init() {
      //初始化

    },
    async connectToDevice() {
       let isSupport = this.checkBluetoothSupport()
      console.log(isSupport)

    },
    checkBluetoothSupport() {
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
