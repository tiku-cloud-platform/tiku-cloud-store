import request from '@/utils/request'

// 查询
export function list(params) {
  return request({
    url: 'store/page/list',
    method: 'get',
    params: params
  })
}

