1. [表单数据重置不生效](https://juejin.cn/post/6844904031312150535)

2. 菜单示例:
```javascript
{
    path: '/score',
    component: Layout,
    name: '积分管理',
    meta: { title: '积分管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'conf/list',
        name: '积分配置',
        component: () => import('@/views/score/score-conf'),
        meta: { title: '积分配置', icon: 'table' }
      },
      {
        path: 'history/list',
        name: '积分历史',
        component: () => import('@/views/score/history'),
        meta: { title: '积分历史', icon: 'tree' }
      },
      {
        path: 'conf/save/:uuid?',
        name: '添加积分',
        hidden: true,
        component: () => import('@/views/score/save-score-conf'),
        meta: { title: '添加积分', icon: 'tree' }
      }
    ]
},
{
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
```