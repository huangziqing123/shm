<template>
    <div class="fault">
        
                        <el-row :gutter="20" >
                            <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
                                <el-row :gutter="20">
                                    <el-card
                                        class="xfjbody"
                                        style="
                                            background-color: #e6e6e6;
                                            height: 100%;
                                            width: 100%;
                                        "
                                    >
                                        <div class="row">
                                            <div
                                                id="cxfigure"
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
                                        :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
                                        style="text-align: center"
                                    >
                                        <el-card>
                                            
                                        </el-card>
                                    </el-col>
                                    <el-col  :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                        <el-card>
                                            
                                        </el-card>
                                    </el-col>
                                   
                                </el-row>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
                                <el-card style="height: 100%">
                                    <el-tree
                                        :data="data"
                                        :props="defaultProps"
                                        :default-expand-all="true"
                                        node-key="id"
                                        :highlight-current="isShowGaoliang"
                                        @node-click="handleNodeClick"
                                        ref="deptTree"
                                    ></el-tree>
                                </el-card>
                            </el-col>
                        </el-row>
                   
    </div>
</template>

<script>
import left from "./left-navar.vue";
import navbar from "./navarbar.vue";
export default {
    data() {
        return{

            cximageh1: 500,
            cxzoom: 0.48,
            cximagew: 2200,
            str: "",
            dataa: [],
            data:[],
              defaultProps: {
                children: "children",
                label: "label",
            },
            cxChart:null,
            isShowGaoliang: false,
            selectnode: { handler: null, bgcolor: "", color:"" },
        }
    },
    components: {
        navbar,
        left,
    },
     mounted: function () {
        const that = this;
        $.ajax({
            url:
                "http://10.0.2.20:8000/api/v1/getfaultanalysispageinfo/?piczoom=" +
                this.cxzoom.toString(),
            type: "GET",
            async: false,
            success: function (ret) {
            
                that.str = ret.picinfo.url;
                that.dataa = ret.picinfo.data;
                that.data=ret.faultdiary;
                that.cximagew = ret.picinfo.width;
                that.cximageh1 = ret.picinfo.height;
            },
        });

        this.settrain();
         setTimeout(() => {
               window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth;
                    that.screenWidth = window.screenWidth;
                    this.cxChart.resize();
                    

                })();
            };
           }, 400);
    
    },

    methods:{
         handleNodeClick(v) {
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
    }
}
</script>
<style scoped>
.s-bg2 {
    background-color: red;
}
.s-c {
    font-weight: 700;
    color: #53A8FF;
}
</style>