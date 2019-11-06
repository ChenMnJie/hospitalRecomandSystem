<template>
  <div>
    <!-- header -->
    <hrsHeader ref="header" :path="path" class="fixedHeader-homeTop"></hrsHeader>
    <hrsHeader id="header2" :path="path" :class="{'hide':isHide}" class="fixedHeader"></hrsHeader>
    <!-- 内容 -->
    <div id="content">
      <!-- <span>{{winHeightProps.height}}</span> -->
      <!-- 轮播图 -->
      <div class="carousel" @mouseenter="enter" @mouseleave="leave">
        <transition-group tag="ul" name="image" enter-active-class="animated lightSpeedIn"
          leave-active-class="animated lightSpeedOut">
          <li v-for="(image,index) in img" :key="index" v-show="index === mark">
            <a href="javascript:;">
              <img :src="image">
            </a>
          </li>
        </transition-group>
        <div class="bullet">
          <span v-for="(item,index) in img.length" :class="{'active':index === mark}" @click="change(index)"
            :key="index"></span>
        </div>
        <div class="switch">
          <span class="prev" @click="prev">&lt;</span>
          <span class="next" @click="next">&gt;</span>
        </div>
      </div>
      <div class="center">
        <!-- 医院排行榜 （综合） -->
        <showDataGrid :tableBuild="tableBuild" ></showDataGrid>
      </div>
    </div>
    <!-- footer -->
    <hrsFooter ref="footer"></hrsFooter>
  </div>
</template>

<script>
  import Header from "../component/header";
  import Footer from "../component/footer";
  import DataGrid from "../component/showDataGrid"
  import "../../static/css/animate.min.css";
  import { getHospitalRanksData } from "../api/getData";

  export default {
    data() {
      return {
        path: "/home",
        mark: 0,
        img: [
          "../../static/images/banner.png",
          "../../static/images/banner1.jpg",
        ],
        time: null,
        isHide: true,
        tableBuild: {
          border: true, //是否有边框
          height: 1000,
          column: [
            //表头（列）
            { type: "", field: "rank", label: "综合排名", width: "180", align: "center", sortable: true },
            { type: "", field: "hospital", label: "医院", width: "180", align: "center" },
            { type: "", field: "prestige", label: "声誉权重", width: "180", align: "center", sortable: true },
            { type: "", field: "research", label: "科研权重", width: "180", align: "center", sortable: true },
            { type: "", field: "score", label: "总得分", width: "180", align: "center", sortable: true }
          ],
          data: [], //先定义表格数据
        }
      };
    },
    components: {
      hrsHeader: Header,
      hrsFooter: Footer,
      showDataGrid: DataGrid
    },
    beforeCreate() {
      this.footerHeight = this.$store.state.footerHeight;
      this.headerHeight = this.$store.state.headerHeight;
    },
    created() {
      this.play();
    },
    mounted() {
      this.getContentHeight();
      window.onscroll = () => {
        // 滚动条距顶部的距离
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        var _that = this;
        if (t > this.headerHeight) {
          _that.isHide = false;
        } else {
          _that.isHide = true;
        }
      };
      window.onresize = () => {
        // 监听窗口大小变化
        this.getContentHeight();
      };
      this.getHRanksData();
    },
    methods: {
      change(i) {
        this.mark = i;
      },
      prev() {
        this.mark--;
        if (this.mark === -1) {
          this.mark = this.img.length - 1;
          return;
        }
      },
      next() {
        this.mark++;
        if (this.mark === this.img.length) {
          this.mark = 0;
          return;
        }
      },
      autoPlay() {
        this.mark++;
        if (this.mark === this.img.length) {
          this.mark = 0;
          return;
        }
      },
      play() {
        this.time = setInterval(this.autoPlay, 3000);
      },
      enter() {
        // console.log("enter");
        clearInterval(this.time);
      },
      leave() {
        // console.log("leave");
        this.play();
      },
      getContentHeight() {
        // 获取当前窗口高度
        this.winHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        let contentHeight = this.winHeight - this.footerHeight;
        document
          .getElementById("content")
          .setAttribute("style", "min-height:" + contentHeight + "px");
      },
      async getHRanksData(){
        this.tableBuild.loading = true;
        // 获取医院排行榜
        const res = getHospitalRanksData();
        res.then(response=>{
          console.log(response);
          if(response == null){
            this.$message.error("无法连接服务器，请重试");
          }else{
            if(response.success){
              var dataList = [];
              response.data.forEach(item=>{
                let dataItem = {
                  rank: item.hrank,
                  hospital: item.hname,
                  prestige: item.hreputationweight,
                  research: item.hscienticweight,
                  score: item.htotalweight
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
    }
  };

</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  // 轮播图
  .carousel {
    width: 100%;
    height: 600px;
    overflow: hidden;
    margin: auto;
    position: relative;

    ul {
      width: 100%;
      height: 100%;

      li {
        position: absolute;
        width: 100%;
      }

      a {
        img {
          width: 100%;
          height: 600px;
        }
      }
    }
  }

  .bullet {
    position: absolute;
    font-size: 0;
    bottom: 20px;
    left: 50%;
    margin-left: -42px;

    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: #ffffff;
      margin-left: 15px;
      border-radius: 10px;
    }
  }

  .bullet span:first-child {
    margin-left: 0;
  }

  .switch {
    span {
      position: absolute;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.1);
      font-size: 20px;
      color: #ffffff;
      top: 50%;
      margin-top: -25px;
      cursor: pointer;
      font-family: "宋体";
    }
  }

  .switch .switch span:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .prev {
    left: 0;
  }

  .next {
    right: 0;
  }

  .active {
    background-color: rgb(0, 174, 255) !important;
  }

  .center{
    margin: 10px auto;
    width: 60%
  }

</style>
