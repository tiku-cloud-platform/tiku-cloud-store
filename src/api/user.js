import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'store/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'store/user/login_out',
    method: 'delete'
  })
}

export function userInfo() {
  return request({
    url: 'store/user/user_info',
    method: 'get'
  })
}

export function updateInfo(params) {
  return request({
    url: 'store/user/update_info',
    method: 'put',
    params
  })
}
