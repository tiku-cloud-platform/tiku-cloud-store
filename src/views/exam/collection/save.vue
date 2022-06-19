<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn" style="margin-bottom: 20px;" @click="back">返回</el-button>
      <el-form ref="formValidate" class="form" label-position="left" :model="formValidate" label-width="120px" :rules="ruleValidate" @submit.native.prevent>
        <div class="dividerTitle">
          <span class="title mr10">基本信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="试卷分类：" prop="exam_category_uuid">
              <el-select v-model="formValidate.exam_category_uuid" clearable placeholder="请选择" style="width: 90%">
                <!--                <el-option-->
                <!--                  v-for="item in examCategoryData"-->
                <!--                  :key="item.uuid"-->
                <!--                  :label="item.title"-->
                <!--                  :value="item.uuid"-->
                <!--                />-->
                <el-option
                  :label="sleOptions.title"
                  :value="sleOptions.uuid"
                  style="width: auto;height:200px;overflow: auto;background-color:#fff"
                >
                  <el-tree
                    ref="tree2"
                    :data="examCategoryData"
                    :props="defaultProps"
                    highlight-current
                    @node-click="handleSelClick"
                  />
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="试卷名称：" prop="title" label-for="title">
              <el-input v-model.trim="formValidate.title" placeholder="请输入" maxlength="100" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="答题时间：" prop="exam_time" label-for="exam_time">
              <el-time-picker
                v-model="formValidate.exam_time"
                :picker-options="{ selectableRange: '00:00:00 - 23:59:59' }"
                :editable="false"
                value-format="HH:mm:ss"
                placeholder="请选择"
                style="width: 90%"
              /></el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="难易等级：" prop="level">
              <el-rate v-model="formValidate.level" style="display: contents;" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="试卷封面：" prop="file_uuid">
              <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="formValidate.file_uuid" class="pictrue"><img :src="file_url"></div>
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
            <el-form-item label="试卷出题人：" prop="author" label-for="author">
              <el-input v-model.trim="formValidate.author" placeholder="请输入" maxlength="32" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="试卷审核人：" prop="audit_author" label-for="audit_author">
              <el-input v-model.trim="formValidate.audit_author" placeholder="请输入" maxlength="32" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="显示状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio v-for="(item, index) in this.$store.getters.isShow" :key="index" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="是否推荐：">
              <el-radio-group v-model="formValidate.is_recommend">
                <el-radio v-for="(item, index) in this.$store.getters.isRecommend" :key="index" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="显示排序：">
              <el-input-number v-model="formValidate.orders" :min="0" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="最大问答题数量：">
              <el-input-number v-model="formValidate.max_reading_total" :min="0" :max="50" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="最大选择题数量：">
              <el-input-number v-model="formValidate.max_option_total" :min="0" :max="50" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="最大判断题数量：">
              <el-input-number v-model="formValidate.max_judge_total" :min="0" :max="10" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">试卷介绍</span>
          <el-divider />
        </div>
        <el-form-item label="试卷介绍：" prop="content">
          <ueditor-from v-model="formValidate.content" :content="formValidate.content" />
        </el-form-item>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import ueditorFrom from '@/components/ueditorFrom'
import { list as examCategoryList } from '@/api/exam/category'
import { add, edit, show } from '@/api/exam/collection'
import { getName } from '@/utils/auth'
export default {
  name: 'SaveExamCollection',
  components: { ueditorFrom },
  data() {
    const validateExamCategory = (rule, value, callback) => {
      if (!this.formValidate.exam_category_uuid) {
        callback(new Error('请选择试卷分类'))
      } else {
        callback()
      }
    }
    const validateFileUuid = (rule, value, callback) => {
      if (this.formValidate.file_uuid) {
        callback()
      } else {
        callback(new Error('请上传试卷封面图片'))
      }
    }
    const validateLevel = (rule, value, callback) => {
      if (this.formValidate.level) {
        callback()
      } else {
        callback(new Error('请选择试卷难易等级'))
      }
    }
    const validateContent = (rule, value, callback) => {
      if (this.formValidate.content) {
        callback()
      } else {
        callback(new Error('请填写试卷介绍'))
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
      file_url: '',
      formValidate: {
        uuid: '',
        title: '',
        file_uuid: '',
        exam_category_uuid: '',
        exam_time: '00:30:00',
        orders: '',
        is_recommend: 1,
        is_show: 1,
        content: '',
        level: 1,
        author: getName(),
        audit_author: getName(),
        max_reading_total: 20,
        max_option_total: 50,
        max_judge_total: 10
      },
      ruleValidate: {
        title: [{ required: true, message: '请填写试卷名称', trigger: 'blur' }],
        exam_time: [{ required: true, message: '请选择答题时间', trigger: 'blur' }],
        exam_category_uuid: [{ required: true, validator: validateExamCategory, trigger: 'change' }],
        file_uuid: [{ required: true, validator: validateFileUuid, trigger: 'change' }],
        content: [{ required: true, validator: validateContent, trigger: 'blur' }],
        level: [{ required: true, validator: validateLevel, trigger: 'blur' }]
      },
      examCategoryData: [],
      sleOptions: {
        title: '',
        uuid: ''
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      tempRoute: {}
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
    // 获取试题分类
    examCategoryList().then(res => {
      this.examCategoryData = res.data.items
    })
    if (this.$route.params.uuid) {
      this.getDetails()
    }
  },
  methods: {
    // 分类点击
    handleSelClick(node) {
      this.formValidate.exam_category_uuid = node.uuid
      this.sleOptions = {
        title: node.title,
        uuid: node.uuid
      }
    },
    // 返回
    back() {
      this.$router.push({ path: `/exam/collection/list` })
    },
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.file_url = img.file_url
        _this.formValidate.file_uuid = img.file_uuid
      }, tit)
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
      show({ uuid: this.$route.params.uuid }).then(async res => {
        const data = res.data
        this.sleOptions.title = data.exam_category_info.title
        this.sleOptions.uuid = data.exam_category_uuid
        this.file_url = data.cover_file_info !== null ? data.cover_file_info.file_url + data.cover_file_info.file_name : ''
        this.formValidate = {
          uuid: data.uuid,
          title: data.title,
          file_uuid: data.file_uuid,
          exam_category_uuid: data.exam_category_uuid,
          exam_time: data.exam_time,
          orders: data.orders,
          is_show: data.is_show,
          is_recommend: data.is_recommend,
          content: data.content,
          level: data.level,
          author: data.author,
          audit_author: data.audit_author,
          max_reading_total: data.max_reading_total,
          max_option_total: data.max_option_total,
          max_judge_total: data.max_judge_total
        }
      })
    }
  }
}
</script>

<style lang="scss">
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 19px 0;
}
.el-form-item__content {
  z-index: 1;
}
</style>
