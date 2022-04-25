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
            <el-form-item label="知识名称：" prop="title" label-for="title">
              <el-input v-model.trim="formValidate.title" placeholder="请输入" maxlength="32" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="上级分类：" prop="parent_uuid">
              <el-select v-model="formValidate.parent_uuid" clearable placeholder="请选择" style="width: 90%">
                <el-option
                  v-for="item in parentUuidData"
                  :key="item.uuid"
                  :label="item.title"
                  :value="item.uuid"
                  :disabled="formValidate.uuid === item.uuid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="备注信息：" prop="remark" label-for="remark">
              <el-input v-model="formValidate.remark" type="textarea" placeholder="请输入" style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">其他设置</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="显示状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio v-for="(item, index) in this.$store.getters.isShow" :key="index" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="分类排序：">
              <el-input-number v-model="formValidate.orders" :min="0" />
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
import { parent, show, add, edit } from '@/api/exam/knowledge'
export default {
  name: 'SaveKnowledgeCategory',
  data() {
    return {
      grid: {
        xl: 10,
        lg: 10,
        md: 10,
        sm: 24,
        xs: 24
      },
      small_file_url: '',
      big_file_url: '',
      formValidate: {
        uuid: '',
        title: '',
        parent_uuid: '',
        remark: '',
        is_show: 1,
        orders: ''
      },
      ruleValidate: {
        title: [{ required: true, message: '请填写分类名称', trigger: 'blur' }]
      },
      tempRoute: {},
      parentUuidData: [] // 上级分类
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.uuid) {
        this.getDetails()
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    // 获取知识点顶级分类
    parent().then(res => {
      this.parentUuidData = res.data.items
    })
    if (this.$route.params.uuid) {
      this.getDetails()
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push({ path: `/exam/knowledge/list` })
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
      show({ uuid: this.$route.params.uuid }).then(async res => {
        const data = res.data
        this.formValidate = {
          uuid: data.uuid,
          title: data.title,
          parent_uuid: data.parent_uuid,
          remark: data.remark,
          is_show: data.is_show,
          orders: data.orders
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 19px 0;
}
</style>
