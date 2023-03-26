<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn" style="margin-bottom: 20px;" @click="back">
        返回
      </el-button>
      <el-form
        ref="formValidate"
        class="form"
        :model="formValidate"
        label-width="120px"
        :rules="ruleValidate"
        @submit.native.prevent
      >
        <div class="dividerTitle">
          <span class="title mr10">基本信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="显示端口：" prop="client_position">
              <el-select v-model="formValidate.client_position" clearable placeholder="请选择" style="width: 90%">
                <el-option
                  v-for="(item, index) in clientType"
                  :key="index"
                  :label="item.title"
                  :value="item.uuid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="显示位置：" prop="position_position">
              <el-select v-model="formValidate.position_position" clearable placeholder="请选择" style="width: 90%">
                <el-option
                  v-for="(item, index) in positionData"
                  :key="index"
                  :label="item.title"
                  :value="item.uuid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="轮播标题：" prop="title" label-for="title">
              <el-input
                v-model.trim="formValidate.title"
                placeholder="请输入"
                element-id="title"
                maxlength="32"
                style="width: 90%"
              />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="跳转类型：" prop="type">
              <el-select v-model="formValidate.type" clearable placeholder="请选择" style="width: 90%">
                <el-option
                  v-for="(item, index) in routerList"
                  :key="index"
                  :label="item.title"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="跳转地址：" prop="url" label-for="url">
              <el-input
                v-model.trim="formValidate.url"
                placeholder="请输入 例：/pages/index/index"
                element-id="title"
                style="width: 90%"
              />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="轮播图片：" prop="file_uuid">
              <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="formValidate.file_uuid" class="pictrue"><img :src="bannerImgUrl"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
              <div class="image-size-require">推荐图片尺寸为900*380(px)</div>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">其他设置</span>
          <el-divider />
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="排序：">
              <el-input-number v-model="formValidate.orders" :min="0" :max="10000" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="显示状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio v-for="(item, index) in this.$store.getters.isShow" :key="index" :label="item.value">
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 常量配置
// 内容
import { add, edit, show } from '@/api/banner'
// 字典
import { listGroupCode } from '@/api/dict/dict'

export default {
  name: 'SaveBanner',
  data() {
    const validatePosition = (rule, value, callback) => {
      if (!this.formValidate.position_position) {
        callback(new Error('请选择显示位置'))
      } else {
        callback()
      }
    }
    const validateClientPosition = (rule, value, callback) => {
      if (!this.formValidate.client_position) {
        callback(new Error('请选择显示端口'))
      } else {
        callback()
      }
    }
    const validateFileUuid = (rule, value, callback) => {
      if (this.formValidate.file_uuid) {
        callback()
      } else {
        callback(new Error('请上传轮播图片'))
      }
    }
    const validateType = (rule, value, callback) => {
      if (!this.formValidate.type) {
        callback(new Error('请选择跳转类型'))
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
      bannerImgUrl: '',
      formValidate: {
        title: '',
        file_uuid: '',
        type: '',
        url: '',
        orders: '',
        position_position: '',
        is_show: 1,
        client_position: ''
      },
      ruleValidate: {
        title: [{ max: 32, message: '标题最多只能填写32个字符以内', trigger: 'blur' }],
        position_position: [{ required: true, validator: validatePosition, trigger: 'change' }],
        client_position: [{ required: true, validator: validateClientPosition, trigger: 'change' }],
        type: [{ required: true, validator: validateType, trigger: 'change' }],
        file_uuid: [{ required: true, validator: validateFileUuid, trigger: 'change' }],
        url: [{ required: true, message: '请输入跳转地址', trigger: 'blur' }]
      },
      tempRoute: {},
      positionData: [], // 显示位置
      routerList: [], // 跳转类型
      clientType: []// 显示客户端
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.getDetails()
      } else {
        this.formValidate = {
          title: '',
          file_uuid: '',
          type: '',
          url: '',
          orders: '',
          position_position: '',
          is_show: 0,
          client_position: ''
        }
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    if (this.$route.params.uuid) {
      this.getDetails()
    }
    this.listGroupCod('banner')
    this.listGroupCod('client_type')
    this.listGroupCod('router_1')
  },
  methods: {
    // 获取字典信息
    listGroupCod(code) {
      listGroupCode({ page: 1, size: 20, code: code }).then(res => {
        if (code === 'banner') {
          this.positionData = res.data.items
        } else if (code === 'client_type') {
          this.clientType = res.data.items
        } else if (code === 'router_1') {
          this.routerList = res.data.items
        }
      })
    },
    // 返回
    back() {
      this.$router.back()
    },
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.bannerImgUrl = img.file_url
        _this.formValidate.file_uuid = img.file_uuid
      }, tit)
    },
    // 提交数据
    onsubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.$route.params.uuid) {
            edit(this.formValidate).then(async message => {
              this.$message.success(message)
              setTimeout(() => {
                this.$router.back()
              }, 500)
            })
          } else {
            add(this.formValidate).then((message) => {
              this.$message.success(message)
              setTimeout(() => {
                this.$router.back()
              }, 500)
            })
          }
        } else {
          return false
        }
      })
    },
    // 详情
    getDetails() {
      show(this.$route.params.uuid).then(async res => {
        const data = res.data
        this.bannerImgUrl = data.cover_file_info.file_url + data.cover_file_info.file_name
        this.formValidate = {
          file_uuid: data.file_uuid,
          type: data.type,
          url: data.url,
          uuid: data.uuid,
          title: data.title,
          orders: data.orders,
          position_position: data.position_position,
          is_show: data.is_show,
          client_position: data.client_position
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-divider--horizontal {
  margin: 19px 0;
}
</style>
