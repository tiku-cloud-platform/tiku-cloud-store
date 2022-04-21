import Layout from '@/layout'
const marketingRouter = {
  path: '/marketing',
  component: Layout,
  name: '运营管理',
  meta: { title: '运营管理', icon: 'el-icon-monitor' },
  children: [
    {
      path: 'marketing',
      name: '统计渠道',
      component: () => import('@/views/marketing/statistics/index'),
      meta: { title: '统计渠道', icon: 'el-icon-lishijiankong' },
      children: [
        {
          path: 'group/list',
          name: '渠道分组',
          component: () => import('@/views/marketing/statistics/group/list'),
          meta: { title: '渠道分组', icon: 'el-icon-xianshicaidan' }
        },
        {
          path: 'group/save/:uuid?',
          name: '添加渠道',
          hidden: true,
          component: () => import('@/views/marketing/statistics/group/save'),
          meta: { title: '添加渠道', icon: 'el-icon-xianshicaidan' }
        },
        {
          path: 'list',
          name: '渠道列表',
          component: () => import('@/views/marketing/statistics/channel/list'),
          meta: { title: '渠道列表', icon: 'el-icon-liebiao' }
        },
        {
          path: 'save/:uuid?',
          name: '添加渠道',
          hidden: true,
          component: () => import('@/views/marketing/statistics/channel/save'),
          meta: { title: '添加渠道', icon: 'el-icon-liebiao' }
        }
      ]
    },
    {
      path: 'score',
      name: '积分管理',
      component: () => import('@/views/marketing/score/index'),
      meta: { title: '积分管理', icon: 'el-icon-jifen' },
      children: [
        {
          path: 'conf/list',
          name: '积分配置',
          component: () => import('@/views/marketing/score/score-conf'),
          meta: { title: '积分配置', icon: 'el-icon-xitongpeizhi' }
        },
        {
          path: 'history/list',
          name: '积分历史',
          component: () => import('@/views/marketing/score/history'),
          meta: { title: '积分历史', icon: 'el-icon-liebiao' }
        },
        {
          path: 'conf/save/:uuid?',
          name: '添加积分',
          hidden: true,
          component: () => import('@/views/marketing/score/save-score-conf'),
          meta: { title: '添加积分', icon: 'el-icon-liebiao' }
        }
      ]
    }
  ]
}

export default marketingRouter
