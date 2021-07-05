<template>
    <nav class="navbar navbar-fixed-top navbar-expand-xl">
        <div class="container-fluid">
            <div class="navbar-btn">
                <button type="button" class="btn-toggle-offcanvas">
                    <i class="lnr lnr-menu fa fa-bars"></i>
                </button>
            </div>

            <div class="navbar-brand">
                <span style="font-size: 100%"
                    >Data Center
                    <a href="/" class="badge badge-primary">v2.0</a></span>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <img
                            src="../../static/images/logo1.png"
                            id="logo1"
                            style="width: 100%; height: 100%; float: right"
                        />
                    </li>
                    <li class="nav-item">
                        <img
                            src="../../static/images/logo2.png"
                            id="logo2"
                            style="width: 60%; height: 100%; float: right"
                        />
                    </li>
                </ul>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item mt-1">
                        <span
                            class="disabled"
                            tabindex="-1"
                            aria-disabled="true"
                            id="showtime"
                        ></span>
                    </li>
                    <li class="nav-item">
                        <el-dropdown >
                            <span class="el-dropdown-link">
                                Language
                                <i
                                    class="el-icon-arrow-down el-icon--right"
                                ></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a"
                                    >中文</el-dropdown-item
                                >
                                <el-dropdown-item command="b"
                                    >English</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
            </div>
            <div>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="#" class="icon-menu"
                            ><i class="icon-login"></i
                        ></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: "navarbar",

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
};
</script>
<style scoped>
.el-dropdown-link {
    margin-left: 100px;
    color: #ffffff;
}
</style>
