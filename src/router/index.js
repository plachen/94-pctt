import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'   //旧的写法 新写法如下
import Home from '@/views/home'
import Login from '@/views/login'
import SecondHome from '@/views/home/second_home'
Vue.use(VueRouter)
// 路由表
const routes = [
  {
    // 强制跳转redirect
    path: '/',
    redirect: 'home'
  },

  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '', // 二级路由的路径什么都不写 代表二级路由的默认组件
        component: SecondHome
      },
      {
        path: 'comment',
        component: () => import('@/views/comment')
      },
      {
        path: 'material',
        component: () => import('@/views/material')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  //   // 按需加载
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
