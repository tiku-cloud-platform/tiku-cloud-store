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
        },
        {
          path: 'keywords',
          name: '推荐搜索',
          component: () => import('@/views/cms/article/keywords/index'),
          meta: { title: '推荐搜索', icon: 'el-icon-guanwangshijuan' },
          children: [
            {
              path: 'list',
              name: '推荐搜索',
              component: () => import('@/views/cms/article/keywords/list'),
              meta: { title: '推荐搜索', icon: 'el-icon-guanwangshijuan' }
            }
          ]
        }
      ]
    },
    {
      path: 'config',
      name: '单文配置',
      component: () => import('@/views/cms/config/index'),
      meta: { title: '单文配置', icon: 'el-icon-s-help' },
      children: [
        {
          path: 'article/list',
          name: '单文配置',
          component: () => import('@/views/cms/config/list'),
          meta: { title: '单文配置', icon: 'el-icon-lanmupeizhi' }
        },
        {
          path: 'article/save/:id?',
          component: () => import('@/views/cms/config/save'),
          name: '单文配置',
          meta: { title: '单文配置', noCache: true, activeMenu: `/cms/config/save`, icon: 'el-icon-lanmupeizhi' },
          hidden: true
        }
      ]
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
      path: 'page',
      name: '页面配置',
      component: () => import('@/views/config/page/list'),
      meta: { title: '页面配置', icon: 'el-icon-document' },
      children: [
        {
          path: 'config',
          name: '页面配置',
          component: () => import('@/views/config/page/list'),
          meta: { title: '页面配置', icon: 'el-icon-document' }
        }
      ]
    },
    {
      path: 'banner/list',
      name: '轮播图管理',
      component: () => import('@/views/config/banner/list'),
      meta: { title: '轮播图管理', icon: 'el-icon-shuffling-banner' }
    },
    {
      path: 'banner/save/:uuid?',
      name: '轮播图管理',
      hidden: true,
      component: () => import('@/views/config/banner/save'),
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
