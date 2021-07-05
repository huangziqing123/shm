<template>
    <div>
        <div class="train">
            <el-container>
                <el-header height="50px" style="background-color:#1e2f4f;">
                    <navbar></navbar>
                </el-header>
                <el-container>
                     <el-aside width="235px"><left></left></el-aside>
                  
                        <el-main>
                            <div id="">
                                <el-row :gutter="20" >
                                    <status></status>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                                        <el-card
                                            class="trainbody"
                                            style="
                                                backgroundcolor: #e6e6e6;
                                                                     height: 100%;
                                            "
                                        >
                       <div class="row">
                                                <div
                                                    id="cxfigure"
                                                    class="col-12"
                                                    style="
                                                        width: 100%;
                                                        height: 100%;
                                                    "

                                                ></div>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
                                        <el-card
                                            class="sensor"
                                            style="backgroundcolor: #e6e6e6"
                                        >
                                            <el-table
                                                class="table1"
                                                :data="tableData"
                                                stripe
                                                highlight-current-row
                                                style="
                                                    width: 100%;
                                                    height: 100%;
                                                    background-color: #e6e6e6;
                                                "
                                                height="310"
                                            >
                                                <el-table-column
                                                    prop="name"
                                                    label="List of Sensors"
                                                    align="center"
                                                    style="
                                                        background-color: #e6e6e6;
                                                    "
                                                />
                                            </el-table>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20" style="margin-top: 30px">
                                    <el-col
                                        :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
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
                                    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
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
                                        :xs="24" :sm="24" :md="24" :lg="4" :xl="4"
                                        style="text-align: center"
                                    >
                                        <el-card
                                            style="
                                                text-align: center;
                                                height: 290px;
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
                                    <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
                                        <el-card
                                            style="
                                                text-align: center;
                                               height: 290px;
                                            "
                                            ><h2 style="font-size: 20px">
                                                Sensor Information
                                            </h2>
                                            <el-table
                                                class="table2"
                                                :data="sensordata"
                                                style="
                                                    width: 100%;
                                                    height: 100%;
                                                    background-color: #e6e6e6;
                                                    
                                                "
                                                 height="300"
                                                 :show-header=false

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
                            </div>
                        </el-main>
                   
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script>
import left from "./left-navar.vue";
import navbar from "./navarbar.vue";
import status from "./status.vue"
export default {
    name: "trainbody",
    data() {
        return {
            cximageh: "height:" + 405 + "px",
            cximageh1: 500,
            cxzoom: 1,
            cximagew: 2200,
            str: "",
            dataa: [],
            cxChart: null,
             fftmyChart:null,
            myChart:null,
            sensordata: [
                { name: "Type" },
                { name: "Place" },
                { name: "Range" },
                { name: "Channel" },
            ],
            sensorinfo: [
                { name: "Maximum acc.:" },
                { name: "Minimum acc.:" },
                { name: "Main Frequency:" },
                { name: "Spring Index:" },
            ],
            num: "1",
            screenWidth: document.body.clientWidth,
            tableData: [
                {
                    name: "Description of sensor 1",
                },
                {
                    name: "Description of sensor 2",
                },
                {
                    name: "Description of sensor 3",
                },
                {
                    name: "Description of sensor 4",
                },
                { name: "Description of sensor 5" },
                { name: "Description of sensor 6" },
            ],
        };
    },
    components: {
        navbar,
        left,
        status
    },
    mounted: function () {
        const that = this;
        $.ajax({
            url:
                "http://10.0.2.20:8000/api/v1/gettrainpageinfo/?piczoom=" +
                this.cxzoom.toString(),
            type: "GET",
            async: false,
            success: function (ret) {
                that.sensordata = ret.sensorinfo;
                that.str = ret.trainpicinfo.url;
                that.dataa = ret.trainpicinfo.traindata;

                that.cximagew = ret.trainpicinfo.width;
                that.cximageh1 = ret.trainpicinfo.height;
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
    },

    methods: {
        changewidth() {
            document
                .getElementById("aside")
                .setAttribute("style", "width:64px");
        },

        changewidth1() {
            document
                .getElementById("aside")
                .setAttribute("style", "width:250px");
        },
        settrain() {
            var str = "";
            var that = this;

            var echarts = require("echarts");
            this.cxChart = echarts.init(
                document.getElementById("cxfigure"),
                "light"
            );

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
                        symbolSize: 30 * parseFloat(that.cxzoom),
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