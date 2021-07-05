<template>
    <div class="fault">
        
                        <el-row :gutter="20" >
                            <status></status>
                            <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                                <el-row :gutter="20">
                                    <el-card
                                        class="xfjbody"
                                        style="
                                            background-color: #d9d8d4;
                                            height: 320px;
                                            width: 100%;
                                        "
                                    >
                                        <div class="row">
                                            <div
                                                id="xfjfigure"
                                                class="col-12"
                                                style="
                                                    height: 340px;
                                                    width: 100%;
                                                "
                                            ></div>
                                        </div>
                                    </el-card>
                                </el-row>
                                <el-row :gutter="10" style="margin-top: 20px">
                                    <el-col
                                        :xs="24" :sm="24" :md="24" :lg="9" :xl="9"
                                        style="text-align: center"
                                    >
                                        <el-card>
                                            <div
                                                id="sensorfigure"
                                                style="
                                                    height: 250px;
                                                    width: 100%;
                                                "
                                            ></div>
                                        </el-card>
                                    </el-col>
                                    <el-col  :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
                                        <el-card>
                                            <div
                                                id="fftfigure"
                                                style="
                                                    height: 250px;
                                                    width: 100%;
                                                "
                                            ></div>
                                        </el-card>
                                    </el-col>
                                    <el-col
                                         :xs="24" :sm="24" :md="24" :lg="6" :xl="6"
                                        style="text-align: center"
                                    >
                                        <el-card
                                            style="
                                                text-align: center;
                                                height: 250px;
                                            "
                                            ><h2 style="font-size: 20px">
                                                Sensor{{ num }}
                                            </h2>
                                            <el-table
                                                class="table2"
                                                :data="sensorinfo"
                                                style="
                                                    width: 100%;
                                                    height: 100%;
                                                    background-color: #e6e6e6;
                                                "
                                                :row-style="{height: '5px'}"
                            :cell-style="{padding: '2px'}"
                                                :show-header="false"
                                            >
                                                <el-table-column
                                                    prop="name"
                                                    align="center"
                                                    style="
                                                        background-color: #e6e6e6;
                                                    "
                                                />
                                                <el-table-column
                                                    prop="val"
                                                    align="center"
                                                    style="
                                                        background-color: #e6e6e6;
                                                    "
                                                />
                                            </el-table>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
                                <el-card style="height: 100%">
                                    <div class="tree">
                                    <el-tree
                                        :data="data"
                                        :props="defaultProps"
                                        
                                        node-key="eid"
                                        :highlight-current=true
                                        @node-click="handleNodeClick"
                                        ref="deptTree"
                                    ></el-tree>
                                    </div>
                                </el-card>
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
            xfjzoom: 0.4,
            xfjimageh: 530,
            xfjimagew: 1006,
            num: "1",
            data: [],
            dataa:[],
            xfjChart:null,
            fftmyChart:null,
            myChart:null,
            framedata: [],
             sensordata:[],
            framestr: "",
            width:0,
             screenWidth: document.body.clientWidth,
            sensorinfo: [
                { name: "Maximum acc.:" },
                { name: "Minimum acc.:" },
                { name: "Main Frequency:" },
                { name: "Spring Index:" },
            ],
            defaultProps: {


                children: "content",
                label: "label",
            },
            isShowGaoliang: false,
            selectnode: { handler: null, bgcolor: "", color:"" },
        };
    },
    components: {
        navbar,
        left,
        status
    },
    mounted: function () {
        var that = this;
        that.width=$("#xfjfigure").width();
        var scale;
        $.ajax({
            url: this.url+"api/v1/sensor/list/?place=1",
            type: "get",
            async: false,
            xhrFields: {
      withCredentials: true
    },
            success: function (ret) {
                that.framestr = "data:image/jpg;base64,"+ ret.image;
              
              scale=that.width/ret.size[0];
                that.xfjzoom=scale
                console.log(scale)
                const result = ret.sensors.map(item => ({value:item.location, name: item.id}))
                  that.framedata = result;
            //    for(let i=0;i<ret.suspensionpicinfo.suspensiondata.length;i++)
            //     {
            //         ret.suspensionpicinfo.suspensiondata[i].value[0]*=scale;
            //         ret.suspensionpicinfo.suspensiondata[i].value[1]*=scale;
            //     }
                that.xfjimageh = ret.size[1];
                that.xfjimagew = ret.size[0];
                that.data = ret.faultdiary;
                // that.framedata = ret.suspensionpicinfo.suspensiondata;
                
            },
        });
        this.initframe();
        this.initpic1();
        this.initpic2();
         setTimeout(() => {
               window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth;
                    that.screenWidth = window.screenWidth;
                    this.xfjChart.resize();
                    this.fftmyChart.resize();
                    this.myChart.resize();

                })();
            };
           }, 400);
            $.ajax({
            url:
                this.url+"api/v1/event/list/",
            type: "get",
            async: false,
            xhrFields: {
      withCredentials: true
    },
            success: function (ret) {
                 
                console.log(ret)
                   that.data = ret;
                // that.dataa = ret.trainpicinfo.traindata;
           
            },
        });
           //websocet连接
         
        //    sendWebsocket(that.s,this.getresult)
        //    var str = getmessage()
        //    console.log(str) 
          
    },
    methods: {
        getresult(res){
          
           this.a(res)
        },
          a(data1) {
            var that = this;
            return new Promise(function () { 
                 
               
               for(var i =0;i<data1.fft.data.length;i++) { 
                     that.fftdata=[]
                    
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
                
            });
        },
        handleNodeClick(v) {
              var that =this
           if(v.content.eid!=null){
               console.log(v.content.eid)
                $.ajax({
            url:
                this.url+"api/v1/event/data/?id=20210614025550002"+"",
            type: "get",
            async: false,
            success: function (ret) {
                 
                console.log(ret)
                  that.getresult(ret)

                // that.dataa = ret.trainpicinfo.traindata;
           
            },
        });
           }
            if (v.eventid != null) {
                let that = this;
                that.$nextTick(function () {
                    //先获取节点
                    let array = document.querySelectorAll(".is-current");
                    console.log(array.length);
                    if (array && array.length > 0) {
                        for (let i = 0; i < array.length; i++) {
                            const element = array[i];
                            //将原来的颜色置为无
                            const content = element.querySelectorAll(
                                ".el-tree-node__content"
                            );
                            if (that.selectnode.handler != null) {
                                that.selectnode.handler.className =that.selectnode.class;
                                that.selectnode.handler.style.background="#00000000"
                                    
                            }
                            that.selectnode.class = content[0].className;
                            content[0].style.background= "#A0CFFF";
                            that.selectnode.handler = content[0];
                            // 加类，变更
                            //alert(v.eventid);
                            content[0].className += " s-c";
                        }
                    }
                });
            }
        },
        initframe() {
            var that = this;

            var echarts = require("echarts");
            that.xfjChart = echarts.init(
                document.getElementById("xfjfigure"),
                "light"
            );

            var xfjimageoption = {
                legend:{show:true},
                grid: {
                    left: "center",
                    top: "center",
                    width: 49,
                    height: 36,
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
                //backgroundColor: "#0b376d",
            };
            that.xfjChart.setOption(xfjimageoption);

            let xfjimagew =
                parseFloat(that.xfjimagew) * parseFloat(that.xfjzoom);
            let xfjimageh =
                parseFloat(that.xfjimageh) * parseFloat(that.xfjzoom);
            $("#xfjfigure").height(xfjimageh);
            that.xfjChart.setOption({
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

                        symbolSize: 30 * parseFloat(that.xfjzoom),
                        data: that.framedata
                    },
                    {
                        name: "bgp",

                        symbol: "image://" + that.framestr,
                        data: [
                            {
                                value: [xfjimagew / 2, xfjimageh],
                                symbolSize: [xfjimagew, xfjimageh * -1],
                            },
                        ],
                    },
                ],
            });
            that.xfjChart.resize();
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
.tree{
    height:580px;

     display: block;

     overflow-y: scroll;
}
.s-bg2 {
    background-color: red;
}
.s-c {
    font-weight: 700;
    color: #53A8FF;
}
.xfjbody {
    background-color: #d9d8d4;
}
.el-card__body {
    padding: 0px;
}
</style>