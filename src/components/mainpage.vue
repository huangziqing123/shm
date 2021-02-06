<template>
    <el-container>
        <el-header height="50px" style="background-color:#1e2f4f;">
            <navbar></navbar>
        </el-header>
        <el-container>
             <el-aside width="235px" ><left></left></el-aside>
           
                <el-main><train></train> </el-main>
           
        </el-container>
    </el-container>
</template>

<script>
import left from "./left-navar.vue";
import navbar from "./navarbar.vue";
import train from './trainbody'
export default {
     components: {
        navbar,
        left,
        train
    },
};
</script>

<style scoped>
</style>