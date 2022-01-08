import request from '@/utils/request'

export function history(params) {
  return request({
    url: 'store/score/history/list',
    method: 'get',
    params
  })
}

export function list(params) {
  return request({
    url: 'store/score/list',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/score/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/score/update',
    method: 'put',
    params
  })
}

export function del(params) {
  return request({
    url: '/store/score/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}
