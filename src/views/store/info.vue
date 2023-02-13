<template>
  <div class="divBox">
    <el-card class="box-card" style="width: 35%;margin-right: 1%;">
      <div class="header">
        <el-upload
          action=""
          :http-request="UploadFile"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
          class="avatar-upload"
        >
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
          <i class="el-icon-edit" />
        </el-upload>
        <div>
          <div class="nick-name">{{ userInfo.name }}</div>
          <div class="mt10">富在术数，不在劳身；利在势居，不在力耕。</div>
          <div style="text-align: left;">
            <div class="mt20 info">
              <svg-icon icon-class="peoples" class-name="store-icon" />
              公司名称：{{ userInfo.company_name }}
            </div>
            <div class="mt20 info">
              <svg-icon icon-class="email" class-name="store-icon" />
              公司邮箱：{{ userInfo.email }}
            </div>
            <div class="mt20 info">
              <svg-icon icon-class="phone" class-name="store-icon" />
              公司电话：{{ userInfo.company_tel }}
            </div>
            <div class="mt20 info">
              <svg-icon icon-class="time" class-name="store-icon" />
              过期时间：{{ userInfo.expire_time }}
            </div>
          </div>
        </div>

      </div>
    </el-card>
    <el-card class="box-card" style="width: 64%;">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="basic">
          <el-form ref="userInfo" :model="userInfo" label-width="80px" :rules="ruleUserInfo" size="mini" style="width: 55%;">
            <!--            <el-form-item label="商户ID">
              <div style="display: flex;">
                <el-input v-model="userInfo.store_uuid" disabled style="margin-right: 10px;" />
                <el-button type="primary" size="mini">复制</el-button>
              </div>
            </el-form-item>-->
            <el-form-item label="商户昵称" prop="name" placeholder="请输入">
              <el-input v-model="userInfo.name" clearable />
            </el-form-item>
            <el-form-item
              label="登录邮箱"
              prop="email"
              placeholder="请输入"
              :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]"
            >
              <el-input v-model="userInfo.email" clearable />
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile" placeholder="请输入">
              <el-input v-model="userInfo.mobile" clearable />
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" size="mini" @click="submit('userInfo')">确定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!--        <el-tab-pane label="账号绑定" name="account">账号绑定</el-tab-pane>-->
        <el-tab-pane label="修改密码" name="passwd">
          <el-form ref="editPwd" :model="pwdInfo" label-width="80px" :rules="ruleEditPwd" size="mini" style="width: 55%;">
            <el-form-item label="原始密码" prop="old_password">
              <el-input v-model="pwdInfo.old_password" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="新密码" prop="new_password">
              <el-input v-model="pwdInfo.new_password" type="password" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="确认密码" prop="new_password_confirmation">
              <el-input v-model="pwdInfo.new_password_confirmation" type="password" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" size="mini" @click="submit('editPwd')">确定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { userInfo, updateInfo } from '@/api/user'
import { uploadToken } from '@/api/file/token'
import { Base64 } from 'js-base64'
import uploadFileCloud from '@/utils/upload'
import { MessageBox } from 'element-ui'
export default {
  name: 'PersonalCenter',
  mixins: [uploadFileCloud],
  data() {
    const validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.pwdInfo.new_password_confirmation !== '') {
          this.$refs.editPwd.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdInfo.new_password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userInfo: {
        uuid: '',
        name: '',
        email: '',
        expire_time: '',
        mobile: '',
        avatar: '',
        store_uuid: '',
        company_name: '',
        company_tel: ''
      },
      pwdInfo: {
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
      },
      fileTemp: {
        domain: '',
        storage: ''
      },
      activeName: 'basic',
      ruleUserInfo: {
        name: [{ required: true, message: '请输入商户昵称', trigger: 'blur' }],
        mobile: [{ required: true, validator: validateMobile, trigger: 'blur' }]
      },
      ruleEditPwd: {
        old_password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        new_password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        new_password_confirmation: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      userInfo().then(res => {
        this.userInfo = {
          uuid: res.data.uuid,
          name: res.data.name,
          email: res.data.email,
          mobile: res.data.mobile,
          avatar: res.data.avatar,
          expire_time: res.data.expire_time,
          store_uuid: res.data.store_uuid,
          company_tel: res.data.company_tel,
          company_name: res.data.company_name
        }
      })
    },
    beforeUpload(file) {
      const tmp = file.name.split('.')
      const extname = tmp.pop()
      const extList = ['jpg', 'jpeg', 'png', 'gif']
      const isValid = extList.includes(extname)
      if (!isValid) {
        this.$message.warning(`只支持上传 jpg、jpeg、png、gif 格式的图片`)
        return false
      }
      if (file.size > 1024 * 1024 * 2) {
        this.$message.warning(`请上传小于2MB的文件`)
        return false
      }
    },
    // 上传头像
    async UploadFile(opt) {
      await uploadToken().then(res => {
        this.tokenInfo = res.data
        this.fileTemp.storage = res.data.driver
        this.fileTemp.domain = res.data.values.domain
      })
      const result = await this.uploadFile(opt, this.tokenInfo)
      this.userInfo.avatar = this.fileTemp.domain + JSON.parse(result)[0]['file_name']
    },
    // 上传成功
    uploadSuccess() {
      updateInfo(this.userInfo).then(res => {
        console.log(res)
      })
    },
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (name === 'editPwd') {
            this.userInfo.old_password = Base64.encode(this.pwdInfo.old_password.trim())
            this.userInfo.new_password = Base64.encode(this.pwdInfo.new_password.trim())
            this.userInfo.new_password_confirmation = Base64.encode(this.pwdInfo.new_password_confirmation.trim())
            updateInfo(this.userInfo).then(res => {
              MessageBox.confirm('修改成功，请重新登录！！！', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              }).then(() => {
                this.$store.dispatch('user/logout').then(() => {
                  this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                })
              })
            })
          } else if (name === 'userInfo') {
            updateInfo(this.userInfo).then(res => {
              this.$message.success('修改成功')
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .store-icon {
    font-size: 18px;
  }

  .divBox {
    display: flex;
  }

  .box-card:nth-child(1) {
    text-align: center;
    display: flex;
    justify-content: center;
    color: #626b7d;
  }

  .nick-name {
    font-size: 24px;
    font-weight: 500;
    color: #262626;
  }

  .avatar-upload {
    //position: relative;
  }

  .el-icon-edit {
    position: absolute;
    font-size: 25px;
    margin-top: -60px;
    margin-left: -10px;
  }

  .avatar-uploader {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
  }

  .info {
    display: flex;
    align-items: center;
  }
</style>
