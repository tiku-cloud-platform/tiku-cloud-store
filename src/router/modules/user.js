import Layout from '@/layout'
const userRouter = {
  path: '/user',
  component: Layout,
  name: '用户管理',
  meta: { title: '用户管理', icon: 'el-icon-user-solid' },
  children: [
    {
      path: 'user',
      name: '用户列表',
      component: () => import('@/views/user/user'),
      meta: { title: '用户列表', icon: 'el-icon-liebiao' }
    },
    {
      path: 'detail/:uuid',
      name: '用户详情',
      hidden: true,
      component: () => import('@/views/user/detail'),
      meta: { title: '用户详情', icon: 'el-icon-liebiao' }
    },
    {
      path: 'grade',
      name: '会员等级',
      component: () => import('@/views/user/grade/list'),
      meta: { title: '会员等级', icon: 'el-icon-liebiao' }
    }
  ]
}

export default userRouter
