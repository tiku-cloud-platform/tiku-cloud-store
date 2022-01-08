import Layout from '@/layout'
// 系统配置
const systemConfig = {
  path: '/system',
  component: Layout,
  name: '系统配置',
  meta: { title: '系统配置', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'config/constant/list',
      name: '常量配置',
      component: () => import('@/views/config/constant/list'),
      meta: { title: '常量配置', icon: 'table' }
    },
    {
      path: 'config/page',
      name: '用户页面',
      component: () => import('@/views/config/page/list'),
      meta: { title: '用户页面', icon: 'table' }
    }
  ]
}

export default systemConfig
