import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'layout', // 如果父路由有默认子路由那么父路由的name没有意义无法通过name来跳转路由
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // path为空 - 默认子路由(页面一到 '/'路径页面就来到该路由页面)
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import('@/views/mine')
      }
    ]
  },
  // 登录页面的路由
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  // 搜索路由
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  // 文章详情
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 开启 Props 传参， 说白了就是把路由参数映射到组件的props
    props: true
  },
  // 用户个人信息页
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
    // 开启 Props 传参， 说白了就是把路由参数映射到组件的props
    // props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
