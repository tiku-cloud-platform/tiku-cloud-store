import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/store/file/group/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/file/group/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/file/group/update',
    method: 'put',
    params
  })
}

export function del(params) {
  return request({
    url: '/store/file/group/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}
