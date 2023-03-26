import Layout from '@/layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  name: '系统配置',
  meta: { title: '系统配置', icon: 'el-icon-s-tools' },
  children: [
    {
      path: 'wechat',
      name: '平台配置',
      component: () => import('@/views/config/mini/conf'),
      meta: { title: '平台配置', icon: 'el-icon-xitongpeizhi' },
      children: [
        {
          path: 'config',
          name: '微信配置',
          component: () => import('@/views/config/mini/conf'),
          meta: { title: '微信配置', icon: 'el-icon-xitongpeizhi' }
        }
      ]
    },
    {
      path: 'dict',
      name: '字典配置',
      component: () => import('@/views/config/dictionary/group/index'),
      meta: { title: '字典分组', icon: 'el-icon-guanwangshijuan' },
      children: [
        {
          path: 'group/list',
          name: '字典分组',
          component: () => import('@/views/config/dictionary/group/list'),
          meta: { title: '字典分组', icon: 'el-icon-guanwangshijuan' }
        },
        {
          path: 'dict/list/:uuid',
          name: '字典明细',
          hidden: true,
          component: () => import('@/views/config/dictionary/dict/list'),
          meta: { title: '字典明细', icon: 'el-icon-guanwangshijuan' }
        }
      ]
    }
  ]
}

export default settingRouter
