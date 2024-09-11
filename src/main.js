import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/index'; // 不需要 fetchMenuData 和 resetRouter 的导入
import VueI18n from 'vue-i18n';
import { lang } from './common/lang.js';
import store from './vuex/store'; // 确保正确导入 store
import './assets/icon/iconfont.css';
import * as echarts from 'echarts';
import axios from 'axios';
import ElSelectTree from 'el-select-tree';
import * as custom from './utils/util';
require('echarts/lib/component/aria');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.use(ElSelectTree);

Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key]);
});

const i18n = new VueI18n({
    locale: localStorage.getItem('language') || 'zh',
    fallbackLocale: 'zh',
    messages: {
        jp: { ...lang.jp },
        zh: { ...lang.zh },
    },
});


new Vue({
    router,
    store, // 确保 store 被传递给 Vue 实例
    i18n,
    render: h => h(App),
    data: {
        Bus: new Vue(),
    },
    async created() {
       /* if (localStorage.getItem('userInfo')) {
            // console.log('已经存在用户信息，加载菜单数据')
            try {
                await store.dispatch('fetchMenuData'); // 直接调用 store.dispatch
            } catch (error) {
                console.error('初始加载菜单数据失败:', error);
            }
        }*/
    }
}).$mount('#app');
