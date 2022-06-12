import Layout from '@/layout'
const articleRouter = {
  path: '/cms',
  component: Layout,
  name: '内容管理',
  meta: { title: '内容管理', icon: 'el-icon-document' },
  children: [
    {
      path: 'article',
      name: '文章管理',
      component: () => import('@/views/cms/article/index'),
      meta: { title: '文章管理', icon: 'el-icon-document' },
      children: [
        {
          path: 'category/list',
          name: '文章分类',
          component: () => import('@/views/cms/article/article-category-list'),
          meta: { title: '文章分类', icon: 'el-icon-xianshicaidan' }
        },
        {
          path: 'category/save/:uuid?',
          name: '添加分类',
          hidden: true,
          component: () => import('@/views/cms/article/article-category-save'),
          meta: { title: '添加分类', icon: 'el-icon-xianshicaidan' }
        },
        {
          path: 'list',
          name: '文章列表',
          component: () => import('@/views/cms/article/article-list'),
          meta: { title: '文章列表', icon: 'el-icon-liebiao' }
        },
        {
          path: 'save/:uuid?',
          name: '添加文章',
          hidden: true,
          component: () => import('@/views/cms/article/article-save'),
          meta: { title: '添加文章', icon: 'el-icon-liebiao' }
        }
      ]
    },
    {
      path: 'book',
      name: '书籍管理',
      component: () => import('@/views/cms/book/index'),
      meta: { title: '文档管理', icon: 'el-icon-document' },
      children: [
        {
          path: 'book/list',
          name: '书籍管理',
          component: () => import('@/views/cms/book/book/list'),
          meta: { title: '书籍管理', icon: 'el-icon-xianshicaidan' }
        },
        {
          path: 'book/save/:uuid?',
          name: '添加书籍',
          hidden: true,
          component: () => import('@/views/cms/book/book/save'),
          meta: { title: '添加书籍', icon: 'el-icon-xianshicaidan' }
        }
      ]
    },
    {
      path: 'config',
      name: '系统配置',
      component: () => import('@/views/cms/config/index'),
      meta: { title: '系统配置', icon: 'el-icon-s-help' },
      children: [
        {
          path: 'article/list',
          name: '单文管理',
          component: () => import('@/views/cms/config/list'),
          meta: { title: '单文管理', icon: 'el-icon-lanmupeizhi' }
        },
        {
          path: 'article/save/:id?',
          component: () => import('@/views/cms/config/save'),
          name: '编辑单文',
          meta: { title: '编辑单文', noCache: true, activeMenu: `/cms/config/save`, icon: 'el-icon-lanmupeizhi' },
          hidden: true
        }
      ]
    }
  ]
}

export default articleRouter

// import Layout from '@/layout'
// const articleRouter = {
//   path: '/article',
//   component: Layout,
//   name: '文章管理',
//   meta: { title: '文章管理', icon: 'el-icon-s-help' },
//   children: [
//     {
//       path: 'category',
//       name: '文章分类',
//       component: () => import('@/views/cms/article/category/index'),
//       meta: { title: '文章分类', icon: 'table' },
//       children: [
//         {
//           path: 'list',
//           name: '分类列表',
//           component: () => import('@/views/cms/article/category/list'),
//           meta: { title: '分类列表', icon: 'table' }
//         },
//         {
//           path: 'add/:uuid?',
//           name: '添加分类',
//           hidden: true,
//           component: () => import('@/views/cms/article/category/add'),
//           meta: { title: '添加分类', icon: 'table' }
//         },
//         {
//           path: 'del',
//           name: '删除分类',
//           hidden: true
//         }
//       ]
//     }
//   ]
// }
//
// export default articleRouter
