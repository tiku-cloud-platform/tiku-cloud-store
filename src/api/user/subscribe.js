import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'store/subscribe/wechat/list',
    method: 'get',
    params
  })
}

export function configList(params) {
  return request({
    url: 'store/subscribe/config/list',
    method: 'get',
    params
  })
}
