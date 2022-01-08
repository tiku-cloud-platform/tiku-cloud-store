const Mock = require('mockjs')
var Random = Mock.Random

const data = Mock.mock({
  'items|30': [{
    'id|+1': 1,
    avatar_url: 'https://thirdwx.qlogo.cn/mmhead/6esUwuDZcnic0MfZcGnic6swLgkSJNyqj4YH5r0SWS79c/132',
    'nickname': Random.cname(),
    'mobile': '18048445226',
    'gender': 0,
    'city': '成都',
    'province': '四川',
    'openid': 'o0nX25ApLmfoJLh_8g-iMv4ifLyA',
    'country': '中国',
    'district': '船山区',
    'address': '上海市上海市宝山区Meian Rd美安路',
    'is_show': '1',
    'uuid': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz',
    'created_at': '2021-06-22'
  }]
})

module.exports = [
  {
    url: '/admin/wechat/list',
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
