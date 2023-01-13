import Layout from '@/layout'
const userRouter = {
  path: '/user',
  component: Layout,
  name: '用户管理',
  meta: { title: '用户管理', icon: 'el-icon-user-solid' },
  children: [
    {
      path: 'wechat_user',
      name: '用户列表',
      component: () => import('@/views/user/wechat'),
      meta: { title: '用户列表', icon: 'el-icon-liebiao' }
    },
    {
      path: 'group',
      name: '会员等级',
      component: () => import('@/views/user/group/list'),
      meta: { title: '会员等级', icon: 'el-icon-liebiao' }
    },
    {
      path: 'group/save/:uuid?',
      name: '添加会员等级',
      hidden: true,
      component: () => import('@/views/user/group/save'),
      meta: { title: '添加会员等级', icon: 'el-icon-liebiao' }
    }
  ]
}

export default userRouter
