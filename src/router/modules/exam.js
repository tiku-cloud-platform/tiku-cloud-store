import Layout from '@/layout'
const examRouter = {
  path: '/exam',
  component: Layout,
  name: '试题管理',
  meta: { title: '试题管理', icon: 'el-icon-edit-outline' },
  alwaysShow: true,
  children: [
    {
      path: 'category/list',
      name: '分类',
      meta: { title: '分类', icon: 'el-icon-xianshicaidan' },
      component: () => import('@/views/exam/category/list')
    },
    {
      path: 'category/save/:uuid?',
      name: '分类',
      hidden: true,
      meta: { title: '分类', icon: 'el-icon-xianshicaidan' },
      component: () => import('@/views/exam/category/save')
    },
    {
      path: 'knowledge/list',
      name: '考点',
      component: () => import('@/views/exam/knowledge/list'),
      meta: { title: '考点', icon: 'el-icon-tags' }
    },
    {
      path: 'knowledge/save/:uuid?',
      name: '考点',
      hidden: true,
      meta: { title: '考点', icon: 'el-icon-tags' },
      component: () => import('@/views/exam/knowledge/save')
    },
    {
      path: 'collection/list',
      name: '试卷',
      component: () => import('@/views/exam/collection/list'),
      meta: { title: '试卷', icon: 'el-icon-guanwangshijuan' }
    },
    {
      path: 'collection/save/:uuid?',
      name: '试卷',
      hidden: true,
      meta: { title: '试卷', icon: 'el-icon-guanwangshijuan' },
      component: () => import('@/views/exam/collection/save')
    },
    {
      path: 'library',
      name: '题库',
      meta: { title: '题库', icon: 'el-icon-xianshicaidan' },
      component: () => import('@/views/exam/library/index'),
      children: [
        {
          path: 'option/list',
          name: '选择题',
          component: () => import('@/views/exam/library/option/list'),
          meta: { title: '选择题', icon: 'el-icon-shijuanbianhao' }
        },
        {
          path: 'option/save/:uuid?',
          name: '选择题',
          hidden: true,
          meta: { title: '选择题', icon: 'el-icon-shijuanbianhao' },
          component: () => import('@/views/exam/library/option/save')
        },
        {
          path: 'reading/list',
          name: '问答题',
          component: () => import('@/views/exam/library/reading/list'),
          meta: { title: '问答题', icon: 'el-icon-wenda' }
        },
        {
          path: 'reading/save/:uuid?',
          name: '问答题',
          hidden: true,
          meta: { title: '问答题', icon: 'el-icon-xuqiuwenda' },
          component: () => import('@/views/exam/library/reading/save')
        }
        // {
        //   path: 'reading/list',
        //   name: '判断题',
        //   component: () => import('@/views/exam/library/reading/list'),
        //   meta: { title: '判断题', icon: 'el-icon-wenda' }
        // }
        // {
        //   path: 'reading/save/:uuid?',
        //   name: '判断题',
        //   hidden: true,
        //   meta: { title: '判断题', icon: 'el-icon-xuqiuwenda' },
        //   component: () => import('@/views/exam/library/reading/save')
        // },
        // {
        //   path: 'reading/list',
        //   name: '填空题',
        //   component: () => import('@/views/exam/library/reading/list'),
        //   meta: { title: '填空题', icon: 'el-icon-wenda' }
        // },
        // {
        //   path: 'reading/save/:uuid?',
        //   name: '填空题',
        //   hidden: true,
        //   meta: { title: '填空题', icon: 'el-icon-xuqiuwenda' },
        //   component: () => import('@/views/exam/library/reading/save')
        // }
      ]
    }
  ]
}

export default examRouter
// {
//   path: '/exam',
//   component: Layout,
//   name: '试题管理',
//   meta: { title: '试题管理', icon: 'el-icon-s-help' },
//   children: [
//     {
//       path: 'config/constant/list',
//       name: '试题分类',
//       component: () => import('@/views/config/constant/list'),
//       meta: { title: '试题分类', icon: 'table' }
//     },
//     {
//       path: 'config/file-upload-config',
//       name: '试题知识点',
//       component: () => import('@/views/config/file-upload-config'),
//       meta: { title: '试题知识点', icon: 'table' }
//     },
//     {
//       path: 'config/file-upload-config',
//       name: '试管管理',
//       component: () => import('@/views/config/file-upload-config'),
//       meta: { title: '试管管理', icon: 'table' }
//     },
//     {
//       path: 'config/file-upload-config',
//       name: '选择试题',
//       component: () => import('@/views/config/file-upload-config'),
//       meta: { title: '选择试题', icon: 'table' }
//     },
//     {
//       path: 'config/file-upload-config',
//       name: '问答试题',
//       component: () => import('@/views/config/file-upload-config'),
//       meta: { title: '问答试题', icon: 'table' }
//     },
//     {
//       path: 'config/file-upload-config',
//       name: '答题历史',
//       component: () => import('@/views/config/file-upload-config'),
//       meta: { title: '答题历史', icon: 'table' }
//     }
//   ]
// },
