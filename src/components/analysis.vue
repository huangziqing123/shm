<template>
    <div class="fault">
        <el-row :gutter="20">
            <status></status>
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
                                style="height: 340px; width: 100%"
                            ></div>
                        </div>
                    </el-card>
                </el-row>
                <el-row :gutter="10" style="margin-top: 20px">
                    <el-col
                        :xs="24"
                        :sm="24"
                        :md="24"
                        :lg="12"
                        :xl="12"
                        style=""
                    >
                        <el-card style="height: 250px">
                            <div class="text" style="margin-left: 30px">
                                <big><strong> No.: {{eventid}}</strong></big>
                                <br />
                                <br />
                                Status:<a style="color: red"> {{status}}</a> <br />
                                <br />Time:{{time}} Velocity:{{vel}}<br /> 
                                Environment: {{env}} Source: {{source}}
                               
                                <br />
                                 Place:{{place}}
                                <br />Severity: {{severity}}
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-card style="height: 250px">
                            <div style="margin-left: 30px">
                                <big> <strong>Analysis </strong></big
                                ><br /><br />
                                <p id='analysis_text'>
                                <!-- Fault: e.g. Gauge – track irregularity<br />
                                Evidence: 1) e.g. maximum acceleration over 10
                                m/s2 <br />
                                2) e.g. vibration from high frequency over 2
                                minutes <br />
                                3) …<br />
                                Compare with similar cases :<br />
                                20200910085 -->
                                </p>
                            </div>
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
export default {
    data() {
        return {
            analysis:"gdoaknfoewhioejdie  jaoisjidsbdkja",
            url:common.url,
            eventid:null,
            status:null,
            time:null,
            vel:null,
            env: null,
            source:null,
            severity:null,
            place:null,
            cximageh1: 500,
            cxzoom: 0.48,
            cximagew: 2200,
            str: "",
            dataa: [],
            width: 0,
            data: [],
            defaultProps: {
                children: "content",
                label: "label",
            },
            cxChart: null,
            isShowGaoliang: false,
            selectnode: { handler: null, bgcolor: "", color: "" },
            treeheigh: document.body.clientHeight-60+"px"
        };
    },
    components: {
        navbar,
        left,
        status,
    },
    mounted: function () {
        var elementResizeDetectorMaker = require("element-resize-detector");
        const that = this;
        that.width = $("#cxfigure").width();
        var scale;
          $.ajax({
            url:
                this.url+"api/v1/sensor/list/?place=0",
            type: "get",
            async: false,
            xhrFields: {
      withCredentials: true
    },
            success: function (ret) {
                  that.str ="data:image/jpg;base64,"+ ret.image;    
                // console.log(ret.image)
                // that.dataa = ret.trainpicinfo.traindata;
                scale=that.width/ret.size[0];
                that.cxzoom=scale
                const result = ret.sensors.map(item => ({value:item.location, name: item.id}))
                 that.dataa = result;
                //  for(let i=0;i<that.dataa.length;i++)
                // {
                //     that.dataa[i].value[0]*=scale;
                //     that.dataa[i].value[1]*=scale;
                // }
                that.cximagew = ret.size[0];
                that.cximageh1 = ret.size[1];
            },
        });
        //请求错误日志
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
        var erd = elementResizeDetectorMaker();
        erd.listenTo(
            document.getElementsByClassName("xfjbody"),
            function (element) {
                var width = element.offsetWidth;
                var height = element.offsetHeight;

                console.log("Size: " + width + "x" + height);
                //使echarts尺寸重置
                that.cxChart.resize();
            }
        );
    },

    methods: {
        handleNodeClick(v) {
            var that =this
           if(v.content.eid!=null){
               console.log(v.content.eid)
                $.ajax({
            url:
                this.url+"api/v1/event/info?id="+v.content.eid,
            type: "get",
            async: false,
            xhrFields: {
      withCredentials: true
    },
            success: function (ret) {
                 
                console.log(ret)
                  that.eventid=ret.id
                  that.status=ret.status
                  that.place =ret.place
                  that.severity=ret.severity
                  that.source=ret.source
                  that.time=ret.time
                  that.vel=ret.velocity
                  //that.analysis=  
                  document.getElementById("analysis_text").innerHTML=ret.analysis.replaceAll('\r\n','<br />')
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
                                that.selectnode.handler.className =
                                    that.selectnode.class;
                                that.selectnode.handler.style.background =
                                    "#00000000";
                            }
                            that.selectnode.class = content[0].className;
                            content[0].style.background = "#A0CFFF";
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
    },
};
</script>

<style scoped>
.tree{
    height:580px;

     display: block;

     overflow-y: scroll;
}
#analysis_text{
    height: 250px;
     display: block;

     overflow-y: scroll;
}
.s-bg2 {
    background-color: red;
}
.s-c {
    font-weight: 700;
    color: #53a8ff;
}
</style>