import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/config/menu/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/config/menu/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/config/menu/update',
    method: 'put',
    params
  })
}

export function del(params) {
  return request({
    url: '/store/config/menu/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}
