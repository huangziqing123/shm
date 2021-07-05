<template>
    <div class="hello">
         <el-header height="50px" style="background-color:#1e2f4f;">
        <navar></navar>
         </el-header>
         <br>
        <div class="main">
            <el-row :gutter="0">
                <el-col :xs="24" :sm="24" :md="24" :lg="1" :xl="1">
                    <div>&nbsp;</div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="22">
                    <el-row :gutter="0">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
                            <el-card
                                class="ph1"
                                :body-style="{ padding: '0px' }"
                                shadow="never"
                                
                                
                            >
                                <img
                                    src="../../static/images/car.png"
                                    class="image"
                                    style="width: 100%; height: 100%"
                                />
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" align="middle" style="height:100%">
                        <div class="bottom">
                            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                                <div class="block"></div>

                                <el-card class="box">
                                    <div class="box1">
                                        <img
                                            src="../../static/images/watch.png"
                                            class="image"
                                            style="margin-left: 20px"
                                        />
                                        <p
                                            style="
                                                text-align: center;
                                                font-size: 30px;
                                            "
                                        >
                                            Real-time <br />Monitoring
                                        </p>
                                    </div>
                                    <div class="box2" style="">
                                        <el-link
                                            class="list"
                                            @click="gotolink('trainbody')"
                                            >Train Body </el-link
                                        ><br />
                                        <el-link class="list"
                                         @click="gotolink('suspension')"
                                            >Suspension System </el-link
                                        ><br />
                                        <el-link class="list">Track </el-link
                                        ><br />
                                        <el-link class="list"
                                         @click="gotolink('viaducts')"
                                            >Viaducts
                                        </el-link>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                                <el-card class="box">
                                    <div class="box1">
                                        <img
                                            src="../../static/images/ph2.png"
                                            class="image"
                                            style="margin-left: 20px"
                                        />
                                        <p
                                            style="
                                                text-align: center;
                                                font-size: 30px;
                                            "
                                        >
                                            Event <br />Record
                                        </p>
                                    </div>
                                    <div class="box2">
                                        <el-link
                                            class="list2"
                                            @click="gotolink('fault')"
                                            >Fault Alarm </el-link
                                        ><br />
                                        <el-link class="list2"
                                         @click="gotolink('analysis')"
                                            >Fault Analysis </el-link
                                        ><br />
                                        <el-link class="list2"
                                         @click="gotolink('record')"
                                            >Record Management </el-link
                                        ><br />
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                                <el-card class="box">
                                    <div
                                        class="box3"
                                        style="
                                            text-align: center;
                                            height: 238px;
                                        "
                                    >
                                        <img
                                            src="../../static/images/ph3.png"
                                            class="image"
                                            style="margin-left: 20px"
                                        />
                                        <p
                                            style="
                                                text-align: center;
                                                font-size: 30px;
                                            "
                                        >
                                        <el-link @click="setting()" class="setting">
                                            Settings
                                        </el-link>
                                        </p>
                                    </div>
                                </el-card>
                            </el-col>
                        </div>
                    </el-row>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="1" :xl="1"> </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import common from "./common.vue"
import navar from "./navarbar";
export default {
    name: "HelloWorld",
    data() {
        return {
            url:common.url,
        };
    },
    components: {
        navar,
    },
    methods: {
        gotolink(msg) {
            this.$router.push("/" + msg);
        },
        setting(){
            window.location.href=this.url+"admin"
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setting{
    font-size: 30px;
     text-align: center;
}
.ph1 {
    
    width: 100%;
    height:100%;
    border-radius: 30px;
    background-color: #e6e6e6;
    display: block;
    text-align: center;
}
.image {
    text-align: center;
}
.bottom {
    margin-top: 30px;
}
.box {
    border-radius: 30px;
    display: flex;
    justify-content: center;
}
.left {
    width: 580px;
    float: left;
    border-radius: 30px;
}
.box1 {
    float: left;
    width: 200px;
}
.box2 {
    float: right;
}
.list {
    font-size: 20px;
    margin-top: 10px;
}
.list2 {
    font-size: 20px;
    margin-top: 18px;
}
.middle {
    float: left;
    width: 600px;
    border-radius: 30px;
}
.right {
    float: right;
    width: 500px;

    border-radius: 30px;
}
.el-card_body{
    display: flex;
}
</style>
