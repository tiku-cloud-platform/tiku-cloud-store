import Layout from '@/layout'
const fileRouter = {
  path: '/file',
  component: Layout,
  name: '文件管理',
  meta: { title: '文件管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'config/file-upload-config',
      name: '上传配置',
      component: () => import('@/views/config/file-upload-config'),
      meta: { title: '上传配置', icon: 'table' }
    },
    {
      path: 'group-list',
      name: '文件分组',
      component: () => import('@/views/file/group-list'),
      meta: { title: '文件分组', icon: 'table' }
    },
    {
      path: 'list',
      name: '文件列表',
      component: () => import('@/views/file/list'),
      meta: { title: '文件列表', icon: 'table' }
    }
  ]
}

export default fileRouter
