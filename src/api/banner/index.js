import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/config/banner/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/config/banner/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/config/banner/update',
    method: 'put',
    params
  })
}

export function del(params) {
  return request({
    url: '/store/config/banner/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}
