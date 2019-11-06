import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '../pages/home.vue'
import HospitalRecommend from '../pages/hospitalrecommend.vue'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import MapChart from '../component/mapChart.vue'
import LineChart from '../component/lineChart.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },{
    path: '/hospitalRecommend',
    name: 'hospitalRecommend',
    component: HospitalRecommend
  },{
    path: '/login',
    name: 'login',
    component: Login
  },{
    path: '/register',
    name: 'register',
    component: Register
  },{
    path: '/mapChart',
    name: 'mapChart',
    component: MapChart
  },{
    path: '/lineChart',
    name: 'lineChart',
    component: LineChart
  },
// 默认跳转
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
