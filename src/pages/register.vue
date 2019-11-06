<template>
  <div id="register">
    <el-card class="registerForm">
      <el-form>
        <el-form-item style="width:100%;">
          <el-input placeholder="请输入用户名" 
            v-model="registerForm.userName" 
          ></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-input placeholder="请输入昵称" 
            v-model="registerForm.nikeName" 
          ></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-cascader placeholder="请输入现住址"
            v-model="registerForm.userAddress" 
            expand-trigger="hover"
            :options="registerForm.addressOptions"
          ></el-cascader>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-input placeholder="请输入密码" 
            v-model="registerForm.pass" 
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input ref="passAgain" 
            placeholder="请再次输入密码" 
            v-model="registerForm.passAgain" 
            type="password" 
            @blur="isSame"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="submitRegisterForm">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register, login } from '../api/getData';

export default {
  data() {
    return {
      registerForm:{
        addressOptions:window.province_city_area,
        userName:"",
        nikeName:"",
        userAddress:[],
        pass:"",
        passAgain:""
      }
    }
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
        .getElementById("register")
        .setAttribute("style", "min-height:" + winHeight + "px;");
    },
    isSame(e){
      if(this.registerForm.pass != this.registerForm.passAgain){
        this.$message.error('密码不一致');
        this.$refs['passAgain'].focus();
      }
    },
    submitRegisterForm(){
      let userName = this.registerForm.userName;
      let nikeName = this.registerForm.nikeName;
      // 用户不输入昵称，默认为用户名
      if(nikeName == "" || nikeName.length == 0){
        nikeName = userName;
      }
      
      let pass = this.registerForm.pass;
      let passAgain = this.registerForm.passAgain;
      if(pass != passAgain){
        return;
      }
      
      let userAddress = "";
      this.registerForm.userAddress.forEach((addressValue)=>{
        userAddress += addressValue + '/';
      });

      // 对用户注册信息进行编码
      userName = Base64.encode(userName);
      nikeName = Base64.encode(nikeName);
      // pass = Base64.encode(pass);
      userAddress = Base64.encode(userAddress);
      // 密码md5加密
      pass = this.$md5(pass);
      console.log(userName+','+nikeName+','+pass+','+userAddress)
      
      const res = register({
        userName: userName,
        nikeName: nikeName,
        userAddress: userAddress,
        pass: pass
      });
      res.then(response=>{
        // console.log(response);
        if(response == null){
          this.$message.error("无法连接服务器，请重试");
        }else{
          if(response.success){
            // 注册成功
            this.$message.success(response.msg)
            this.$router.push({ name: "login" });
          }else{
            // 注册失败
            this.$message.error(response.msg)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .registerForm{
    width:42%;
    padding:10px;
    margin: 50px auto;
    .el-cascader{
      width: 100%;
    }
  }
</style>
