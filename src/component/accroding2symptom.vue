<template>
  <div id="accroding2symptom">
    
    <div style="margin-top: 15px;">
      <el-input 
        type="textarea"
        :rows="4"
        placeholder="描述一下您的症状吧"
        v-model="symptomDetail"
        class="input-with-select"
      ></el-input>
    </div>
    <div class="showDetailLabel">
      <div class="searchInp">
        <el-autocomplete 
          placeholder="搜索一下标签吧"
          v-model="search_labelName"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </div>
      <div class="labelBtn">
        <el-row class="rowMargin">
          <el-col :span="24/labelCols"><el-checkbox label="咳嗽" border></el-checkbox></el-col>
          <el-col :span="24/labelCols"><el-checkbox label="发热" border></el-checkbox></el-col>
          <el-col :span="24/labelCols"><el-checkbox label="咽炎" border></el-checkbox></el-col>
          <el-col :span="24/labelCols"><el-checkbox label="舌炎" border></el-checkbox></el-col>
          <el-col :span="24/labelCols"><el-checkbox label="腹痛" border></el-checkbox></el-col>
          <el-col :span="24/labelCols"><el-checkbox label="胸痛" border></el-checkbox></el-col>
        </el-row>
        <el-row class="rowMargin">
          <el-col :span="24/labelCols"><el-checkbox label="呼吸异常" border></el-checkbox></el-col>
          <el-col :span="24/labelCols"><el-checkbox label="关节疼痛" border></el-checkbox></el-col>
        </el-row>
      </div>
    </div>

    <div class="recommandBtn">
      <el-button round type="primary">帮我推荐一下医院吧</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      search_labelName: "",
      symptomDetail: "", //按主诉
      labelRows: 5,
      labelCols: 6
    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>

<style lang="scss">
  .showDetailLabel{
    margin-top:1.5%;
    width: 50%;
    .labelBtn{
      padding-top: 1%;
      .rowMargin{
        margin-top: 1%; 
      }
    }
  }
  .recommandBtn{
    margin-top:1%;
  }
</style>
