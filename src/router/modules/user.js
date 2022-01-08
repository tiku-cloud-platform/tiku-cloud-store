import Layout from '@/layout'
const userRouter = {
  path: '/user',
  component: Layout,
  name: '用户管理',
  meta: { title: '用户管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'wechat_user',
      name: '微信用户',
      component: () => import('@/views/user/wechat'),
      meta: { title: '微信用户', icon: 'table' }
    },
    {
      path: 'group',
      name: '用户分组',
      component: () => import('@/views/user/group/list'),
      meta: { title: '用户分组', icon: 'table' }
    },
    {
      path: 'group/save/:uuid?',
      name: '添加用户分组',
      hidden: true,
      component: () => import('@/views/user/group/save'),
      meta: { title: '添加用户分组', icon: 'table' }
    }
  ]
}

export default userRouter
