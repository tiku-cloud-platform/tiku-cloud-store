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
            <el-form-item label="分类名称：" prop="title" label-for="title">
              <el-input v-model.trim="formValidate.title" placeholder="请输入" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
          <!--          <el-col v-bind="grid" class="mr50">
            <el-form-item label="上级分类：" prop="platform_message_category_uuid">
              <el-select v-model="formValidate.parent_uuid" clearable placeholder="请选择" style="width: 90%">
                <el-option
                  v-for="item in optionData"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>-->
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="分类图片：" prop="file_uuid">
              <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="formValidate.file_uuid" class="pictrue"><img :src="formValidate.file_url"></div>
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
                <el-radio v-for="item in this.$store.getters.isShow" :key="item.uuid" :label="item.value">{{ item.label }}</el-radio>
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

import { add, edit, list } from '@/api/article/category'
export default {
  name: 'ArticleCategorySave',
  data() {
    // const validateCategoryUuid = (rule, value, callback) => {
    //   if (this.formValidate.platform_message_category_uuid) {
    //     callback()
    //   } else {
    //     callback(new Error('请选择消息分类'))
    //   }
    // }
    // const validateFileUuid = (rule, value, callback) => {
    //   if (this.formValidate.file_uuid) {
    //     callback()
    //   } else {
    //     callback(new Error('请上传分类图片'))
    //   }
    // }
    return {
      grid: {
        xl: 10,
        lg: 10,
        md: 10,
        sm: 24,
        xs: 24
      },
      optionData: [],
      formValidate: {
        file_url: '',
        title: '',
        parent_uuid: '',
        file_uuid: '',
        orders: 0,
        is_show: 1
      },
      ruleValidate: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
        // parent_uuid: [{ required: true, validator: validateCategoryUuid, trigger: 'change' }],
        // file_uuid: [{ required: true, validator: validateFileUuid, trigger: 'change' }]
      },
      tempRoute: {},
      categoryList: []
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.uuid) {
        this.getDetails()
      } else {
        this.formValidate = {
          file_url: '',
          title: '',
          parent_uuid: '',
          file_uuid: '',
          orders: 0,
          is_show: 1
        }
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    list().then(async res => {
      const cloneData = JSON.parse(JSON.stringify(res.data.items))
      if (cloneData !== null) {
        const newArr = []
        cloneData.forEach(item => {
          newArr.push({
            value: item.uuid,
            label: item.title
          })
        })
        this.optionData = newArr
      }
    })
    if (this.$route.params.uuid) {
      this.getDetails()
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push({ path: `/cms/article/category/list` })
    },
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.formValidate.file_uuid = img.file_uuid
        _this.formValidate.file_url = img.file_url
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
          file_url: data.cover_file_info !== null ? data.cover_file_info.file_url + data.cover_file_info.file_name : '',
          orders: data.orders,
          parent_uuid: data.parent_uuid,
          uuid: data.uuid,
          title: data.title,
          is_show: data.is_show
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>

