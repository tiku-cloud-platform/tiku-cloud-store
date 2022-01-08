const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    'id|+1': 1,
    'uuid': 'cc2d482b-067a-1b8b-8bc7-121d9f880bbd',
    'title': '图片配置',
    'store_uuid': 'cc2d482b-067a-1b8b-8bc7-121d9f880bbd',
    'is_show': '1',
    'values': {
      'app_key': '123123asdf',
      'app_secret': '123sfd33'
    },
    'created_at': '2021-06-22 14:07:13',
    'updated_at': '2021-06-22 14:07:13'
  }]
})

module.exports = [
  {
    url: '/platform/file_group/index',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 1000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
