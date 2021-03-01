<template>
    <div class="statu">
        <el-row :gutter="20" style=""  class="state">
            <span style="font-size:20px;color:red;">{{status}}</span>
            <span  style="margin-left:20px;color:white">{{speed}}km/h</span>
            <span   style="margin-left:10px;color:white">{{tem}}℃</span>
              <span
               style="margin-left:20px;color:white"
                            class="disabled"
                            tabindex="-1"
                            aria-disabled="true"
                            id="showtime"
                        ></span>
        </el-row >
    
    </div>
</template>

<script>
export default {
    name:"status",
    data(){
        return{
       status:"warning",
       speed:"70",
       tem:"34"
}
    },
      mounted: function () {
        let that = this;
        that.time123();
    },
    methods: {
        time123() {
            var date = new Date(); //日期对象
            var now = "";
            now = date.getFullYear() + "年"; //读英文就行了
            now = now + (date.getMonth() + 1) + "月"; //取月的时候取的是当前月-1如果想取当前月+1就可以了
            now = now + date.getDate() + "日";
            now = now + date.getHours() + "时";
            now = now + date.getMinutes() + "分";
            now = now + date.getSeconds() + "秒";
            document.getElementById("showtime").innerHTML = now; //div的html是now这个字符串
            setTimeout(this.time123, 1000); //设置过1000毫秒就是1秒，调用show方法
        },
    },
}
</script>
<style scoped>
.state{
    float: right;
    padding-right: 30px;
    
}
</style>