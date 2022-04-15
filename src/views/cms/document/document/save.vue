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
            <el-form-item label="文章分类：" prop="article_category_uuid" label-for="article_category_uuid">
              <el-select v-model="formValidate.article_category_uuid" clearable placeholder="请选择" style="width: 90%">
                <!--                <el-option-->
                <!--                  :label="sleOptions.title"-->
                <!--                  :value="sleOptions.uuid"-->
                <!--                  style="width: auto;height:200px;overflow: auto;background-color:#fff"-->
                <!--                >-->
                <!--                  <el-tree-->
                <!--                    ref="tree2"-->
                <!--                    :data="categoryData"-->
                <!--                    :props="defaultProps"-->
                <!--                    highlight-current-->
                <!--                    @node-click="handleSelClick"-->
                <!--                  />-->
                <!--                </el-option>-->
                <el-option
                  v-for="item in categoryData"
                  :label="item.title"
                  :value="item.uuid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="文章作者：" prop="author" label-for="author">
              <el-input v-model.trim="formValidate.author" placeholder="请输入" element-id="author" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="文章来源：" prop="source" label-for="source">
              <el-input v-model.trim="formValidate.source" placeholder="请输入" element-id="source" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="文章封面：" prop="file_uuid">
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
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="发布日期：" prop="publish_date">
              <el-date-picker
                v-model="formValidate.publish_date"
                :editable="false"
                value-format="yyyy-MM-dd"
                format="yyyy年MM月dd日"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="文章排序：">
              <el-input-number v-model="formValidate.orders" :min="0" :max="1000000000" />
              <div class="image-size-require">最大顺序为1,000,000,000</div>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="显示状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio v-for="item in this.$store.getters.isShow" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="是否置顶：">
              <el-radio-group v-model="formValidate.is_top">
                <el-radio v-for="item in this.$store.getters.isTop" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
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
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import ueditorFrom from '@/components/ueditorFrom'
import { list as categoryList } from '@/api/article/category'
// 内容
import { add, edit, list } from '@/api/article/list'
import { formatLongDate } from '@/utils'
import { getName } from '@/utils/auth'
export default {
  name: 'ArticleSave',
  components: { ueditorFrom },
  data() {
    const validateArticleCategory = (rule, value, callback) => {
      if (!this.formValidate.article_category_uuid) {
        callback(new Error('请选择新闻分类'))
      } else {
        callback()
      }
    }
    const validatePublishDate = (rule, value, callback) => {
      if (!this.formValidate.publish_date) {
        callback(new Error('请选择发布时间'))
      } else {
        callback()
      }
    }
    const validateFileUuid = (rule, value, callback) => {
      if (this.formValidate.file_uuid) {
        callback()
      } else {
        callback(new Error('请上传新闻图片'))
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
        article_category_uuid: '',
        file_uuid: '',
        file_url: '',
        author: getName(),
        source: getName(),
        orders: 0,
        content: '',
        publish_date: formatLongDate(new Date()),
        is_show: 1,
        is_top: 1
      },
      ruleValidate: {
        title: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
        article_category_uuid: [{ required: true, validator: validateArticleCategory, trigger: 'change' }],
        publish_date: [{ required: true, validator: validatePublishDate, trigger: 'change' }],
        content: [{ required: true, message: '请输入新闻内容', trigger: 'blur' }],
        file_uuid: [{ required: true, validator: validateFileUuid, trigger: 'change' }],
        author: [{ required: true, message: '请输入新闻作者', trigger: 'blur' }],
        source: [{ required: true, message: '请输入新闻来源', trigger: 'blur' }]
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
    // 获取文章分类
    categoryList().then(res => {
      this.categoryData = res.data.items
    })
    if (this.$route.params.uuid) {
      this.getDetails()
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push({ path: `/cms/article/list` })
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
    // 文章详情
    getDetails() {
      list({ uuid: this.$route.params.uuid }).then(async res => {
        const data = res.data.items[0]
        this.formValidate = {
          file_url: data.cover_file_info !== null ? data.cover_file_info.file_url + data.cover_file_info.file_name : '',
          file_uuid: data.file_uuid,
          uuid: data.uuid,
          title: data.title,
          author: data.author,
          source: data.source,
          orders: data.orders,
          content: data.content,
          publish_date: data.publish_date,
          article_category_uuid: data.article_category_uuid,
          is_show: data.is_show,
          is_top: data.is_top
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
