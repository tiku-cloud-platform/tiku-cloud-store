import Layout from '@/layout'
const scoreRouter = {
  path: '/score',
  component: Layout,
  name: '积分管理',
  meta: { title: '积分管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'conf/list',
      name: '积分配置',
      component: () => import('@/views/score/score-conf'),
      meta: { title: '积分配置', icon: 'table' }
    },
    {
      path: 'history/list',
      name: '积分历史',
      component: () => import('@/views/score/history'),
      meta: { title: '积分历史', icon: 'tree' }
    },
    {
      path: 'conf/save/:uuid?',
      name: '添加积分',
      hidden: true,
      component: () => import('@/views/score/save-score-conf'),
      meta: { title: '添加积分', icon: 'tree' }
    }
  ]
}

export default scoreRouter
