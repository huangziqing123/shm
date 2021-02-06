<template>
  <div class="block-header">
    <div class="row clearfix mb-2">
      <div
        id="trainfigure"
        class="col-lg-12 col-md-12 col-sm-12"
        style="height: 128px; width: 100%; text-align: center"
      >
        <img
          src="../../static/images/333.png"
          usemap="#trainmap"
          id="trainimg"
          style="width: 100%; height: 100%"
        />
        <map name="trainmap" id="trainmap"> </map>
      </div>
    </div>
    <div class="row clearfix">
      <div class="col-lg-5 col-md-12 col-sm-12">
        <div class="card">
          <div class="body">
            <div class="row">
              <div
                id="cxfigure"
                class="col-12"
                style="width: 100%; height: 74.1px"
              ></div>
            </div>
            <div class="row my-2" style="">
              <div class="col-12" style="text-align: center">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn btn-primary active">
                    <input
                      type="radio"
                      name="options"
                      id="xfj_option1"
                      checked
                      onclick="onclick_xfjoption(this.value)"
                      value="1"
                    />
                    悬浮架1
                  </label>
                  <label class="btn btn-primary">
                    <input
                      type="radio"
                      name="options"
                      id="xfj_option2"
                      onclick="onclick_xfjoption(this.value)"
                      value="2"
                    />
                    悬浮架2
                  </label>
                  <label class="btn btn-primary">
                    <input
                      type="radio"
                      name="options"
                      id="xfj_option3"
                      onclick="onclick_xfjoption(this.value)"
                      value="3"
                    />
                    悬浮架3
                  </label>
                  <label class="btn btn-primary">
                    <input
                      type="radio"
                      name="options"
                      id="xfj_option4"
                      onclick="onclick_xfjoption(this.value)"
                      value="4"
                    />
                    悬浮架4
                  </label>
                  <label class="btn btn-primary">
                    <input
                      type="radio"
                      name="options"
                      id="xfj_option5"
                      onclick="onclick_xfjoption(this.value)"
                      value="5"
                    />
                    悬浮架5
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="body">
            <div class="row clearfix my-2">
              <div class="form-inline">
                <div class="col-5">
                  <button
                    class="btn btn-warning"
                    type="button"
                    onclick="onclick_start()"
                    id="btn_start"
                  >
                    Start
                  </button>
                  <button
                    class="btn btn-danger"
                    type="button"
                    onclick="onclick_stop()"
                    id="btn_stop"
                  >
                    Stop
                  </button>
                </div>
                <div class="col-7">
                  <div class="row">
                    <input
                      type="number"
                      class="form-control"
                      id="inputsamplenum"
                      style="width: 60%; color: #ffffff"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-info dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Samples
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" onclick="onclick_sample(500)"
                          >500</a
                        >
                        <a class="dropdown-item" onclick="onclick_sample(1000)"
                          >1000</a
                        >
                        <a class="dropdown-item" onclick="onclick_sample(2000)"
                          >2000</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row clearfix my-2">
              <div class="col-12">
                <div class="btn-group">
                  <button
                    class="btn btn-primary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="selector_channel_text"
                  >
                    Select channel
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                    id="selector_channel"
                  ></div>
                </div>
                <div class="btn-group">
                  <button
                    class="btn btn-primary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="selector_sensor_text"
                  >
                    Select sensor
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                    id="selector_sensor"
                  ></div>
                </div>
              </div>
            </div>
            <div class="row clearfix mt-2">
              <div class="fancy-checkbox">
                <label
                  ><input
                    type="checkbox"
                    id="cb_autosatis"
                    checked="checked"
                  /><span>Adaptive</span></label
                >
              </div>
            </div>
            <div class="row clearfix">
              <div
                class="input-group input-group-sm mx-3 boundgroup"
                style="display: none; width: 40%"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default"
                    >Upper Bound</span
                  >
                </div>
                <input
                  type="number"
                  id="inputautosatismax"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>

              <div
                class="input-group input-group-sm boundgroup"
                style="display: none; width: 40%"
              >
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default"
                    >Lower bound</span
                  >
                </div>
                <input
                  type="number"
                  id="inputautosatismin"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5 col-md-12 col-sm-12">
        <div class="card" style="height: 98%">
          <div class="body">
            <div class="row">
              <div
                id="xfjfigure"
                class="col-12"
                style="height: 265px; width: 100%"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-md-12 col-sm-12">
        <div class="card" style="height: 98%">
          <div class="body">
            <div class="header">
              <h2>Sensor detail</h2>
            </div>
            <table class="table m-b-0">
              <tbody>
                <tr v-for="sen in sensordata" v-bind:key="sen.name">
                  <td v-text="sen.name"></td>
                  <td v-text="sen.data"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row clearfix">
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="card">
          <div class="body" style="text-align: center">
            <div
              id="sensorfigure"
              class="col-lg-12"
              style="height: 250px; width: 100%"
            ></div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="card">
          <div class="body" style="text-align: center">
            <div
              id="fftfigure"
              class="col-lg-12"
              style="height: 250px; width: 100%"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
 
export default {
  data() {
    return {
      cximageh: "height:" + 241 + "px",
      cximageh1: 237,
      cxzoom: 0.3,
      cximagew: 1448,
      sensordata: [],

      xfjzoom: 0.5,
      xfjimageh: 530,
      xfjimagew: 1006,
    };
  },
  mounted: function () {
    var that = this;
   var echarts = require("echarts");
var cxChart = echarts.init(document.getElementById("cxfigure"), "dark");
    var str = "";
    var dataa = [];
    // var myChart = echarts.init(document.getElementById("sensorfigure"), "dark");
    // var fftmyChart = echarts.init(document.getElementById("fftfigure"), "dark");
    $.ajax({
      url: "http://127.0.0.1:8000/test123/",
      type: "GET",
      async: false,
      success: function (ret) {
        str = JSON.parse(ret)["img"];
        //console.log(str);
        dataa = JSON.parse(ret)["cxdata"];
        dataa = JSON.parse(dataa);
        that.sensordata = JSON.parse(ret)["sensordata"];
        //console.log(that.sensordata);
      },
    });


    var cximageoption = {
      grid: {
        left: "center",
        top: "center",
        width: 49,
        height: 36,
      },
      backgroundColor: "#1c222c",
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
          symbolSize: 20,
          type: "effectScatter",
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
            color: "#3EACFF",
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
      backgroundColor: "#0b376d",
    };

    // 使用刚指定的配置项和数据显示图表。
    cxChart.setOption(cximageoption);

    let cximagew = parseFloat(this.cximagew) * parseFloat(this.cxzoom);

    let cximageh = parseFloat(this.cximageh1) * parseFloat(this.cxzoom);
    $("#cxfigure").height(this.cximageh);

    cxChart.setOption({
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
          // type:'scatter',
          symbolSize: 60 * parseFloat(0.3),
          data: dataa,
        },
        {
          name: "bgp",
          //  type:'scatter',
          symbol: str,
          data: [
            {
              value: [cximagew / 2, cximageh],
              symbolSize: [cximagew, cximageh * -1],
            },
          ],
        },
      ],
    });

    cxChart.resize();
    this.initframe();
    this.initpic1();
    this.initpic2();
  },

  methods: {
    initframe() {
      var framedata = [];
      var framestr = "";
      var echarts = require("echarts");
      var xfjChart = echarts.init(document.getElementById("xfjfigure"), "dark");
      $.ajax({
        url: "http://127.0.0.1:8000/test123/",
        type: "GET",
        async: false,
        success: function (ret) {
          framestr = JSON.parse(ret)["xfjimg"];
          framedata = JSON.parse(ret)["xfdata"];
          framedata = JSON.parse(framedata);
        },
      });
      var xfjimageoption = {
        grid: {
          left: "center",
          top: "center",
          width: 49,
          height: 36,
        },
        backgroundColor: "#1c222c",
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
            symbolSize: 20,
            type: "effectScatter",
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
              color: "#3EACFF",
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
        backgroundColor: "#0b376d",
      };
      xfjChart.setOption(xfjimageoption);

      let xfjimagew = parseFloat(this.xfjimagew) * parseFloat(this.xfjzoom);
      let xfjimageh = parseFloat(this.xfjimageh) * parseFloat(this.xfjzoom);
      $("#xfjfigure").height(xfjimageh);
      xfjChart.setOption({
        grid: {
          width: xfjimagew,
          height: xfjimageh,
        },
        xAxis: {
          max: xfjimagew,
        },
        yAxis: {
          max: xfjimageh,
        },
        series: [
          {
            name: "sensorindex",

            symbolSize: 60 * parseFloat(this.xfjzoom),
            data: framedata,
          },
          {
            name: "bgp",

            symbol: framestr,
            data: [
              {
                value: [xfjimagew / 2, xfjimageh],
                symbolSize: [xfjimagew, xfjimageh * -1],
              },
            ],
          },
        ],
      });
      xfjChart.resize();
    },
    initpic1() {
      var echarts = require("echarts");
      var fftmyChart = echarts.init(
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
      fftmyChart.setOption(fftoption);
      fftmyChart.showLoading();
    },

    initpic2(){
      var echarts = require("echarts");
      var myChart = echarts.init(document.getElementById('sensorfigure'), 'dark');
var option = {
    title: {
        text: 'RealTime'
    },
    tooltip: {
        trigger: 'axis',
        // formatter: function (params) {
        //      params = params[0];
        //      var date = new Date(params.name);
        //      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        //  },
        axisPointer: {
            animation: false
        }
    },
    // legend: {
    //     data: ['Sensor1']
    // },
    xAxis:
        {
            axisLabel: {
                //interval: 100, //此处关键， 设置文本标签全部显示
                showMaxLabel: true //强制显示最后一个
            },
            type: 'time',
            //boundaryGap: false,
            //data: xdata,

        },
    yAxis: {

        type: 'value',
        scale: true,
        //boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    dataZoom: {
        type: 'inside',
        start: 0,
        end: 100
    },
    visualMap: [{
        type: 'piecewise',

        pieces: [{
            gt: 1555.8,
            color: '#941600',
        }, {
            lte: 1555.2,
            color: '#42947a'
        }],
        outOfRange: {
            color: '#9fa4a9'
        },
        show: false
    }],
    series: [
        {
            name: 'Sensor1',
            visualMap: true,
            type: 'line',
            symbol: 'none',
            markLine: {
                silent: false,
                lineStyle: {
                    type: 'dashed',
                },
                symbol: 'circle',
                data: [
                    {
                        yAxis: 1555.2,
                        lineStyle: {
                            color: '#42947a'
                        }
                    }, {
                        yAxis: 1555.8,
                        lineStyle: {
                            color: '#941600'
                        }
                    }
                ]

            },

        }
    ],
    backgroundColor: '#0b376d',
    animation: false
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChart.showLoading();
    }
  },
};
</script>

<style>
</style>
