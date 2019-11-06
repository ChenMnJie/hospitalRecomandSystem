<template>
  <div id="accroding2disease">
    <el-autocomplete 
       placeholder="可输入疾病名称进行搜索"
       v-model="search_diseaseName"
       :fetch-suggestions="querySearch"
       :trigger-on-focus="false"
       @select="handleSelect"
    >
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-autocomplete>
    <div class="showDisease">
      <el-row v-for="(rowsItem,index) in rows" :key="index">
        <el-col :span="24/cols" v-for="(colsItem,index) in cols" :key="index"><el-button type="text" :Did="diseaseList[6*(rowsItem-1)+colsItem-1].diseaseID">{{diseaseList[6*(rowsItem-1)+colsItem-1].diseaseName}}</el-button></el-col>
      </el-row>
    </div>
    <div class="showPagination">
      <el-pagination 
          background
          layout="prev, pager, next, jumper"
          :total="total"
          :page-size="rows*cols"
          @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getDiseaseList, getAllDiseaseList } from "../api/getData";

export default {
  data() {
    return {
      search_diseaseName: "",
      total: 0,
      rows: 7,
      cols: 6,
      diseaseList: [],
      allDiseaseList: []
    }
  },
  mounted(){
    this.getDiseaseList(1,this.rows*this.cols);
  },
  methods:{
    async getDiseaseList(currentPage,pageSize){
      const res = getDiseaseList({
        "currentPage":currentPage,
        "pageSize": this.rows*this.cols
      });
      res.then(response=>{
        if(response == null){
          this.$message.error("无法连接服务器，请重试")
        }else{
          if(response.success){
            this.total = response.total;
            this.diseaseList = response.diseaseList;
          }else{
            this.$message.error(response.msg)
          }
        }
      })
    },
    handleCurrentChange(currentPage){
      this.getDiseaseList(currentPage,this.rows*this.cols);
    },
    querySearch(queryString, cb){
      const res = getAllDiseaseList();
      res.then(response=>{
        if(response == null){
          this.$message.error("无法连接服务器，请重试")
        }else{
          if(response.success){
            this.allDiseaseList = response.data;
            var results = queryString ? this.allDiseaseList.filter(this.createFilter(queryString)) : this.allDiseaseList;
            cb(results);
          }else{
            this.$message.error(response.msg)
          }
        }
      })
    },
    createFilter(queryString) {
      return (allDiseaseList) => {
        return (allDiseaseList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item.Did);
    }
  }
}
</script>

<style lang="scss">
  .showDisease{
    margin-top: 1%;
    span{
      font-size: 20px;
    }
  }
  .showPagination{
    margin: 1% auto;
  }
</style>
