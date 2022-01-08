import request from '@/utils/request'

// 获取常量列表
export function list(params) {
  return request({
    url: 'store/config/constant/list',
    method: 'get',
    params
  })
}

// 删除
export function del(params) {
  return request({
    url: 'store/config/constant/delete',
    method: 'delete',
    data: {
      uuid: params
    }
  })
}

// 添加
export function add(params) {
  return request({
    url: 'store/config/constant/create',
    method: 'post',
    data: params
  })
}

// 修改
export function edit(params) {
  return request({
    url: 'store/config/constant/update',
    method: 'put',
    data: params
  })
}
