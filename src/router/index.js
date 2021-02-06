import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import dashboard from '@/components/dashboard'
import mainboard from '@/components/mainboard'
import navarbar from '@/components/navarbar'
import left from '@/components/left-navar'
import trainbody from '@/components/trainbody'
import fault from '@/components/faultalarm'
import mainpage from '@/components/mainpage'
import analysis from '@/components/analysis'
import record from '@/components/record'
import suspension from '@/components/suspension'
import rail from '@/components/rail'
import viaducts from '@/components/viaducts'
import status from '@/components/status'


Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/dash',
      name:'dashboard',
      component:dashboard
    },
    {
      path:'/mainboard',
      name:'mainboard',
      component:mainboard
    },
    {
      path:'/navarbar',
      name:'navarbar',
      component:navarbar
    },
    {path:'/left',
    name:'leftnavar',
    component:left,
   children:[
     {
      path:'/trainbody',
      name:'trainbody',
      component:trainbody
     },
     {
      path:'/fault',
      name:'fault',
      component:fault

    },
    {
      path:'/analysis',
      name:'analysis',
      component:analysis
    },
    {
      path:'/record',
      name:'record',
      component:record
    },
    {
      path:'/suspension',
      name:'suspension',
      component:suspension
    },
    {
      path:'/rail',
      name:'rail',
      component:rail
    },
    {
      path:'/viaducts',
      name:'viaducts',
      component:viaducts
    },

   ]
    },
    // {
    //   path:'/trainbody',
    //   name:'trainbody',
    //   component:trainbody
    // },
    // {
    //   path:'/fault',
    //   name:'fault',
    //   component:fault

    // },
    {
      path:'/mainpage',
      name:'mainpage',
      component:mainpage

    },
    // {
    //   path:'/analysis',
    //   name:'analysis',
    //   component:analysis
    // },
    // {
    //   path:'/record',
    //   name:'record',
    //   component:record
    // },
    // {
    //   path:'/suspension',
    //   name:'suspension',
    //   component:suspension
    // },
    // {
    //   path:'/rail',
    //   name:'rail',
    //   component:rail
    // },
    // {
    //   path:'/viaducts',
    //   name:'viaducts',
    //   component:viaducts
    // },
    {
      path:'/status',
      name:'status',
      component:status
    },
  ]
})
