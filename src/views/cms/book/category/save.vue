<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn" style="margin-bottom: 20px;" @click="back">返回</el-button>
      <el-form ref="formValidate" class="form" :model="formValidate" label-width="120px" :rules="ruleValidate" @submit.native.prevent>
        <div class="dividerTitle">
          <span class="title mr10">书籍信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="名称：" prop="title" label-for="title">
              <el-input v-model.trim="formValidate.title" placeholder="请输入" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="书籍作者：" prop="author" label-for="author">
              <el-input v-model.trim="formValidate.author" placeholder="请输入" element-id="author" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="书籍来源：" prop="source" label-for="source">
              <el-input v-model.trim="formValidate.source" placeholder="请输入" element-id="source" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="书籍标签：" prop="tags" label-for="tags">
              <el-input v-model.trim="formValidate.tags" placeholder="请输入" element-id="tags" style="width: 90%" />
              <div class="image-size-require">多个标签使用","分割</div>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="书籍目录：" prop="store_book_category_uuid" label-for="store_book_category_uuid">
              <el-cascader v-model="formValidate.store_book_category_uuid" :options="bookCategoryData" :props="{ expandTrigger: 'hover' }" @change="handleChange" />
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
          <el-input v-model="formValidate.intro" type="textarea" />
        </el-form-item>
        <div class="dividerTitle">
          <span class="title">文章内容</span>
          <el-divider />
        </div>
        <el-form-item label="文章内容：" prop="content">
          <markdown-editor v-if="isShow" v-model="formValidate.content" :initial-value="formValidate.content" />
        </el-form-item>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 内容
import MarkdownEditor from '@/components/MarkdownEditor'
import { add, edit, show } from '@/api/book/content'
import { getName } from '@/utils/auth'
import { list as categoryList } from '@/api/book/category'
export default {
  name: 'BookContentSave',
  components: { MarkdownEditor },
  data() {
    const validateFileUuid = (rule, value, callback) => {
      if (this.formValidate.store_book_category_uuid) {
        callback()
      } else {
        callback(new Error('请选择书籍目录'))
      }
    }
    return {
      isShow: false, // 这里用来重新排序父子组件的生命周期，好让content回显数据在富文本里面
      grid: {
        xl: 10,
        lg: 10,
        md: 10,
        sm: 24,
        xs: 24
      },
      formValidate: {
        uuid: '',
        store_book_uuid: '',
        store_book_category_uuid: '',
        title: '',
        intro: '',
        content: '',
        author: getName(),
        tags: '',
        source: getName(),
        orders: 0,
        is_show: 1
      },
      ruleValidate: {
        title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        intro: [{ required: true, message: '简介不能为空', trigger: 'blur' }],
        author: [{ required: true, message: '请输入书籍作者', trigger: 'blur' }],
        source: [{ required: true, message: '请输入书籍来源', trigger: 'blur' }],
        tags: [{ required: true, message: '请输入标签', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        store_book_category_uuid: [{ required: true, validator: validateFileUuid, trigger: 'change' }]
      },
      bookCategoryData: []
    }
  },
  created() {
    if (this.$route.query.content_uuid) {
      this.getDetails()
    } else {
      this.isShow = true
    }
    this.formValidate.store_book_uuid = this.$route.query.store_book_uuid
    this.formValidate.store_book_category_uuid = this.$route.query.store_book_category_uuid
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    // 选择书籍分类
    handleChange(value) {
      if (value.length !== 1) {
        this.formValidate.store_book_category_uuid = value[1] // 有子集就返回第二个值
      } else {
        this.formValidate.store_book_category_uuid = value[0] // 没子集就是第一个值
      }
    },
    // 返回
    back() {
      this.$router.push({ path: `/cms/book/category/list/` + this.formValidate.store_book_uuid })
    },
    // 提交数据
    onsubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.$route.query.content_uuid) {
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
      show({
        uuid: this.$route.query.content_uuid,
        store_book_uuid: this.$route.query.store_book_uuid
      }).then(async res => {
        const data = res.data
        this.formValidate = {
          uuid: data.uuid,
          store_book_uuid: data.store_book_uuid,
          store_book_category_uuid: data.store_book_category_uuid,
          title: data.title,
          intro: data.intro,
          content: data.content,
          author: data.author,
          tags: data.tags.toString(),
          source: data.source,
          orders: data.orders,
          is_show: data.is_show
        }
        this.isShow = true
      })
    },
    // 分类
    getCategoryList() {
      categoryList({
        store_book_uuid: this.formValidate.store_book_uuid
      }).then(res => {
        const data = res.data.items
        const newArr = []

        // 格式化级联选择器的数据格式
        data.map((item, index) => {
          newArr.push({
            value: item.uuid,
            label: item.title
          })
          if (item.children) {
            newArr[index]['children'] = []
            item.children.map((citem, cindex) => {
              newArr[index]['children'].push({
                value: citem.uuid,
                label: citem.title
              })
            })
          }
        })
        this.bookCategoryData = newArr
      }).catch(res => {
        this.$message.error(res.message)
      })
    }
  }
}

</script>

<style scoped lang="scss">
.el-divider--horizontal {
  margin: 20px 0;
}
</style>
