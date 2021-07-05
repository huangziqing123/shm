<template>
    <div class="" style="background-color:#1e2f4f">
        <el-row :gutter="0" style="height:50px">
            <el-col :span="12" class="leftside">
                <a href="/" style="font-size: 30px; color: white; display:flex; justify-content: flex-start;align-items: center;"
                   >Structural Health Monitoring System of Maglev
                </a>
            </el-col>

            <el-col :span="3" class="middle">
                <img
                    src="../../static/images/logo1.png"
                    id="logo1"
                    style="max-height:100%;padding:5px"
                />&nbsp;&nbsp;
            </el-col>
            <!-- <el-col :span="1">
        &nbsp;
    </el-col> -->
            <el-col :span="3" class="middle">
                <img
                    src="../../static/images/logo2.png"
                    class="image"
                    style="max-height:100%;padding:5px"
                />
            </el-col>
            <el-col :span="5" class="end">
                <el-dropdown  >
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
            <el-col :span="1" class="end">
               <el-link type="danger" icon="el-icon-switch-button"  style="" @click="logout()"></el-link>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import common from "./common.vue"
export default {
    name: "navarbar",
 data(){
   return{
       url:common.url,
   }
 },
    mounted: function () {
      
    },
    methods: {
      logout(){
          window.location.href=this.url+"admin/logout"
      }
    },
};
</script>
<style scoped>
.el-dropdown-link {
    
    color: #ffffff;
}
.el-header{
    padding: 0px;
}

.middle{
     height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.leftside{
     height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.end{
    height: 100%;
     display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
