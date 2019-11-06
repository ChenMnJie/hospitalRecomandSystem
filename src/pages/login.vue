<template>
  <div id="login">
    <el-card id="content" class="loginContent">
      <div class="manage-tip">
        <img src="../../gif/未标题-3.gif" alt class="manage-logo">
        <p>医院推荐系统</p>
      </div>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form
            label-position="left"
            label-width="80px"
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
          >
            <el-form-item prop="username" label="用户名">
              <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input label="密码" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item class="button-wrapper" style="text-align:center">
              <el-button type="primary" @click="submitLoginForm()" class="submit_btn">登录</el-button>
              <el-button type="danger" @click="toRegister()" class="submit_btn">注册</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { setToken, getToken, removeToken } from "../config/cookies";
import { checkLogin, login } from "../api/getData";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    window.onresize = () => {
      // 监听窗口大小变化
      this.changeContentSize();
    };
    window.onkeyup = (event) =>{
      // console.log(event.keyCode)
      if(event.keyCode == 13){
        this.submitLoginForm();
      }
    }
    this.$nextTick(() => {
      // dom加载完成
      setTimeout(() => {
        this.changeContentSize();
        this.checkLogin();
      }, 500);
    });

    
  },
  methods: {
    changeContentSize() {
      //改变窗口大小自适应
      let winHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let winWidth =
        document.documentElement.clientWidth || document.body.clientWidth;
      document
        .getElementById("login")
        .setAttribute("style", "min-height:" + winHeight + "px;");
      let contentHeight = document.getElementById("content").offsetHeight;
      let contentWidth = document.getElementById("content").offsetWidth;
      let contentTop = (winHeight - contentHeight - 2) / 2;
      console.log(contentHeight);
      let contentLeft = (winWidth - contentWidth - 2) / 2;
      document
        .getElementById("content")
        .setAttribute(
          "style",
          "top:" + contentTop + "px;left:" + contentLeft + "px;"
        );
    },
    // 检测是否登录
    async checkLogin(){
      const res = checkLogin();
      res.then(response=>{
        // console.log(response);
        if(response == null){
          this.$message.error("无法连接服务器，请重试");
        }else {
          if(response.success){
            this.$message.warning(response.msg);
            var userInfo = {
              nikeName: response.nikeName,
              age: null,
              address: null
            };
            this.$store.commit('changeLoginState',true);
            this.$store.commit('saveUserInfo',userInfo);
            this.$store.commit('saveToken',response.loginToken);
            this.$store.commit('saveTokenSecret',response.tokenSecret);
            this.$router.push({ name: "home" });
          }else{
            // this.$message.error(response.msg);
          }
        }
      })
    },
    // 提交登录表单
    async submitLoginForm(){
      const loading = this.openLoading();
      this.$refs['loginForm'].validate(async valid=>{
        if(valid){
          var userName = this.loginForm.username;
          var pass = this.loginForm.password;
          pass = this.$md5(pass);
          userName = Base64.encode(userName);
          const res = login({
            userName: userName,
            pass: pass
          })
          res.then(response=>{
            console.log(response);
            if(response == null){
              this.$message.error("无法连接服务器，请重试");
            }else if(response.success == true){
              // 登录成功
              this.$message.success("登录成功");
              var loginToken = Base64.decode(response.loginToken);
              var userInfo = {
                nikeName: response.nikeName,
                age: null,
                address: null
              };
              this.$store.commit('changeLoginState',true);
              this.$store.commit('saveUserInfo',userInfo);
              this.$store.commit('saveToken',loginToken);
              this.$store.commit('saveTokenSecret',pass);
              console.log(this.$store.state.userInfo);
              console.log("登录成功")
              this.$router.push({ name: "home" });
              // 页面跳转
            }else if(response.success == false){
              // 登录失败
              this.$message.error(response.msg);
              console.log(response.msg)
            }
          })
        }
      })
      loading.close();
    },
    toRegister(){
      this.$router.push({ name: "register" });
    },
    openLoading(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      return loading;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.loginContent {
  width: 50%;
  position: absolute;
  border-radius: 10px;
}
.manage-logo {
  width: 40%;
  display: block;
  margin: 3% auto;
}
.manage-tip {
  width: 100%;
  p {
    font-size: 20px;
    font-weight: 300;
    margin: 20px 0;
    width: 100%;
    text-align: center;
  }
}
.submit_btn {
  width: 100px;
  margin-right: 50px;
}
</style>
