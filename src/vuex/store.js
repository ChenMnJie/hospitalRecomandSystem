import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

var state = {
  headerHeight: 70,
  footerHeight: 70,
  isLogin: false,
  token: null,
  tokenSecret: null,
  userInfo: null
};

var mutations = {
  setHeaderHeight(state, headerHeight) {
    state.headerHeight = headerHeight;
  },
  setFooterHeight(state, footerHeight) {
    state.footerHeight = footerHeight;
  },
  changeLoginState(state, isLogin) {
    state.isLogin = isLogin;
  },
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  saveToken(state, token){
    state.token = token;
  },
  saveTokenSecret(state, tokenSecret){
    state.tokenSecret = tokenSecret;
  }
};

// vuex 实例化Vuex.Store
const store = new Vuex.Store({
  state,
  mutations
});

export default store;
