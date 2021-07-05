<template>
  <div>
    <el-row :gutter="20" style="margin-top: 0 px">
      <status></status>
      <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
        <el-card
          class="trainbody"
          style="backgroundcolor: #e6e6e6; height: 100%"
        >
          <div class="row">
            <div
              id="cxfigure"
              class="col-12"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
        <el-card class="sensor" style="backgroundcolor: #e6e6e6">
          <el-table
            class="table1"
            :data="tableData"
            stripe
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%; height: 100%; background-color: #e6e6e6"
            height="310"
          >
            <el-table-column
              prop="name"
              label="List of Sensors"
              align="center"
              style="background-color: #e6e6e6"
            />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 30px">
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="8"
        :xl="8"
        style="text-align: center"
      >
        <el-card>
          <div id="sensorfigure" style="height: 250px; width: 100%"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card>
          <div id="fftfigure" style="height: 250px; width: 100%"></div>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="4"
        :xl="4"
        style="text-align: center"
      >
        <el-card style="text-align: center; height: 250px"
          ><h2 style="font-size: 20px">Sensor{{ num }}</h2>
          <el-table
            class="table2"
            :data="sensorinfo"
            style="width: 100%; height: 100%; background-color: #e6e6e6"
            :row-style="{ height: '5px' }"
            :cell-style="{ padding: '2px' }"
            :show-header="false"
          >
            <el-table-column
              prop="name"
              align="center"
              style="background-color: #e6e6e6"
            />
            <el-table-column
              prop="val"
              align="center"
              style="background-color: #e6e6e6"
            />
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
        <el-card style="text-align: center; height: 250px"
          ><h2 style="font-size: 20px">Sensor Information</h2>
          <el-table
            class="table2"
            :data="sensordata1"
            style="width: 100%; height: 100%; background-color: #e6e6e6"
            height="300"
            :show-header="false"
          >
            <el-table-column
              prop="name"
              align="center"
              style="background-color: #e6e6e6"
            />
            <el-table-column
              prop="val"
              align="center"
              style="background-color: #e6e6e6"
            />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import left from "./left-navar.vue";
import navbar from "./navarbar.vue";
import status from "./status.vue";
import common from "./common.vue";
import {
  sendWebsocket,
  getmessage,
  closeWebsocket,
} from "../assets/js/websocket";
export default {
  name: "trainbody",
  data() {
    return {
      url: common.url,
      s: { M: "update", id: 1 },
      cximageh: "height:" + 405 + "px",
      cximageh1: 500,
      cxzoom: 0.48,
      cximagew: 2200,
      str: "",
      dataa: [],
      width: 0,
      cxChart: null,
      fftmyChart: null,
      myChart: null,
      sensordata: [],
      sensordata1: [
        { name: "Type" },
        { name: "Place" },
        { name: "Range" },
        { name: "Channel" },
      ],
      sensorinfo: [
        { name: "Maximum acc.:", val: 0 },
        { name: "Minimum acc.:", val: 0 },
        { name: "Main Frequency:", val: 0 },
        { name: "Spring Index:", val: 0 },
      ],
      num: "1",
      screenWidth: document.body.clientWidth,
      tableData: [
        
      ],
    };
  },
  components: {
    navbar,
    left,
    status,
  },
  mounted: function () {
    const that = this;
    that.width = $("#cxfigure").width();
    var scale;
    $.ajax({
      url: this.url + "api/v1/sensor/list/?place=5",
      type: "GET",
      async: false,
      success: function (ret) {
        // that.sensordata = ret.sensorinfo;
        that.str = "data:image/jpg;base64," + ret.image;

        const result = ret.sensors.map((item) => ({
          value: item.location,
          name: item.id,
        }));
        that.dataa = result;
        console.log(that.dataa);
        scale = that.width / ret.size[0];
        that.cxzoom = scale;
        for (let i = 0; i < that.dataa.length; i++) {
          that.dataa[i].value[0] *= scale;
          that.dataa[i].value[1] *= scale;
        }
        // for (let i = 0; i < that.dataa.length; i++) {
        //     that.dataa[i].value[0] *= scale;
        //     that.dataa[i].value[1] *= scale;
        // }
        that.cximagew = ret.size[0];
        that.cximageh1 = ret.size[1];
      },
    });

    this.settrain();

    this.initpic1();
    this.initpic2();
    setTimeout(() => {
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          that.screenWidth = window.screenWidth;
          this.cxChart.resize();
          this.fftmyChart.resize();
          this.myChart.resize();
        })();
      };
    }, 400);

    this.cxChart.on("click", { seriesName: "sensorindex" }, function (params) {
      //console.log(params.data['id']);
      console.log(params.data["name"]);
      var s = { M: "update", id: params.data["name"] };
      sendWebsocket(s, that.getresult);
      that.updata(params.data["name"]);
    });
    this.sensorlist(3);
  },

  methods: {
    sensorlist(j) {
      var that = this;
      $.ajax({
        url: this.url + "api/v1/sensor/place/",
        type: "get",
        async: false,
        xhrFields: {
          withCredentials: true,
        },
        success: function (ret) {
          for (var i = 0; i < ret[j].sensors.length; i++) {
            that.tableData.push({
              name: "Description of sensor " + ret[j].sensors[i].number,
              id: ret[j].sensors[i].id,
            });
          }
        },
      });
    },
    handleCurrentChange(val) {
      var that = this;
      this.currentRow = val;
      console.log(this.currentRow.id);
      this.updata(this.currentRow.id);
      var s = { M: "update", id: this.currentRow.id };
      sendWebsocket(s, this.getresult);
    },
    updata(id) {
      var that = this;
      $.ajax({
        url: this.url + "api/v1/sensor/info/?id=" + id,
        type: "get",
        async: false,
        xhrFields: {
          withCredentials: true,
        },
        success: function (ret) {
          that.sensordata1 = [];
          that.sensordata1.push(
            { name: "Type", val: ret.sensor_type },
            { name: "Place", val: ret.place },
            { name: "Range", val: ret.range },
            { name: "Channel", val: ret.channel }
          );
        },
      });
    },
    a(data1) {
      var that = this;
      return new Promise(function () {
        if (data1.M === "fft") {
          that.fftdata = [];
          for (var i = 0; i < data1.x.length; i++) {
            that.fftdata.push({
              name: data1.x[i],
              value: [data1.x[i], data1.y[i]],
            });
          }
          that.fftmyChart.setOption({
            series: [
              {
                data: that.fftdata,
              },
            ],
          });
          that.fftmyChart.hideLoading();
        } else if (data1.M === "raw") {
          if (that.sensordata.length + data1.x.length >= 500) {
            that.sensordata.splice(
              0,
              that.sensordata.length + data1.x.length - 500
            );
          }
          for (var i = 0; i < data1.x.length; i++) {
            that.sensordata.push({
              name: data1.x[i],
              value: [data1.x[i], data1.y[i]],
            });
          }
          that.myChart.setOption({
            series: [
              {
                data: that.sensordata,
              },
            ],
          });
          that.myChart.hideLoading();
        } else if (data1.M === "kv") {
          if (data1.max_acc) that.sensorinfo[0].val = data1.max_acc;
          if (data1.min_acc) that.sensorinfo[1].val = data1.min_acc;
          if (data1.main_freq) that.sensorinfo[2].val = data1.main_freq;
          if (data1.spring_idx) that.sensorinfo[3].val = data1.spring_idx;
        }
      });
    },
    getresult(res) {
      this.a(res);
    },
    changewidth() {
      document.getElementById("aside").setAttribute("style", "width:64px");
    },

    changewidth1() {
      document.getElementById("aside").setAttribute("style", "width:250px");
    },
    settrain() {
      var str = "";
      var that = this;

      var echarts = require("echarts");
      this.cxChart = echarts.init(document.getElementById("cxfigure"), "light");

      var cximageoption = {
        grid: {
          left: "center",
          top: "center",
        },
        //backgroundColor: "#1c222c",
        xAxis: {
          splitLine: { show: false },
          position: "top",
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          silent: true,
          min: 0,
          max: 499,
        },
        yAxis: {
          splitLine: { show: false },
          min: 0,
          max: 364,
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            //console.log(JSON.stringify(params))
            if (params.data.hasOwnProperty("alarm")) {
              return (
                "报警时间:" +
                params.data["alarm"]["time"] +
                "<br>报警值:" +
                params.data["alarm"]["value"] +
                ""
              );
            }
            return "正常";
          },
        },
        series: [
          {
            name: "sensorindex",
            symbolSize: 100,
            type: "scatter",
            symbol: "pin",
            data: [
              {
                name: "温度",
                value: [499, 364],
                id: 123,
              },
              {
                name: "震动",
                value: [49, 34],
                id: 122,
              },
            ],
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            itemStyle: {
              color: function (params) {
                //判断选中的名字改变柱子的颜色样式
                //if(checkName  === params.name){
                return "#5470C6";
                //'#91CC75'; green
                //#5470C6 blue
              },
              shadowBlur: 5,
              shadowColor: "#333",
            },
            // markPoint: {
            //         data: [
            //             {type: 'max', name: '最大值'},
            //             {type: 'min', name: '最小值'}
            //         ]
            //     },
            label: {
              show: true,
              formatter: "{b}",
            },
            zlevel: 1,
          },
          {
            name: "bgp",
            type: "pictorialBar",
            symbolPosition: "center",
            // symbol: this.str,
            z: -10,
            silent: true,
            animate: false,
            data: [
              {
                value: [49 / 2, 34],
                symbolSize: [49, -34],
              },
            ],
          },
        ],
        //backgroundColor: "#000000",
      };

      this.cxChart.setOption(cximageoption);

      let cximagew = parseFloat(this.cximagew) * parseFloat(this.cxzoom);

      let cximageh = parseFloat(this.cximageh1) * parseFloat(this.cxzoom);
      $("#cxfigure").height("310px");

      this.cxChart.setOption({
        grid: {
          width: cximagew,
          height: cximageh,
        },
        xAxis: {
          max: cximagew,
        },
        yAxis: {
          max: cximageh,
        },
        series: [
          {
            name: "sensorindex",
            //type:'scatter',
            symbolSize: 100 * parseFloat(that.cxzoom),
            data: that.dataa,
          },
          {
            name: "bgp",
            //  type:'scatter',
            symbol: "image://" + that.str,
            data: [
              {
                value: [cximagew / 2, cximageh],
                symbolSize: [cximagew, cximageh * -1],
              },
            ],
          },
        ],
      });

      this.cxChart.resize();
    },
    initpic1() {
      var echarts = require("echarts");
      this.fftmyChart = echarts.init(
        document.getElementById("fftfigure"),
        "dark"
      );
      var fftoption = {
        title: {
          text: "FFT",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          axisLabel: {
            //interval: 100, //此处关键， 设置文本标签全部显示
            showMaxLabel: true, //强制显示最后一个
          },
          scale: true,
          type: "value",
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          scale: true,
          splitLine: {
            show: false,
          },
        },
        dataZoom: {
          type: "inside",
          start: 0,
          end: 100,
        },
        series: [
          {
            name: "Sensor1",
            visualMap: true,
            type: "line",
            symbol: "none",
            color: "#42947a",
          },
        ],
        backgroundColor: "#0b376d",
        animation: false,
      };
      this.fftmyChart.setOption(fftoption);
      this.fftmyChart.showLoading();
    },
    initpic2() {
      var echarts = require("echarts");
      this.myChart = echarts.init(
        document.getElementById("sensorfigure"),
        "dark"
      );
      var option = {
        title: {
          text: "RealTime",
        },
        tooltip: {
          trigger: "axis",
          // formatter: function (params) {
          //      params = params[0];
          //      var date = new Date(params.name);
          //      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          //  },
          axisPointer: {
            animation: false,
          },
        },
        // legend: {
        //     data: ['Sensor1']
        // },
        xAxis: {
          axisLabel: {
            //interval: 100, //此处关键， 设置文本标签全部显示
            showMaxLabel: true, //强制显示最后一个
          },
          type: "time",
          //boundaryGap: false,
          //data: xdata,
        },
        yAxis: {
          type: "value",
          scale: true,
          //boundaryGap: [0, '100%'],
          splitLine: {
            show: false,
          },
        },
        dataZoom: {
          type: "inside",
          start: 0,
          end: 100,
        },
        visualMap: [
          {
            type: "piecewise",

            pieces: [
              {
                gt: 1555.8,
                color: "#941600",
              },
              {
                lte: 1555.2,
                color: "#42947a",
              },
            ],
            outOfRange: {
              color: "#9fa4a9",
            },
            show: false,
          },
        ],
        series: [
          {
            name: "Sensor1",
            visualMap: true,
            type: "line",
            symbol: "none",
            markLine: {
              silent: false,
              lineStyle: {
                type: "dashed",
              },
              symbol: "circle",
              data: [
                {
                  yAxis: 1555.2,
                  lineStyle: {
                    color: "#42947a",
                  },
                },
                {
                  yAxis: 1555.8,
                  lineStyle: {
                    color: "#941600",
                  },
                },
              ],
            },
          },
        ],
        backgroundColor: "#0b376d",
        animation: false,
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
      this.myChart.showLoading();
    },
  },
};
</script>
<style >
.el-card__body {
  padding: 0px;
}
#aside {
  width: 250px;
}
#cxfigure {
}

.trainbody {
  border-radius: 20px;
  background-color: #e6e6e6;
}

.el-table td,
.el-table th.is-leaf {
  border-bottom: 0px;
}
.el-table__body tr.current-row > td {
  background-color: #f19944 !important;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
</style>