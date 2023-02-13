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
          <span class="title mr10">基础信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="书籍名称：" prop="title" label-for="title">
              <el-input
                v-model.trim="formValidate.title"
                placeholder="请输入名称"
                element-id="title"
                style="width: 90%"
              />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="书籍作者：" prop="author" label-for="author">
              <el-input
                v-model.trim="formValidate.author"
                placeholder="请输入书籍作者"
                element-id="author"
                style="width: 90%"
              />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="书籍来源：" prop="source" label-for="source">
              <el-input
                v-model.trim="formValidate.source"
                placeholder="请输入是来源"
                element-id="source"
                style="width: 90%"
              />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="书籍标签：" prop="tags" label-for="tags">
              <el-input
                v-model.trim="formValidate.tags"
                placeholder="请输入书籍标签"
                element-id="tags"
                style="width: 90%"
              />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="书籍难度：" prop="level">
              <el-rate v-model="formValidate.level" style="display: contents;" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="书籍封面：" prop="file_uuid">
              <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="formValidate.file_uuid" class="pictrue"><img :src="formValidate.file_url" alt=""></div>
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
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="显示状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio v-for="(item, index) in this.$store.getters.isShow" :key="index" :label="item.value">
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="显示顺序：">
              <el-input-number v-model="formValidate.orders" :min="0" :max="1000000000" />
              <div class="image-size-require">最大顺序为1,000,000,000</div>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">书籍简介</span>
          <el-divider />
        </div>
        <el-form-item label="书籍简介：" prop="intro">
          <ueditor-from v-model="formValidate.intro" :content="formValidate.intro" />
        </el-form-item>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 内容
import { add, edit, show } from '@/api/book/book'
import { getName } from '@/utils/auth'
import ueditorFrom from '@/components/ueditorFrom'

export default {
  name: 'ArticleSave',
  components: { ueditorFrom },
  data() {
    const validateFileUuid = (rule, value, callback) => {
      if (this.formValidate.file_uuid) {
        callback()
      } else {
        callback(new Error('请上传书籍图片'))
      }
    }
    const validateLevel = (rule, value, callback) => {
      if (this.formValidate.level) {
        callback()
      } else {
        callback(new Error('请选择试题难度'))
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
        file_uuid: '',
        file_url: '',
        author: getName(),
        source: getName(),
        orders: 0,
        is_show: 1,
        is_top: 1,
        level: 1,
        intro: '',
        tags: ''
      },
      ruleValidate: {
        title: [{ required: true, message: '请输入书籍标题', trigger: 'blur' }],
        // intro: [{ required: true, message: '请输入书籍内容', trigger: 'blur' }],
        file_uuid: [{ required: true, validator: validateFileUuid, trigger: 'change' }],
        author: [{ required: true, message: '请输入书籍作者', trigger: 'blur' }],
        source: [{ required: true, message: '请输入书籍来源', trigger: 'blur' }],
        level: [{ required: true, validator: validateLevel, trigger: 'blur' }]
      },
      categoryData: [],
      sleOptions: {
        title: '',
        uuid: ''
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      }
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
    if (this.$route.params.uuid) {
      this.getDetails()
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.back()
    },
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.formValidate.file_uuid = img.file_uuid
        _this.formValidate.file_url = img.file_url
      }, tit)
    },
    // 分类点击
    handleSelClick(node) {
      this.formValidate.article_category_uuid = node.uuid
      this.sleOptions = {
        title: node.title,
        uuid: node.uuid
      }
    },
    // 提交数据
    onsubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.$route.params.uuid) {
            delete this.formValidate.file_url
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
    // 书籍详情
    getDetails() {
      show({ uuid: this.$route.params.uuid }).then(async res => {
        const data = res.data
        this.formValidate = {
          file_url: data.cover_file_info !== null ? data.cover_file_info.file_url + data.cover_file_info.file_name : '',
          file_uuid: data.file_uuid,
          uuid: data.uuid,
          title: data.title,
          author: data.author,
          source: data.source,
          orders: data.orders,
          intro: data.intro,
          is_show: data.is_show,
          is_top: data.is_top,
          level: data.level,
          tags: data.tags.toString()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
