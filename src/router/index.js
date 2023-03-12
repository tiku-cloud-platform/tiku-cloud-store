import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import examRouter from './modules/exam'
import settingRouter from './modules/system-config'
import userRouter from './modules/user'
import articleRouter from './modules/article'
import fileRouter from './modules/file'
import messageRouter from './modules/message'
import marketingRouter from './modules/marketing'
import bookRouter from './modules/book'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: false,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '总览', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/store',
    component: Layout,
    redirect: '/store',
    hidden: true,
    children: [{
      path: 'personalCenter',
      name: '个人中心',
      component: () => import('@/views/store/info.vue'),
      meta: { title: '个人中心', icon: 'dashboard' }
    }]
  },
  userRouter,
  examRouter,
  articleRouter,
  bookRouter,
  fileRouter,
  messageRouter,
  marketingRouter,
  settingRouter,
  {
    path: '/setting/uploadPicture',
    component: () => import('@/components/uploadPicture/index.vue'),
    name: 'uploadPicture'
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router

