import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

]

const router = new VueRouter({
  mode: 'hash', // 设置路由模式为 hash 模式
  routes
})

export default router
