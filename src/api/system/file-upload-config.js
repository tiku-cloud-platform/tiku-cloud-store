import request from '@/utils/request'

// 添加
export function add(params) {
  return request({
    url: 'store/config/setting/create',
    method: 'post',
    data: params
  })
}

// 查询
export function list(params) {
  return request({
    url: 'store/config/setting/list',
    method: 'get',
    params: { type: params }
  })
}

// 更新
export function edit(params) {
  return request({
    url: 'store/config/setting/update',
    method: 'put',
    params
  })
}

