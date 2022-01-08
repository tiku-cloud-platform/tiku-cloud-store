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
            <el-form-item label="积分名称：" prop="title" label-for="title">
              <el-input v-model.trim="formValidate.title" placeholder="请输入" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="积分数额：" prop="score" label-for="score">
              <el-input v-model.trim="formValidate.score" placeholder="请输入" element-id="title" style="width: 90%" />
              <div class="desc">
                如果填写的是0.00、0，最终积分计算对应业务配置的积分。
              </div>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="积分方式：" prop="key">
              <el-select v-model="formValidate.key" clearable placeholder="请选择" style="width: 90%">
                <el-option
                  v-for="item in scoreData"
                  :key="item.value"
                  :label="item.describe"
                  :value="item.value"
                />
              </el-select>
              <div class="desc">
                积分配置方式不能重复，如果重复则只取最开始创建的第一条数据为准。
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
            <el-form-item label="显示状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio v-for="item in this.$store.getters.isShow" :key="item.key" :label="item.value">{{ item.label }}</el-radio>
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
import { list as constantList } from '@/api/system/const'
// 内容
import { add, edit, list } from '@/api/score/index'
export default {
  name: 'SaveScoreConf',
  data() {
    const validateScoreKey = (rule, value, callback) => {
      if (!this.formValidate.key) {
        callback(new Error('请选择积分方式'))
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
        title: '',
        score: 0.00,
        key: '',
        is_show: 1
      },
      ruleValidate: {
        title: [{ required: true, message: '请输入积分名称', trigger: 'blur' }],
        key: [{ required: true, validator: validateScoreKey, trigger: 'change' }],
        score: [{ required: true, message: '请输入积分数额', trigger: 'change' }]
      },
      scoreData: []
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.uuid) {
        this.getDetails()
      } else {
        this.formValidate = {
          title: '',
          score: '',
          key: '',
          is_show: 1
        }
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    constantList({ title: 'system_score' }).then(res => {
      this.scoreData = res.data.items
    })
    if (this.$route.params.uuid) {
      this.getDetails()
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push({ path: `/score/conf/list` })
    },
    // 提交数据
    onsubmit(name) {
      console.log(this.formValidate)
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
          uuid: data.uuid,
          title: data.title,
          key: data.key,
          score: data.score,
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

.desc {
  color: rgb(206, 38, 38);
  font-size: 12px;
  line-height: 0;
  margin-top: 15px;
}
</style>
