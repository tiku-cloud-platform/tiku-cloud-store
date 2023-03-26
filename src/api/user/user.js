import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function getAllInfo(params) {
  return request({
    url: '/user/all/info',
    method: 'get',
    params
  })
}

