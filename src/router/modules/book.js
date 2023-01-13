import Layout from '@/layout'
const bookRouter = {
  path: '/book',
  component: Layout,
  name: '教程管理',
  meta: { title: '教程管理', icon: 'el-icon-reading' },
  children: [
    {
      path: 'book',
      name: '书籍管理',
      component: () => import('@/views/book/index'),
      meta: { title: '书籍管理', icon: 'el-icon-reading' },
      children: [
        {
          path: 'list',
          name: '教程管理',
          component: () => import('@/views/book/book/list'),
          meta: { title: '教程管理', icon: 'el-icon-reading' }
        },
        {
          path: 'save/:uuid?',
          name: '添加教程',
          hidden: true,
          component: () => import('@/views/book/book/save'),
          meta: { title: '添加教程', icon: 'el-icon-xianshicaidan' }
        },
        {
          path: 'category/list/:uuid',
          name: 'bookCategory',
          component: () => import('@/views/book/category/list'),
          meta: { title: '教程章节', icon: 'el-icon-reading' },
          hidden: true
        },
        {
          path: 'category/save',
          name: 'bookContentSave',
          component: () => import('@/views/book/category/save'),
          meta: { title: '教程章节', icon: 'el-icon-reading' },
          hidden: true
        }
      ]
    }
  ]
}

export default bookRouter

