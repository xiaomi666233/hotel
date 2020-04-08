import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import login from '@/pages/login'
import order from '@/pages/order'
import orderMsg from '@/pages/orderMsg'
import roomMsg from '@/pages/roomMsg'
import checkOut from '@/pages/checkOut'
import menu from '@/pages/menu'
import menuManagement from "../pages/menuManagement";
import menuOrder from "../pages/menuOrder";
Vue.use(Router)
// 路由
export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
          path: '/order',
          name: 'order',
          component: order
        },
        {
          path: '/orderMsg',
          name: 'orderMsg',
          component: orderMsg
        },
        {
          path: '/roomMsg',
          name: 'roomMsg',
          component: roomMsg
        },
        {
          path: '/checkOut',
          name: 'checkOut',
          component: checkOut
        },
        {
          path: '/menu',
          name: 'menu',
          component: menu
        },
        {
          path: '/menuManagement',
          name: 'menuManagement',
          component: menuManagement
        },
        {
          path: '/menuOrder',
          name: 'menuOrder',
          component: menuOrder
        }
      ]
    },

  ]
})
