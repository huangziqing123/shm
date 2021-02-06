<template>
    <div class="nav" style="background-color:#1e2f4f">
        <el-row :gutter="0" style="height:50px">
            <el-col :span="12">
                <a href="/" style="font-size: 30px; color: white; margin-top: 30px"
                   >Structural Health Monitoring System of Maglev
                </a>
            </el-col>

            <el-col :span="3">
                <img
                    src="../../static/images/logo1.png"
                    id="logo1"
                    style="width: 80%; height: 80%;margin-top:5px"
                />&nbsp;&nbsp;
            </el-col>
            <!-- <el-col :span="1">
        &nbsp;
    </el-col> -->
            <el-col :span="3">
                <img
                    src="../../static/images/logo2.png"
                    class="image"
                    style="width: 100%; height: 120%;margin-top:5px"
                />
            </el-col>
            <el-col :span="5">
                <el-dropdown @command="handleCommand" style="margin-top:10px">
                    <span class="el-dropdown-link" >
                        Language
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">中文</el-dropdown-item>
                        <el-dropdown-item command="b">English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="1">
               <el-link type="danger" icon="el-icon-switch-button" style="float:right;margin-top:10px"></el-link>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "navarbar",

    mounted: function () {
      
    },
    methods: {
      
    },
};
</script>
<style scoped>
.el-dropdown-link {
    margin-left: 100px;
    color: #ffffff;
}
.el-header{
    padding: 0px;
}
</style>
