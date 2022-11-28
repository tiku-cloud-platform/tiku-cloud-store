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
      meta: { title: '书籍管理', icon: 'el-icon-notebook-2' },
      children: [
        {
          path: 'book/list',
          name: '书籍管理',
          component: () => import('@/views/cms/book/book/list'),
          meta: { title: '书籍管理', icon: 'el-icon-notebook-2' }
        },
        {
          path: 'book/save/:uuid?',
          name: '添加书籍',
          hidden: true,
          component: () => import('@/views/cms/book/book/save'),
          meta: { title: '添加书籍', icon: 'el-icon-xianshicaidan' }
        },
        {
          path: 'category/list/:uuid',
          name: 'bookCategory',
          component: () => import('@/views/cms/book/category/list'),
          meta: { title: '书籍章节', icon: 'el-icon-notebook-2' },
          hidden: true
        },
        {
          path: 'category/save',
          name: 'bookContentSave',
          component: () => import('@/views/cms/book/category/save'),
          meta: { title: '书籍章节', icon: 'el-icon-notebook-2' },
          hidden: true
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
          name: '文章配置',
          component: () => import('@/views/cms/config/list'),
          meta: { title: '文章配置', icon: 'el-icon-lanmupeizhi' }
        },
        {
          path: 'article/save/:id?',
          component: () => import('@/views/cms/config/save'),
          name: '编辑配置',
          meta: { title: '编辑配置', noCache: true, activeMenu: `/cms/config/save`, icon: 'el-icon-lanmupeizhi' },
          hidden: true
        }
      ]
    },
    {
      path: 'banner/save/:uuid?',
      name: '轮播图管理',
      hidden: true,
      component: () => import('@/views/config/banner/save'),
      meta: { title: '轮播图管理', icon: 'el-icon-shuffling-banner' }
    },
    {
      path: 'menu/list',
      name: '菜单管理',
      component: () => import('@/views/config/menu/list'),
      meta: { title: '菜单管理', icon: 'el-icon-s-grid' }
    },
    {
      path: 'menu/save/:uuid?',
      name: '菜单管理',
      hidden: true,
      component: () => import('@/views/config/menu/save'),
      meta: { title: '菜单管理', icon: 'el-icon-s-grid' }
    },
    {
      path: 'config/constant/list',
      name: '常量配置',
      component: () => import('@/views/config/constant/list'),
      meta: { title: '常量配置', icon: 'el-icon-xitongpeizhi' }
    },
    {
      path: 'config/page',
      name: '系统页面',
      component: () => import('@/views/config/page/list'),
      meta: { title: '系统页面', icon: 'el-icon-page' }
    },
    {
      path: 'banner/list',
      name: '轮播图管理',
      component: () => import('@/views/config/banner/list'),
      meta: { title: '轮播图管理', icon: 'el-icon-shuffling-banner' }
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
