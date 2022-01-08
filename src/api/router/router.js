import request from '@/utils/request'

// 查询
export function list(params) {
  return request({
    url: 'store/router/list',
    method: 'get',
    params: { type: params }
  })
}

