import Layout from '@/layout'
const messageRouter = {
  path: '/message',
  component: Layout,
  name: '消息管理',
  meta: { title: '消息管理', icon: 'el-icon-message' },
  children: [
    {
      path: 'sys',
      name: '系统消息',
      component: () => import('@/views/message/index'),
      meta: { title: '系统消息', icon: 'el-icon-s-help' },
      children: [
        {
          path: 'category/list',
          name: '消息分类',
          component: () => import('@/views/message/category/list'),
          meta: { title: '消息分类', icon: 'table' }
        },
        {
          path: 'category/save/:uuid?',
          name: '添加分类',
          hidden: true,
          component: () => import('@/views/message/category/save'),
          meta: { title: '添加分类', icon: 'table' }
        },
        {
          path: 'list',
          name: '消息列表',
          component: () => import('@/views/message/msg/list'),
          meta: { title: '消息列表', icon: 'table' }
        },
        {
          path: 'save/:uuid?',
          name: '添加消息',
          hidden: true,
          component: () => import('@/views/message/msg/save'),
          meta: { title: '添加消息', icon: 'table' }
        }
      ]
    },
    {
      path: 'subscribe',
      name: '订阅消息',
      component: () => import('@/views/message/index'),
      meta: { title: '订阅消息', icon: 'el-icon-s-help' },
      children: [
        {
          path: 'wechat',
          name: '微信订阅',
          component: () => import('@/views/message/index'),
          meta: { title: '系统消息', icon: 'el-icon-s-help' },
          children: [
            {
              path: 'list',
              name: '配置列表',
              component: () => import('@/views/message/template/list'),
              meta: { title: '微信订阅', icon: 'table' }
            },
            {
              path: 'save/:uuid?',
              name: '添加配置',
              hidden: true,
              component: () => import('@/views/message/template/save'),
              meta: { title: '添加配置', icon: 'table' }
            }
          ]
        }
      ]
    }
  ]
}

export default messageRouter
