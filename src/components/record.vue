<template>
    <div class="fault">
        <el-row :gutter="20">
            <status></status>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card class="card">
                    <el-row :gutter="20" style="margin-top: 20px">
                        <el-col
                            :xs="24"
                            :sm="24"
                            :md="24"
                            :lg="1"
                            :xl="1"
                            style="text-align: center"
                        >
                        </el-col>
                        <el-col
                            :xs="24"
                            :sm="24"
                            :md="24"
                            :lg="7"
                            :xl="7"
                            style="text-align: center"
                        >
                            <el-date-picker
                                v-model="value2"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                                value-format="timestamp"
                            >
                            </el-date-picker>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="24" :lg="3" :xl="3">
                            <div class="block">
                                <el-cascader
                                    v-model="value"
                                    :options="options"
                                    :props="{ expandTrigger: 'hover' }"
                                    
                                ></el-cascader>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="1" :xl="1">
                            <el-button type="primary" style="font-size: 15px"
                               @click="select()" >select</el-button
                            >
                        </el-col>
                    </el-row>
                </el-card>
                <el-row
                    :gutter="30"
                    style="margin-top: 40px; text-align: center"
                >
                    <el-col
                        :xs="24"
                        :sm="24"
                        :md="24"
                        :lg="10"
                        :xl="10"
                        style="text-align: center"
                    >
                        <el-card>
                            <div
                                id="sensorfigure"
                                style="height: 250px; width: 100%"
                            ></div>
                        </el-card>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                        <el-card>
                            <div
                                id="fftfigure"
                                style="height: 250px; width: 100%"
                            ></div>
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
                            ><h2 style="font-size: 20px">Sensor{{ this.value[1] }}</h2>
                            <el-table
                                class="table2"
                                :data="sensorinfo"
                                style="
                                    width: 100%;
                                    height: 100%;
                                    background-color: #e6e6e6;
                                "
                                :row-style="{height: '5px'}"
                            :cell-style="{padding: '3px'}"
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
            </el-col>
        </el-row>
    </div>
</template>

<script>
import left from "./left-navar.vue";
import navbar from "./navarbar.vue";
import status from "./status.vue";
import common from "./common.vue"
import { sendWebsocket,getmessage, closeWebsocket } from '../assets/js/websocket'
export default {
    data() {
        return {
             url:common.url,
            s :{"M": "update", "id": 1 } ,
            xfjzoom: 1,
            xfjimageh: 530,
            xfjimagew: 1006,
            num: "1",
            data: [],

            fftmyChart: null,
            myChart: null,
            framedata: [],
            framestr: "",
            screenWidth: document.body.clientWidth,
            sensorinfo: [
                { name: "Maximum acc.:",val:0 },
                { name: "Minimum acc.:",val:0 },
                { name: "Main Frequency:",val:0 },
                { name: "Spring Index:",val:0 },
            ],
            defaultProps: {
                children: "children",
                label: "label",
            },
            isShowGaoliang: false,
            selectnode: { handler: null, bgcolor: "", color: "" },
            pickerOptions: {
                  
           disabledDate: (time) => {
             return this.dealDisabledDate(time);
            },

                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            value2: "",
            value: [],
            options: [
                {
                    id: "1",
                    label: "train body",
                    children: [
                       
                    ],
                },
                {
                    id: "2",
                    label: "Suspension",
                    children: [
                       
                    ],
                },
                {
                    id: "3",
                    label: "Track",
                    children: [
                       
                    ],
                },
                {
                    id: "4",
                    label: "Viaducts",
                    children: [
                      
                    ],
                },
            ],
            websocket: null,
            fftdata: [],
            sensordata:[]
        };
    },
    components: {
        navbar,
        left,
        status,
    },
    // created() {
    //     this.initwebsocket();
 
    mounted: function () {
        var that = this;
       

        this.initpic1();
        this.initpic2();
        $.ajax({
            url:
                this.url+"api/v1/sensor/place/",
            type: "get",
            async: false,
            xhrFields: {
      withCredentials: true
    },
            success: function (ret) {
              for(var i=0;i<ret.length;i++){
                  for(var j=0;j<ret[i].sensors.length;j++){
                   that.options[i].children.push({
                       value:ret[i].sensors[j].id,
                       label:"Sensor"+ret[i].sensors[j].id
                   })
                  }
              }
            }
        })
        setTimeout(() => {
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth;
                    that.screenWidth = window.screenWidth;

                    this.fftmyChart.resize();
                    this.myChart.resize();
                })();
            };
        }, 400);
        //进行websocket连接
        // closeWebsocket()
        //    sendWebsocket(that.s,this.getresult)
        //    var str = getmessage()
        //    console.log(str) 
        //    closeWebsocket()
    },
   
    methods: {
        select(){
          var that=this
             $.ajax({
            url:
                this.url+"api/v1/history/",
            type: "post",
            async: false,
            xhrFields: {
      withCredentials: true
    },
            data:{"id":this.value[1],"start":this.value2[0]/1000,"end":this.value2[1]/1000},
            success: function (ret) {
                 console.log(that.value2[0]/1000+"sss"+that.value2[1]/1000)
                that.getresult(ret)
                //    that.data = ret;
                // that.dataa = ret.trainpicinfo.traindata;
           
            },
        });
      
        },
        dealDisabledDate(time) {
      var times = Date.now()
      return time.getTime() > times;
  },
        getresult(res){
           console.log(res)
            this.a(res)
        },
        a(data1) {
            var that = this;
            return new Promise(function () { 
                  that.fftdata=[]
               for(var i =0;i<data1.fft.data.length;i++) { 
                     
                       
                        that.fftdata.push({
                        
                             name: data1.fft.data[i],
                            value: [data1.fft.data[i][0], data1.fft.data[i][1]],
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
                  that.sensordata=[]

                   for (var i = 0; i < data1.peak.data.length; i++) {
                   that.sensordata.push({
                       name: data1.peak.data[i],
                         value: [data1.peak.data[i][0], data1.peak.data[i][1]],
                           
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
                      that.sensorinfo[0].val=data1.kvs.max_acc
                       that.sensorinfo[1].val=data1.kvs.min_acc
                        that.sensorinfo[2].val=data1.kvs.main_freq
                        that.sensorinfo[3].val=data1.kvs.spring_idx


            });
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

<style>
.s-bg2 {
    background-color: red;
}
.s-c {
    font-weight: 700;
    color: #53a8ff;
}
.xfjbody {
    background-color: #d9d8d4;
}
.el-card__body {
    padding: 0px;
}
.card {
    height: 80px;
    background-color: rgb(176, 196, 222);
    border: rgb(100, 149, 237);
    border-radius: 10px;
}
</style>