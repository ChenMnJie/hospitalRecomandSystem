<template>
  <div id="hospitalRecommend">
    <!-- header -->
    <hrsHeader ref="header" :path="path" class="fixedHeader"></hrsHeader>
    <!-- 内容 -->
    <div id="content">
      <el-tabs class="topTab" type="card" @tab-click="changePage">
        <el-tab-pane label="按科室">
          <A2Dept :tabListData="tabListData_a2Dept"></A2Dept>
        </el-tab-pane>
        <el-tab-pane label="按疾病">
          <A2Disease></A2Disease>
        </el-tab-pane>
        <el-tab-pane label="按主诉">
          <A2Symptom></A2Symptom>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- footer -->
    <hrsFooter ref="footer"></hrsFooter>
  </div>
</template>

<script>
import Header from "../component/header.vue";
import Footer from "../component/footer.vue";
import Accroding2Department from "../component/accroding2department";
import Accroding2Disease from "../component/accroding2disease";
import Accroding2Symptom from "../component/accroding2symptom";

import { getDepartment } from "../api/getData";

export default {
  data() {
    return {
      path: "/hospitalRecommend",
      tabListData_a2Dept: []
    };
  },
  components: {
    hrsHeader: Header,
    hrsFooter: Footer,
    A2Dept: Accroding2Department,
    A2Disease: Accroding2Disease,
    A2Symptom: Accroding2Symptom
  },
  beforeCreate() {
    this.footerHeight = this.$store.state.footerHeight;
    this.headerHeight = this.$store.state.headerHeight;
  },
  mounted() {
    window.onresize = () => {
      // 监听窗口大小变化
      this.changeContentSize();
    };
    this.changeContentSize();
    this.getDept();
  },
  methods: {
    changeContentSize() {
      //改变窗口大小自适应
      var winHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let contentHeight = winHeight - this.headerHeight - this.footerHeight;
      document
        .getElementById("content")
        .setAttribute("style","min-height:" + contentHeight + "px;margin-top:" + this.headerHeight + "px;");
    },
    getDept(){
      const res = getDepartment();
      res.then(response=>{
        if(response == null){
          this.$message.error("无法连接服务器，请重试");
        }else{
          if(response.success){
            var tablist = [];
            response.data.forEach(item=>{
              var listItem = {
                label: item.dname,
                Did: item.did
              }
              tablist.push(listItem);
            })
            this.tabListData_a2Dept = tablist;
          }else{
            this.$message.error(response.msg);
          }
        }
      })
    },
    changePage(tab, event){
      // 0-按科室 1-按疾病 2-按症状
      let idx = tab.index;
    }
  }
};
</script>

<style lang="scss">
.topTab {
  padding: 2% 5%;
}
/*搜索框*/
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
