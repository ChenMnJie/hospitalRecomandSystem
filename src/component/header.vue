<template>
  <div id="header" ref="header">
    <el-menu
      :default-active="path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#00000000"
      text-color="#5c5c5c"
      active-text-color="#00aeff"
      :router="true"
      :style="{'line-height' : headerHeight +'px','height' : headerHeight +'px'}"
    >
      <el-menu-item index="/home" :style="{'line-height' : headerHeight +'px','height' : headerHeight +'px'}">首页</el-menu-item>
      <el-menu-item index="/hospitalRecommend" :style="{'line-height' : headerHeight +'px','height' : headerHeight +'px'}">推荐医院</el-menu-item>
      <div class="menuBtn">
        <div v-if="!isLogin" >
          <el-button @click="toLogin(true)">登录</el-button>
          <el-button @click="toRegister()">注册</el-button>
        </div>
        <div v-else>
          <span style="padding-right:5px;color:#333">{{nikeName}}，欢迎您!</span>
          <el-button v-on:click="toLogin(false)">退出登录</el-button>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { logup } from "../api/getData";

export default {
  data() {
    return {
      isLogin: false,
      nikeName: null
      // menuBtn_div:{
      //   'line-height' : menuBtn_height +'px'
      // }
    };
  },
  created(){
    this.headerHeight = this.$store.state.headerHeight;
    this.checkLoginInfo();
  },
  methods: {
    toLogin(way) {
      // 跳转登录页面---登录&退出登录
      if (way) {
        this.$router.push({ name: "login" });
      } else {
        const res = logup();
        res.then(response=>{
          if(response == null){
            this.$message.error("无法连接服务器，请重试");
          }else{
            if(response.success){
              // 注销登录成功
              this.$message.success(response.msg)
              this.isLogin = false;
              this.$store.commit('changeLoginState',false);
              this.$store.commit('saveUserInfo',null);
              this.$store.commit('saveToken',null);
              this.$store.commit('saveTokenSecret',null);
            }else{
              this.$message.success(response.msg)
            }
          }
        })
        this.isLogin = way;
      }
    },
    toRegister() {
      // 跳转注册页面
      this.$router.push({ name: "register" });
    },
    // 检测是否登录
    async checkLoginInfo(){
      console.log("进入检测");
      this.isLogin = this.$store.state.isLogin;
      if(this.isLogin){
        // 已登录
        this.nikeName = this.$store.state.userInfo.nikeName;
      }else{
        // 未登录
      }
    }
  },
  props: ["path"]
};
</script>

<style lang="scss">
.el-menu.el-menu--horizontal {
  padding: 0 15%;
  border-bottom: solid 0px;
  .el-menu-item {
    font-size: 17px;
  }
  .el-menu-item:hover {
    background-color: #c3ecff !important;
  }
  .menuBtn {
    float: right;
  }
}
</style>
