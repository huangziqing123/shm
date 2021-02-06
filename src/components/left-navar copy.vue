<template>
    <div>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#1e2f4f"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
        >
            <el-menu-item index="3">
                <i :class="{ 'el-icon-s-unfold':isCollapse == false, 'el-icon-s-fold':isCollapse == true}" @click="click()"></i>
                <el-avatar 
                    :size="50"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar
                >&nbsp;&nbsp;&nbsp; <span>Welcome</span>&nbsp;&nbsp;&nbsp;
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>Real-time Monitoring</span>
                </template>

                <el-menu-item index="1-1" @click="gotolink('trainbody')">Train Body</el-menu-item>
                <el-menu-item index="1-2" @click="gotolink('suspension')">Suspension Bogie</el-menu-item>
                <el-menu-item index="1-3" @click="gotolink('rail')">F-type Rail</el-menu-item>
                <el-menu-item index="1-4" @click="gotolink('viaducts')">Viaducts</el-menu-item>
                

            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">Event Record</span>
                </template>

                <el-menu-item index="2-1" @click="gotolink('fault')">Fault Alarm</el-menu-item>
                <el-menu-item index="2-2" @click="gotolink('analysis')">Fault Analysis</el-menu-item>
                <el-menu-item index="2-3" @click="gotolink('record')">Record Management</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isCollapse: false,
        };
    },
    methods: {
        click() {
            if (this.isCollapse == false) {
                this.isCollapse = true;
                //this.$emit('changewidth');
                console.log("11111");
            } else {
                this.isCollapse = false;
                //this.$emit('changewidth1');
                console.log("222222");
            }
            console.log("xxx");
        },
         gotolink(msg) {
            this.$router.push("/" + msg);
        },
    },
};
</script>
<style scoped>
.el-menu-vertical-demo {
    
    height: 800px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    
    min-height: 400;
}
.sidebar {
    padding-top: 10px;
}
.el-menu {
    border-right: 0px;
}
</style>