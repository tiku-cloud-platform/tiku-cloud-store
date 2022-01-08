<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-form ref="formValidate" class="form" :model="formValidate" label-width="120px" :rules="ruleValidate" @submit.native.prevent>
        <div class="dividerTitle">
          <span class="title mr10">小程序信息</span>
          <el-divider />
        </div>
        <el-form-item label="名称：" prop="name" label-for="name">
          <el-input v-model.trim="formValidate.values.name" placeholder="请输入微信小程序名称" maxlength="18" element-id="name" />
        </el-form-item>
        <el-form-item label="开发key：" prop="app_key" label-for="app_key">
          <el-input v-model.trim="formValidate.values.app_key" placeholder="请输入微信小程序开发key" maxlength="100" element-id="app_key" />
        </el-form-item>
        <el-form-item label="开发秘钥：" prop="app_secret" class="app-info" label-for="app_secret">
          <el-input v-model.trim="formValidate.values.app_secret" placeholder="请输入微信小程序开发密钥" element-id="app_secret" />
        </el-form-item>
        <div class="dividerTitle">
          <span class="title mr10">公众号信息</span>
          <el-divider />
        </div>
        <el-form-item label="名称：" prop="offical_name" label-for="offical_name">
          <el-input v-model.trim="formValidate.values.offical_name" placeholder="请输入公众号名称" maxlength="18" element-id="offical_name" />
        </el-form-item>
        <el-form-item label="开发key：" prop="offical_app_key" label-for="offical_app_key">
          <el-input v-model.trim="formValidate.values.offical_app_key" placeholder="请输入公众号开发key" maxlength="100" element-id="offical_app_key" />
        </el-form-item>
        <el-form-item label="开发秘钥：" prop="offical_app_secret" class="app-info" label-for="offical_app_secret">
          <el-input v-model.trim="formValidate.values.offical_app_secret" placeholder="请输入公众号开发秘钥" element-id="offical_app_secret" />
        </el-form-item>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
        <el-button @click="resetForm('formValidate')">重置</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { list, add, edit } from '@/api/system/config'
export default {
  name: 'MiniConfig',
  data() {
    const validateName = (rule, value, callback) => {
      if (!this.formValidate.values.name) {
        callback(new Error('请输入小程序名称'))
      } else {
        callback()
      }
    }
    const validateOfficalName = (rule, value, callback) => {
      if (!this.formValidate.values.offical_name) {
        callback(new Error('请输入公众号名称'))
      } else {
        callback()
      }
    }
    const validateAppKey = (rule, value, callback) => {
      if (!this.formValidate.values.app_key) {
        callback(new Error('请输入APPID'))
      } else {
        callback()
      }
    }
    const validateOfficalAppKey = (rule, value, callback) => {
      if (!this.formValidate.values.offical_app_key) {
        callback(new Error('请输入公众号开发key'))
      } else {
        callback()
      }
    }
    const validateAppSecret = (rule, value, callback) => {
      if (!this.formValidate.values.app_secret) {
        callback(new Error('请输入SECRET'))
      } else {
        callback()
      }
    }
    const validateOfficalAppSecret = (rule, value, callback) => {
      if (!this.formValidate.values.app_secret) {
        callback(new Error('请输入SECRET'))
      } else {
        callback()
      }
    }
    return {
      grid: {
        xl: 10,
        lg: 10,
        md: 10,
        sm: 24,
        xs: 24
      },
      formValidate: {
        uuid: '',
        title: '微信设置',
        type: 'wx_setting',
        values: {
          app_key: '',
          app_secret: '',
          name: '',
          offical_app_key: '',
          offical_app_secret: '',
          offical_name: ''
        }
      },
      ruleValidate: {
        name: [{ required: true, validator: validateName, trigger: 'blur' }],
        // offical_name: [{ required: true, validator: validateOfficalName, trigger: 'blur' }],
        app_key: [{ required: true, validator: validateAppKey, trigger: 'blur' }],
        // offical_app_key: [{ required: true, validator: validateOfficalAppKey, trigger: 'blur' }],
        app_secret: [{ required: true, validator: validateAppSecret, trigger: 'blur' }]
        // offical_app_secret: [{ required: true, validator: validateOfficalAppSecret, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      list(this.formValidate.type).then(res => {
        console.log(res)
        if (res.data.items[0] !== undefined) {
          this.formValidate = res.data.items[0]
        }
      })
    },
    resetForm(name) {
      this.formValidate.values.app_key = ''
      this.formValidate.values.app_secret = ''
      this.formValidate.values.name = ''
      this.formValidate.values.offical_app_key = ''
      this.formValidate.values.offical_app_secret = ''
      this.formValidate.values.offical_name = ''
    },
    onsubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formValidate.uuid !== '') {
            edit(this.formValidate).then(async message => {
              this.$message.success(message)
            })
          } else if (this.formValidate.uuid === '') {
            add(this.formValidate).then((message) => {
              this.$message.success(message)
            })
          } else {
            this.$message.error('请求参数不合法')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.el-divider--horizontal {
  margin: 19px 0;
}

.app-info .el-input {
  width: 88% !important;
}

.app-info .el-form-item__content .el-form-item__error {
  left: 125px !important;
}
</style>
