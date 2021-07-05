<template>
  <div class="statu">
    <el-row :gutter="20" style="" class="state">
      <span style="font-size: 20px; color: red">{{ this.status }}</span>
      <span style="margin-left: 20px; color: white">{{ this.speed }}km/h</span>
      <span style="margin-left: 10px; color: white">{{ this.tem }}℃</span>
      <span
        style="margin-left: 20px; color: white"
        class="disabled"
        tabindex="-1"
        aria-disabled="true"
        id="showtime"
      ></span>
    </el-row>
  </div>
</template>

<script>
import {sendWebsocket,getmessage,initWebSocket,setStatusCallBackFun} from "../assets/js/websocket";
import websock1 from "../assets/js/websocket"
// import data1 from "../assets/js/websocket"
export default {
  name: "status",
  data() {
    return {
      s: { M: "update", id: 1 },
      
      status: "",
      speed: "",
      tem: "",
    };
  },
  mounted: function () {
    let that = this;
    that.time123();
   setStatusCallBackFun(this.getresult)
    
  },
  created:function(){
    let that = this;
   
  },
  methods: {
    getresult(res) {
      var that = this;
      that.a(res);
     
    },
    a(data1) {
      var that = this;

        if (data1.M === "alarm") {
          this.$notify({
          title: '警告',
          message: data1.msg,
          type: 'warning'
        });
          console.log(data1);
          this.status = data1.level;
        } else if (data1.M === "kv"&&data1.velocity!=null) {
          
          this.speed = data1.velocity;
          this.tem = data1.temperature;
        }
 
    },
    time123() {
      
      var date = new Date(); //日期对象
      var now = "";
      now = date.getFullYear() + "-"; //读英文就行了
      now = now + (date.getMonth() + 1) + "-"; //取月的时候取的是当前月-1如果想取当前月+1就可以了
      now = now + date.getDate() + " ";
      now = now + date.getHours() + ":";
      now = now + date.getMinutes() + ":";
      now = now + date.getSeconds() + "";
      document.getElementById("showtime").innerHTML = now; //div的html是now这个字符串
      setTimeout(this.time123, 1000); //设置过1000毫秒就是1秒，调用show方法
    },
  },
};
</script>
<style scoped>
.state {
  float: right;
  padding-right: 30px;
}
</style>