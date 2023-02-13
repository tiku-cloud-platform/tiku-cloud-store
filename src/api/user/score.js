import request from '@/utils/request'

// 历史积分
export function getList(params) {
  return request({
    url: '/user/score/list',
    method: 'get',
    params
  })
}

