import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/article/list',
    method: 'get',
    params
  })
}

export function show(params) {
  return request({
    url: 'store/article/show',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/store/article/create',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/store/article/update',
    method: 'post',
    data: params
  })
}

export function del(params) {
  return request({
    url: '/store/article/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

export function publish(params) {
  return request({
    url: '/store/article/publish',
    method: 'post',
    data: {
      uuid: params
    }
  })
}
