import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/store/file/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/file/create',
    method: 'post',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/file/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}
