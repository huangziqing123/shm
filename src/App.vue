<template>
  <div id="app">
    <!-- <dashboard></dashboard> -->
    <!-- <left></left> -->
    <router-view/>
  </div>
</template>

<script>
import dashboard from './components/dashboard'
import mainboard from './components/mainboard'
import firstpage from './components/HelloWorld'
import left from './components/left-navar'


export default {
  name: 'App',
  components:{
    dashboard,
    mainboard,
    firstpage,
    left
   
  }
}
</script>

<style>

</style>
