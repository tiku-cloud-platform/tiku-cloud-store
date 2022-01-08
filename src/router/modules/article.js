import Layout from '@/layout'
const articleRouter = {
  path: '/article',
  component: Layout,
  name: '内容管理',
  meta: { title: '内容管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'category/list',
      name: '文章分类',
      component: () => import('@/views/cms/article/article-category-list'),
      meta: { title: '文章分类', icon: 'table' }
    },
    {
      path: 'category/save/:uuid?',
      name: '添加分类',
      hidden: true,
      component: () => import('@/views/cms/article/article-category-save'),
      meta: { title: '添加分类', icon: 'table' }
    },
    {
      path: 'list',
      name: '文章列表',
      component: () => import('@/views/cms/article/article-list'),
      meta: { title: '文章列表', icon: 'table' }
    },
    {
      path: 'save/:uuid?',
      name: '添加文章',
      hidden: true,
      component: () => import('@/views/cms/article/article-save'),
      meta: { title: '添加文章', icon: 'table' }
    },
    {
      path: 'cms/about-me',
      name: '关于我们',
      component: () => import('@/views/cms/about-me/index'),
      meta: { title: '关于我们', icon: 'table' }
    },
    {
      path: 'cms/about-me/save/:id?',
      component: () => import('@/views/cms/about-me/save'),
      name: 'EditArticle',
      meta: { title: '文章添加', noCache: true, activeMenu: `/cms/about-me/save` },
      hidden: true
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
