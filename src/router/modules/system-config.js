import Layout from '@/layout'
const miniProgramRouter = {
  path: '/wx_app',
  component: Layout,
  name: '系统配置',
  meta: { title: '系统配置', icon: 'el-icon-s-tools' },
  children: [
    {
      path: 'mini',
      name: '平台配置',
      component: () => import('@/views/config/mini/conf'),
      meta: { title: '平台配置', icon: 'el-icon-xitongpeizhi' },
      children: [
        {
          path: 'mini/config',
          name: '微信配置',
          component: () => import('@/views/config/mini/conf'),
          meta: { title: '微信配置', icon: 'el-icon-xitongpeizhi' }
        }
      ]
    }
  ]
}

export default miniProgramRouter
