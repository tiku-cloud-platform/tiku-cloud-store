import request from '@/utils/request'

export function uploadToken() {
  return request({
    url: 'store/file/cloud_storage/token',
    method: 'post'
  })
}
