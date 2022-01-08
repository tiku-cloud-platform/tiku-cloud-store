import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/message/content/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/message/content/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/message/content/update',
    method: 'put',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/message/content/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}
