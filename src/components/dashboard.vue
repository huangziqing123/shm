<template>
    <div id="wrapper">
        <navbar></navbar>
        <left></left>
        <div id="main-content">
            <div class="container-fluid">
                <mainboard></mainboard>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import mainboard from "./mainboard.vue";
import left from "./left-navar.vue";
import navbar from "./navarbar.vue";
export default {
    name: "dashboard",
    data() {
        return {
            sensordata: [],
        };
    },
    components: {
        mainboard,
        navbar,
        left,
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
        getinfor() {
            $.ajax({
                url: "http://127.0.0.1:8083/getcxpos/",
                type: "GET",
                success: function (ret) {
                    console.log(ret);
                },
            });
        },
    },
};
</script>

<style>
#logo1 {
    float: right;
    padding-left: 150px;
    padding-right: 0;
}
#logo2 {
    padding-right: 80px;
}

</style>