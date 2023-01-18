<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn" style="margin-bottom: 20px;" @click="back">返回</el-button>
      <el-form ref="formValidate" class="form" :model="formValidate" label-width="120px" :rules="ruleValidate" @submit.native.prevent>
        <div class="dividerTitle">
          <span class="title mr10">文章信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="文章标题：" prop="title" label-for="title">
              <el-input v-model.trim="formValidate.title" placeholder="请输入" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="配置描述：" prop="position">
              <el-form-item label="配置描述：" prop="position" label-for="title">
                <el-input v-model.trim="formValidate.position" placeholder="注意：描述当前位置配置区域" element-id="title" style="width: 90%" />
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">文章内容</span>
          <el-divider />
        </div>
        <el-form-item label="文章内容：" prop="content">
          <ueditor-from v-model="formValidate.content" :content="formValidate.content" />
        </el-form-item>
        <div class="dividerTitle">
          <span class="title">其他设置</span>
          <el-divider />
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="排序：">
              <el-input-number v-model="formValidate.orders" :min="0" :max="10" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="显示状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio :label="1" class="radio">显示</el-radio>
                <el-radio :label="2">不显示</el-radio>
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
import ueditorFrom from '@/components/ueditorFrom'
// 常量配置
import { list as constantList } from '@/api/system/const'
// 内容
import { add, edit, list } from '@/api/cms/content'
export default {
  name: 'ConfigEdit',
  components: { ueditorFrom },
  data() {
    // const validatePosition = (rule, value, callback) => {
    //   if (!this.formValidate.position) {
    //     callback(new Error('请选择文章位置'))
    //   } else {
    //     callback()
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
      formValidate: {
        title: '',
        position: '',
        orders: 0,
        content: '',
        is_show: 1
      },
      ruleValidate: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        position: [{ required: true, message: '请输入配置描述', trigger: 'blur' }],
        // position: [{ required: true, validator: validatePosition, trigger: 'change' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'change' }]
      },
      tempRoute: {},
      positionData: []
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.getDetails()
      } else {
        this.formValidate = {
          title: '',
          orders: 0,
          position: '',
          content: '',
          is_show: 2
        }
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    // this.getConstantList()
    if (this.$route.params.id) {
      this.setTagsViewTitle()
      this.getDetails()
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push({ path: `/cms/config/article/list` })
    },
    // 所有文章显示位置
    getConstantList() {
      constantList({ title: 'signal_article' }).then(res => {
        this.positionData = res.data.items
      })
    },
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.formValidate.image_input = img[0]
      }, tit)
    },
    // 分类点击
    handleSelClick(node) {
      this.formValidate.cid = node.article_category_id
      this.sleOptions = {
        title: node.title,
        article_category_id: node.article_category_id
      }
    },
    // 提交数据
    onsubmit(name) {
      console.log(this.formValidate)
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.$route.params.id) {
            edit(this.formValidate).then(async message => {
              this.$message.success(message)
              setTimeout(() => {
                this.$router.go(-1)
              }, 500)
            })
          } else {
            add(this.formValidate).then((message) => {
              this.$message.success(message)
              setTimeout(() => {
                this.$router.go(-1)
              }, 500)
            })
          }
        } else {
          return false
        }
      })
    },
    // 文章详情
    getDetails() {
      list({ uuid: this.$route.params.id }).then(async res => {
        const data = res.data.items[0]
        this.formValidate = {
          uuid: data.uuid,
          title: data.title,
          orders: data.orders,
          position: data.position,
          content: data.content,
          is_show: data.is_show
        }
      })
    },
    setTagsViewTitle() {
      const title = '编辑文章'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.$route.params.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    }
  }
}
</script>

<style scoped lang="scss">
.el-divider--horizontal {
  margin: 19px 0;
}
</style>
