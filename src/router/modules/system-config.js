import Layout from '@/layout'
const miniProgramRouter = {
  path: '/wx_app',
  component: Layout,
  name: '系统配置',
  meta: { title: '系统配置', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'mini/conf',
      name: '平台配置',
      component: () => import('@/views/config/mini/conf'),
      meta: { title: '平台配置', icon: 'table' }
    },
    {
      path: 'banner/list',
      name: '轮播图管理',
      component: () => import('@/views/config/banner/list'),
      meta: { title: '轮播图管理', icon: 'table' }
    },
    {
      path: 'banner/save/:uuid?',
      name: '轮播图管理',
      hidden: true,
      component: () => import('@/views/config/banner/save'),
      meta: { title: '轮播图管理', icon: 'table' }
    },
    {
      path: 'menu/list',
      name: '菜单管理',
      component: () => import('@/views/config/menu/list'),
      meta: { title: '菜单管理', icon: 'table' }
    },
    {
      path: 'menu/save/:uuid?',
      name: '菜单管理',
      hidden: true,
      component: () => import('@/views/config/menu/save'),
      meta: { title: '菜单管理', icon: 'table' }
    },
    {
      path: 'config/constant/list',
      name: '常量配置',
      component: () => import('@/views/config/constant/list'),
      meta: { title: '常量配置', icon: 'table' }
    },
    {
      path: 'config/page',
      name: '系统页面',
      component: () => import('@/views/config/page/list'),
      meta: { title: '系统页面', icon: 'table' }
    }
  ]
}

export default miniProgramRouter
