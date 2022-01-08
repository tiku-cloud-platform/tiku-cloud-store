import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'store/user/list',
    method: 'get',
    params
  })
}

export function getShow(params) {
  return request({
    url: 'store/user/show',
    method: 'get',
    params
  })
}

export function wechat_subscribe(params) {
  return request({
    url: 'store/subscribe/wechat/list',
    method: 'get',
    params
  })
}

export function exam(params) {
  return request({
    url: 'store/exam/submit/list',
    method: 'get',
    params
  })
}
