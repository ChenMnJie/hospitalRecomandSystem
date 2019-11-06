import Vue from 'vue'
import App from './App.vue'

import './assets/css/base.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource';
import router from './router/router.js'
import store from './vuex/store.js';
import md5 from 'js-md5';

import '../static/district/province_city';
import '../static/district/province_city_area';
import '../static/district/province_city_area_streets';

let Base64 = require('js-base64').Base64;

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.prototype.$md5 = md5;
// Vue.prototype.$base64 = Base64;


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
