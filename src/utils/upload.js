// import OSS from 'ali-oss'

const randomName = Array(32)
  .fill(null)
  .map(() => Math.round(Math.random() * 16).toString(16))
  .join('')

const uploadFileCloud = {
  methods: {
    async uploadFile(opt, upConf) {
      // 获取文件后缀
      const tmp = opt.file.name.split('.')
      const extname = tmp.pop()
      const path = this.$md5(opt.file.name + randomName) + `.${extname}`
      let fileInfo = {}
      try {
        if (upConf.driver === 'ali_cloud') {
          // const client = new OSS({
          //   region: 'oss-cn-beijing',
          //   accessKeyId: 'LTAI5tRhtj7HSVG1bQJEic8c',
          //   accessKeySecret: 'oHjF6vNZYx04cC5ODJZxNONiSYs4TP',
          //   bucket: 'minip-oss'
          // })
          // const res = await client.multipartUpload(path, opt.file, {
          //   progress: async function(p) {
          //     const e = {}
          //     e.percent = p * 100
          //     // 上传进度条，el-upload 组件自带的方法
          //     opt.onProgress(e)
          //   }
          // })
          // // 去除 oss 分片上传后返回所带的查询参数，否则访问会 403
          // const ossPath = res.res.requestUrls[0].split('?')[0]
          // url = ossPath.replace('http://', 'https://')
        } else if (upConf.driver === 'qiniu_cloud') {
          const formData = new FormData()
          formData.append('file', opt.file)
          formData.append('token', upConf.token)
          formData.append('key', path)
          const res = await this.$http.post(upConf.values.region, formData, {
            // onUploadProgress: async function(e) {
            //   e.percent = e.loaded / e.total * 100
            //   opt.onProgress(e)
            // }
          })
          // url = upConf.values.domain + '/' + res.data.key
          fileInfo = [{
            file_name: res.data.key,
            file_size: opt.file.size,
            file_type: opt.file.type,
            extension: extname,
            hash_name: res.data.hash
          }]
        } else if (upConf.driver === 'tencent_cloud') {
          console.log('tencent')
        }
      } catch (error) {
        this.$message.error(`${error}`)
      }
      return JSON.stringify(fileInfo)
    }
  }
}

export default uploadFileCloud

