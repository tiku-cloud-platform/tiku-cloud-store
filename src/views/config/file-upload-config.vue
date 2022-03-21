<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form
        ref="dataForm"
        :model="temp"
        label-width="200px"
        label-position="left"
        style="width: 50%"
      >
        <div>
          <el-divider content-position="left">七牛云存储</el-divider>
          <el-form-item label="ACCESS_KEY AK" prop="qiNiuCloudAk">
            <el-input
              v-model="temp.values.qiniu_cloud.app_key"
              clearable
              placeholder="请填写ACCESS_KEY AK"
            />
          </el-form-item>
          <el-form-item label="SECRET_KEY SK" prop="qiNiuCloudSk">
            <el-input
              v-model="temp.values.qiniu_cloud.app_secret"
              clearable
              placeholder="请填写SECRET_KEY SK"
            />
          </el-form-item>
          <el-form-item label="存储空间名称 Bucket" prop="qiNiuCloudBK">
            <el-input
              v-model="temp.values.qiniu_cloud.bucket"
              clearable
              placeholder="请填写存储空间名称 Bucket"
            />
          </el-form-item>
          <el-form-item label="空间域名 Domain" prop="qiNiuCloudDM">
            <el-input
              v-model="temp.values.qiniu_cloud.domain"
              clearable
              placeholder="请填写空间域名 Domain"
            />
            <div class="desc">
              请补全http:// 或 https://，例如http://static.cloud.com
            </div>
          </el-form-item>
          <el-form-item label="所属区域 Region" prop="region">
            <el-input
              v-model="temp.values.qiniu_cloud.region"
              clearable
              placeholder="请填写所属区域 Region"
            />
            <div class="desc">
              <a
                href="https://developer.qiniu.com/kodo/1671/region-endpoint-fq"
                target="_blank"
              >请参考https://developer.qiniu.com/kodo/1671/region-endpoint-fq</a>
            </div>
          </el-form-item>
        </div>
        <div class="divider">
          <el-divider content-position="left">阿里云存储</el-divider>
          <el-form-item label="AccessKeyId" prop="aliCloudAK">
            <el-input
              v-model="temp.values.ali_cloud.app_key"
              clearable
              placeholder="请填写AccessKeyId"
            />
          </el-form-item>
          <el-form-item label="AccessKeySecret" prop="aliCloudSK">
            <el-input
              v-model="temp.values.ali_cloud.app_secret"
              clearable
              placeholder="请填写AccessKeySecret"
            />
          </el-form-item>
          <el-form-item label="存储空间名称 Bucket" prop="aliCloudBK">
            <el-input
              v-model="temp.values.ali_cloud.bucket"
              clearable
              placeholder="请填写存储空间名称 Bucket"
            />
          </el-form-item>
          <el-form-item label="空间域名 Domain" prop="aliCloudDM">
            <el-input
              v-model="temp.values.ali_cloud.domain"
              clearable
              placeholder="请填写空间域名 Domain"
            />
            <div class="desc">
              请补全http:// 或 https://，例如http://static.cloud.com
            </div>
          </el-form-item>
        </div>
        <div class="divider">
          <el-divider content-position="left">腾讯云存储</el-divider>
          <el-form-item label="AccessKeyId" prop="tencentCloudAK">
            <el-input
              v-model="temp.values.tencent_cloud.app_key"
              clearable
              placeholder="请填写AccessKeyId"
            />
          </el-form-item>
          <el-form-item label="AccessKeySecret" prop="tencentCloudSK">
            <el-input
              v-model="temp.values.tencent_cloud.app_secret"
              clearable
              placeholder="请填写AccessKeySecret"
            />
          </el-form-item>
          <el-form-item label="所属区域 Region" prop="tencentCloudRG">
            <el-input
              v-model="temp.values.tencent_cloud.rg"
              clearable
              placeholder="请填写所属区域 Region"
            />
            <div class="desc">
              请填写地域简称，例如：ap-beijing、ap-hongkong、eu-frankfurt
            </div>
          </el-form-item>
          <el-form-item label="存储空间名称 Bucket" prop="tencentCloudBK">
            <el-input
              v-model="temp.values.tencent_cloud.bucket"
              clearable
              placeholder="请填写存储空间名称 Bucket"
            />
          </el-form-item>
          <el-form-item label="空间域名 Domain" prop="tencentCloudDM">
            <el-input
              v-model="temp.values.tencent_cloud.domain"
              clearable
              placeholder="请填写空间域名 Domain"
            />
            <div class="desc">
              请补全http:// 或 https://，例如http://static.cloud.com
            </div>
          </el-form-item>
        </div>
        <div class="divider">
          <el-divider content-position="left">默认上传方式</el-divider>
          <el-form-item label="默认方式" label-width="100">
            <el-radio
              v-for="up in defaultUpload"
              :key="up.values"
              v-model="temp.values.default"
              :label="up.value"
            >{{ up.name }}</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button
              v-prevent-re-click
              type="primary"
              @click="onSubmit"
            >提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { list, add, edit } from '@/api/system/file-upload-config'
export default {
  name: 'FileUploadConfig',
  data() {
    return {
      defaultUpload: [
        // { 'name': '本地', 'value': 'local' },
        { name: '七牛云', value: 'qiniu_cloud' },
        { name: '阿里云', value: 'ali_cloud' },
        { name: '腾讯云', value: 'tencent_cloud' }
      ],
      temp: {
        uuid: null,
        title: '文件上传',
        type: 'file_upload',
        values: {
          default: null,
          qiniu_cloud: {
            app_key: '',
            app_secret: '',
            bucket: '',
            domain: '',
            region: ''
          },
          ali_cloud: {
            app_key: '',
            app_secret: '',
            bucket: '',
            domain: ''
          },
          tencent_cloud: {
            app_key: '',
            app_secret: '',
            bucket: '',
            domain: '',
            rg: ''
          }
        }
      },
      validaFields: []
      /* rules: {
        qiNiuCloudAk: [{ required: true, message: '请填写七牛云ACCESS_KEY AK', trigger: 'blur' }],
        qiNiuCloudSk: [{ required: true, message: '请填写七牛云SECRET_KEY SK', trigger: 'blur' }],
        qiNiuCloudBK: [{ required: true, message: '请填写七牛云存储空间名称 Bucket', trigger: 'blur' }],
        qiNiuCloudDM: [{ required: true, message: '请填写七牛云空间域名 Domain', trigger: 'blur' }],
        aliCloudAK: [{ required: true, message: '请填写阿里云AccessKeyId', trigger: 'blur' }],
        aliCloudSK: [{ required: true, message: '请填写阿里云AccessKeySecret', trigger: 'blur' }],
        aliCloudBK: [{ required: true, message: '请填写阿里云存储空间名称 Bucket', trigger: 'blur' }],
        aliCloudDM: [{ required: true, message: '请填写阿里云空间域名 Domain', trigger: 'blur' }],
        tencentCloudAK: [{ required: true, message: '请填写腾讯云AccessKeyId', trigger: 'blur' }],
        tencentCloudSK: [{ required: true, message: '请填写腾讯云AccessKeySecret', trigger: 'blur' }],
        tencentCloudRG: [{ required: true, message: '请填写腾讯云所属区域 Region', trigger: 'blur' }],
        tencentCloudBK: [{ required: true, message: '请填写腾讯云存储空间名称 Bucket', trigger: 'blur' }],
        tencentCloudDM: [{ required: true, message: '请填写腾讯云空间域名 Domain', trigger: 'blur' }]
      }*/
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      list(this.temp.type).then((res) => {
        if (res.data.items[0] !== undefined) {
          this.temp = res.data.items[0]
        }
      })
    },
    // 提交
    onSubmit() {
      console.log(this.temp)
      if (this.temp.values.default === null) {
        return this.$message({
          message: '请选择上传方式',
          type: 'warning'
        })
      }

      if (this.temp.values.default === 'qiniu_cloud') {
        if (
          !this.temp.values.qiniu_cloud.region ||
          !this.temp.values.qiniu_cloud.app_key ||
          !this.temp.values.qiniu_cloud.app_secret ||
          !this.temp.values.qiniu_cloud.bucket ||
          !this.temp.values.qiniu_cloud.domain
        ) {
          return this.$message({
            message: '七牛云存储信息填写不完整',
            type: 'warning'
          })
        }
      } else if (this.temp.values.default === 'ali_cloud') {
        if (
          !this.temp.values.ali_cloud.app_key ||
          !this.temp.values.ali_cloud.app_secret ||
          !this.temp.values.ali_cloud.bucket ||
          !this.temp.values.ali_cloud.domain
        ) {
          return this.$message({
            message: '阿里云存储信息填写不完整',
            type: 'warning'
          })
        }
      } else if (this.temp.values.default === 'tencent_cloud') {
        if (
          !this.temp.values.tencent_cloud.app_key ||
          !this.temp.values.tencent_cloud.app_secret ||
          !this.temp.values.tencent_cloud.bucket ||
          !this.temp.values.tencent_cloud.domain ||
          !this.temp.values.tencent_cloud.rg
        ) {
          return this.$message({
            message: '腾讯云存储信息填写不完整',
            type: 'warning'
          })
        }
      }

      /* this.$refs['dataForm'].validateField(this.validaFields, valid => {
        if (!valid) {
          const loading = this.$loading({
            lock: true,
            text: '上传中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          if (this.temp.uuid === null) {
            // 添加数据
            add(this.temp).then(res => {
              this.$message({
                message: res.message,
                type: 'success'
              })
            })
          } else {
            // 更新数据
            edit(this.temp).then(res => {
              this.$message({
                message: res.message,
                type: 'success'
              })
            })
          }
          loading.close()
        }
      })*/
      const loading = this.$loading({
        lock: true,
        text: '上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      if (this.temp.uuid === null) {
        // 添加数据
        add(this.temp).then((res) => {
          this.$message({
            message: res.message,
            type: 'success'
          })
        })
      } else {
        // 更新数据
        edit(this.temp).then((res) => {
          this.$message({
            message: res.message,
            type: 'success'
          })
        })
      }
      loading.close()
    }
  }
}
</script>

<style scoped>
.divider {
  margin-top: 50px;
}

.desc {
  color: rgb(206, 38, 38);
  font-size: 12px;
  line-height: 0;
  margin-top: 15px;
}
</style>
