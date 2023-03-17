import Layout from '@/layout'
const bookRouter = {
  path: '/book',
  component: Layout,
  name: '知识付费',
  meta: { title: '知识付费', icon: 'el-icon-reading' },
  children: [
    {
      path: 'book',
      name: '在线教程',
      component: () => import('@/views/book/index'),
      meta: { title: '在线教程', icon: 'el-icon-reading' },
      children: [
        {
          path: 'list',
          name: '在线教程',
          component: () => import('@/views/book/book/list'),
          meta: { title: '在线教程', icon: 'el-icon-reading' }
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
          path: 'evaluate/list/:uuid',
          name: 'EvaluateList',
          component: () => import('@/views/book/evaluate/list'),
          meta: { title: '教程点评', icon: 'el-icon-reading' },
          hidden: true
        },
        {
          path: 'category/save',
          name: 'bookContentSave',
          component: () => import('@/views/book/category/save'),
          meta: { title: '教程章节', icon: 'el-icon-reading' },
          hidden: true
        },
        {
          path: 'cate/list',
          name: 'bookCate',
          component: () => import('@/views/book/cate/list'),
          meta: { title: '教程类目', icon: 'el-icon-reading' },
          hidden: true
        }
      ]
    }
  ]
}

export default bookRouter

