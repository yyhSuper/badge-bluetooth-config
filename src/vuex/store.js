import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: false,
    isMenuLoaded: false,
    menuData: [],
    userInfo: localStorage.getItem("userInfo") || "",
    loginToken: localStorage.getItem("logintoken") || ""
  },
  getters: {},
  mutations: {
    // 登录
    login(state, userInfo) {
      state.userInfo = userInfo;
      state.isMenuLoaded = true;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    // 退出
    logout(state) {
      state.user = "";
      localStorage.removeItem("userInfo");
      localStorage.removeItem("logintoken");
    },
    SET_MENU_LOADED(state, status) {
      state.isMenuLoaded = status;
    },
    SET_MENU_DATA(state, data) {
      state.menuData = data;
    }
  },
  actions: {
    async fetchMenuData({commit}) {
      let menuData = [
        {
          path: '/',//组件路径
          name: 'root',
          uri: '/',//组件path
          icon: 'el-icon-tickets',
          meta: {
            requireAuth: true
          },
          children: [],
          redirect: '/auth'
        },
        {
          path: '/index',//组件路径
          name: 'Home',
          uri: '/index',//组件path
          meta: {requireAuth: true}
        },

      ];

      commit('SET_MENU_DATA', menuData);
      commit('SET_MENU_LOADED', true);
      /*const response = await getMenuRouter({});

      if (response.result === '200') {
        const menuData = response.data
        var testData = [
          {
            path: '/',
            name: 'root',
            uri: 'index',
            iconCls: 'el-icon-tickets',
            meta: {
              requireAuth: true
            },
            children: []
          },
          {
            path: '/employee/index',
            name: '经营指标',
            uri: 'employee/Index',
            meta: {requireAuth: true}
          },

          {
            path: '/staff/index',
            name: '员工视图',
            uri: 'staff/Index',
            meta: {requireAuth: true}
          },
        ];
        //menuData=testData
        commit('SET_MENU_DATA', menuData);
        commit('SET_MENU_LOADED', true);
        // console.log('vuex获取菜单数据:', menuData);
      } else {
        Vue.prototype.$message.error(response.msg);
      }
      try {


      } catch (error) {
        console.error('请求菜单数据失败:', error);
        Vue.prototype.$message.error(error);
      }*/
    }
  }
});
