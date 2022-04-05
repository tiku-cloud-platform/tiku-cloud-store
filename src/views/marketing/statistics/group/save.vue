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
            <el-form-item label="分组名称：" prop="title" label-for="title">
              <el-input v-model.trim="formValidate.title" placeholder="请输入分组名称" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">其他设置</span>
          <el-divider />
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="启用状态：">
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
import { add, edit, show } from '@/api/statistics/group'
export default {
  name: 'SaveMessageCategory',
  data() {
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
        is_show: 1,
        uuid: ''
      },
      ruleValidate: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
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
      this.$router.push({ path: `/marketing/marketing/group/list` })
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
