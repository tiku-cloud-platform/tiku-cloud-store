<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn" style="margin-bottom: 20px;" @click="back">返回</el-button>
      <el-form ref="formValidate" class="form" :model="formValidate" label-width="120px" :rules="ruleValidate" @submit.native.prevent>
        <div class="dividerTitle">
          <span class="title mr10">基本信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="消息标题：" prop="title" label-for="title">
              <el-input v-model.trim="formValidate.title" placeholder="请输入" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="分类图片：" prop="file_uuid">
              <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="formValidate.file_uuid" class="pictrue"><img :src="formValidate.img_url"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
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
                <el-radio v-for="item in this.$store.getters.isShow" :label="item.value">{{ item.label }}</el-radio>
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
// 内容
import { add, edit, list } from '@/api/message/category'
export default {
  name: 'SaveMessageCategory',
  data() {
    const validateFileUuid = (rule, value, callback) => {
      if (this.formValidate.file_uuid) {
        callback()
      } else {
        callback(new Error('请上传封面图片'))
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
        img_url: '',
        title: '',
        file_uuid: '',
        orders: '',
        is_show: 1
      },
      ruleValidate: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        file_uuid: [{ required: true, validator: validateFileUuid, trigger: 'change' }]
      },
      tempRoute: {},
      positionData: [], // 显示位置
      typeData: [] // 跳转类型
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
          orders: '',
          is_show: 0
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
  },
  methods: {
    // 返回
    back() {
      this.$router.push({ path: `/message/sys/category/list` })
    },
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.formValidate.img_url = img.file_url
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
                this.back()
              }, 500)
            })
          } else {
            add(this.formValidate).then((message) => {
              this.$message.success(message)
              setTimeout(() => {
                this.back()
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
      list({ uuid: this.$route.params.uuid }).then(async res => {
        const data = res.data.items[0]
        this.formValidate = {
          file_uuid: data.file_uuid,
          img_url: data.cover_file_info.file_url + data.cover_file_info.file_name,
          uuid: data.uuid,
          title: data.title,
          orders: data.orders,
          is_show: data.is_show
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
