<template>
  <div id="accroding2department" class="tabList_Layout">
    <el-tabs tab-position="left" style="height: 800px;" @tab-click="changeTableData">
      <el-tab-pane
        v-for="(listItem,index) in tabListData"
        :key="index"
        :label="listItem.label"
        :Did="listItem.Did"
      ></el-tab-pane>
    </el-tabs>
    <div class="showDataModule">
      <showLineChart></showLineChart>
      <showDataGrid :tableBuild="tableBuild"></showDataGrid>
    </div>
  </div>
</template>

<script>
import DataGrid from "./showDataGrid";
import LineChart from "./lineChart";
import { getHospitalRanksByDept } from "../api/getData";

export default {
  data() {
    return {
      tableBuild: {
        totle: 0, //先定义有多少行
        border: true, //是否有边框
        column: [
          //表头（列）
          { type: "", field: "rank", label: "综合排名", width: "180", align: "center", sortable: true },
          { type: "", field: "hospital", label: "医院", width: "180", align: "center" },
          { type: "", field: "prestige", label: "声誉权重", width: "180", align: "center", sortable: true },
          { type: "", field: "research", label: "科研权重", width: "180", align: "center", sortable: true },
          { type: "", field: "score", label: "总得分", width: "180", align: "center", sortable: true }
        ],
        data: []
      }
    };
  },
  components: {
    showDataGrid: DataGrid,
    showLineChart: LineChart
  },
  mounted(){
    this.getHospitalRanks(1);
  },
  methods: {
    changeTableData(tab, event) {
      // console.log(tab.$attrs.Did)
      // 科室id tab.$attrs.Did ---- 查询数据
      let deptID = tab.$attrs.Did;
      this.getHospitalRanks(deptID);
    },
    getHospitalRanks(Did){
      this.tableBuild.loading = true;
      const res = getHospitalRanksByDept({
        Did: Did
      });
      res.then(response=>{
        if(response == null){
          this.$message.error("无法连接服务器，请重试");
        }else{
          if(response.success){
            var dataList = [];
            response.data.forEach(item=>{
              let dataItem = {
                rank: item.ranking,
                hospital: item.hname,
                prestige: item.reputationnormalizationvalue,
                research: item.scientificstandardizationvalue,
                score: item.compositescore
              }
              dataList.push(dataItem);
            })
            this.tableBuild.data = dataList;
          }else{
            this.$message.error(response.msg);
          }
        }
      })
      this.tableBuild.loading = false;
    }
  },
  props: {
    tabListData: Array
  }
};
</script>

<style lang="scss">
.tabList_Layout {
  display: flex;
}
.showDataModule {
  margin-left: 1%;
}
</style>
