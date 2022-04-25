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
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="消息分类：" prop="platform_message_category_uuid">
              <el-select v-model="formValidate.platform_message_category_uuid" clearable placeholder="请选择" style="width: 90%">
                <el-option
                  v-for="(item, index) in categoryList"
                  :key="index"
                  :label="item.title"
                  :value="item.uuid"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">其他设置</span>
          <el-divider />
        </div>
        <el-row>
          <!--<el-col :span="24">
            <el-form-item label="排序：">
              <el-input-number v-model="formValidate.orders" :min="0" :max="10000" />
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="显示状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio :label="1" class="radio">显示</el-radio>
                <el-radio :label="0">不显示</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">消息内容</span>
          <el-divider />
        </div>
        <el-form-item label="文章内容：" prop="content">
          <ueditor-from v-model="formValidate.content" :content="formValidate.content" />
        </el-form-item>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 内容
import { add, edit, list } from '@/api/message/message'
import { list as categoryList } from '@/api/message/category'
import ueditorFrom from '@/components/ueditorFrom'
export default {
  name: 'SaveMessageInfo',
  components: { ueditorFrom },
  data() {
    const validateCategoryUuid = (rule, value, callback) => {
      if (this.formValidate.platform_message_category_uuid) {
        callback()
      } else {
        callback(new Error('请选择消息分类'))
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
        title: '',
        platform_message_category_uuid: '',
        content: '',
        is_show: 1
      },
      ruleValidate: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        platform_message_category_uuid: [{ required: true, validator: validateCategoryUuid, trigger: 'change' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'change' }]
      },
      tempRoute: {},
      categoryList: []
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.getDetails()
      } else {
        this.formValidate = {
          title: '',
          platform_message_category_uuid: '',
          content: '',
          is_show: 0
        }
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    categoryList().then(async res => {
      this.categoryList = res.data.items
    })
    if (this.$route.params.uuid) {
      this.getDetails()
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push({ path: `/message/sys/list` })
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
          platform_message_category_uuid: data.platform_message_category_uuid,
          uuid: data.uuid,
          title: data.title,
          content: data.content,
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
