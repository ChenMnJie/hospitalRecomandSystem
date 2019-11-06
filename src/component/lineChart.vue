<template>
  <div id="mapChart">
    <!-- html代码 -->

    <!-- 存放图表的div -->
    <div id="main" style="width: 1366px; height: 400px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据
    };
  },
  mounted() {
    // 加载代码
    this.initCharts();
  },
  methods: {
    initCharts() {
      // 初始化图表方法
      var echarts = require("echarts");
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        title: {
          text: "用户满意度评分折线对比图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["原始排名分", "基于用户评分的综合分"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          rotate: 60,
          margin: 20,
          formatter: function(params) {
            var newParamsName = ""; // 最终拼接成的字符串
            var paramsNameNumber = params.length; // 实际标签的个数
            var provideNumber = 5; // 每行能显示的字的个数
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
            /**
             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
             */
            // 条件等同于rowNumber>1
            if (paramsNameNumber > provideNumber) {
              /** 循环每一行,p表示行 */
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = ""; // 表示每一次截取的字符串
                var start = p * provideNumber; // 开始截取的位置
                var end = start + provideNumber; // 结束截取的位置
                // 此处特殊处理最后一行的索引值
                if (p == rowNumber - 1) {
                  // 最后一次不换行
                  tempStr = params.substring(start, paramsNameNumber);
                } else {
                  // 每一次拼接字符串并换行
                  tempStr = params.substring(start, end) + "\n";
                }
                newParamsName += tempStr; // 最终拼成的字符串
              }
            } else {
              // 将旧标签的值赋给新标签
              newParamsName = params;
            }
            //将最终的字符串返回
            return newParamsName;
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "中国医学科学院北京协和医院",
            "四川大学华西医院",
            "中国人民解放军总医院",
            "上海交通大学医学院附属瑞金医院",
            "空军军医大学西京医院",
            "复旦大学附属中山医院",
            "中山大学附属第一医院",
            "华中科技大学同济医学院附属同济医院",
            "复旦大学附属华山医院",
            "北京大学第三医院"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "原始排名分",
            type: "line",

            data: [
              94.297,
              85.55,
              71.105,
              45.144,
              43.185,
              40.111,
              40.004,
              37.869,
              36.079,
              31.017
            ]
          },
          {
            name: "基于用户评分的综合分",
            type: "line",

            data: [96, 87, 69, 48, 45, 39.111, 46, 35, 37, 29.89]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>