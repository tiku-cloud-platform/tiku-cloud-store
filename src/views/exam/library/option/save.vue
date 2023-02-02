<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn" style="margin-bottom: 20px;" @click="back">返回</el-button>
      <el-form ref="formValidate" id="form" class="form" :model="formValidate" label-width="120px" :rules="ruleValidate" @submit.native.prevent>
        <div class="dividerTitle">
          <span class="title mr10">基本信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col>
            <el-form-item label="试题题目：" prop="title" label-for="title">
              <ueditor-from v-model="formValidate.title" :content="formValidate.title" :ueditorFromHeight="'100'" style="width: 78%" />
<!--              <el-input v-model.trim="formValidate.title" type="textarea" autosize placeholder="请输入试题题目" maxlength="1000" style="width: 90%" />-->
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="消耗积分：" prop="tips_expend_score">
              <el-input-number v-model="formValidate.tips_expend_score" :min="0" :precision="2" :step="0.1" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="奖励积分：" prop="answer_income_score">
              <el-input-number v-model="formValidate.answer_income_score" :min="0" :precision="2" :step="0.1" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="试题难度：" prop="level">
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
          <span class="title">试卷信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="试题分类：" prop="category">
              <el-select v-model="formValidate.category" multiple filterable clearable placeholder="请选择" style="width: 90%">
                <el-option-group
                  v-for="group in categoryData"
                  :key="group.title"
                  :label="group.title"
                >
                  <el-option
                    v-for="item in group.children"
                    :key="item.uuid"
                    :label="item.title"
                    :value="item.uuid"
                  />
                </el-option-group>
              </el-select>
              <!--              <select-page :select.sync="formValidate.category" url="store/exam/category/list" :group="true" :multiple="true" />-->
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="试题知识点：" prop="tag">
              <el-select v-model="formValidate.tag" multiple clearable filterable placeholder="请选择" style="width: 90%">
                <el-option-group
                  v-for="group in knowledgeData"
                  :key="group.title"
                  :label="group.title"
                >
                  <el-option
                    v-for="item in group.children"
                    :key="item.uuid"
                    :label="item.title"
                    :value="item.uuid"
                  />
                </el-option-group>
              </el-select>
<!--              <select-page :select.sync="formValidate.tag" url="store/exam/tag/list" :group="true" :multiple="true" />-->
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="试题试卷：" prop="collection">
<!--              <el-select v-model="formValidate.collection" multiple clearable placeholder="请选择" style="width: 90%">-->
<!--                <el-option-->
<!--                  v-for="item in collectionData"-->
<!--                  :key="item.uuid"-->
<!--                  :label="item.title"-->
<!--                  :value="item.uuid"-->
<!--                />-->
<!--              </el-select>-->
              <select-page :select.sync="formValidate.collection" url="store/exam/collection/relation" :group="false" :multiple="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title mr10">试题选项</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col>
            <!--  试题选项-->
            <div v-for="(options, index) in formValidate.option_item" :key="index" class="item-option">
              <el-form-item
                :prop="'option_item.' + index + '.title'"
                :rules="{ required: true, message: '答案不能为空', trigger: 'blur' }"
              >
                <div v-for="(item, indexs) in answerOptions" :key="indexs">
                  <el-checkbox
                    v-if="item.key === index"
                    :key="indexs"
                    v-model="options.is_check"
                    :label="'选项'+item.value"
                    :true-label="1"
                    :false-label="2"
                    style="margin-right: 10px;"
                    border
                  />
                </div>
                <el-input :model="options.check = index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : index === 3 ? 'D' : index === 4 ? 'E' : index === 5 ? 'F' : ''" style="display: none;" />
                <!-- <el-input v-model="options.title" placeholder="请输入" class="options" type="textarea" autosize />-->
                <ueditor-from v-model="options.title" class="options" :content="options.title" :ueditorFromHeight="'100'" />
                <el-button icon="el-icon-delete" class="item-options-del-btn" type="danger" @click.prevent="removeOptions(options)">移除</el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col>
            <el-form-item>
              <el-button type="primary" icon="el-icon-plus" @click="addOptions">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">其他设置</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col>
            <el-form-item label="显示状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio v-for="(item, index) in this.$store.getters.isShow" :key="index" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="试题解析：">
              <ueditor-from v-model="formValidate.analysis" :content="formValidate.analysis" :ueditorFromHeight="'100'" />
              <!--              <el-input v-model="formValidate.analysis" autosize type="textarea" />-->
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
// 内容
import { show, add, edit } from '@/api/exam/option'
// 试题分类
import { list as categoryList } from '@/api/exam/category'
// 试题知识点
import { list as knowledgeList } from '@/api/exam/knowledge'
// 试题试卷
import { list as collectionList } from '@/api/exam/collection'
import SelectPage from '@/components/SelectPage'
export default {
  name: 'SaveOption',
  components: { SelectPage, ueditorFrom },
  data() {
    const validateLevel = (rule, value, callback) => {
      if (this.formValidate.level) {
        callback()
      } else {
        callback(new Error('请选择试题难度'))
      }
    }
    return {
      answerOptions: [
        { key: 0, value: 'A' },
        { key: 1, value: 'B' },
        { key: 2, value: 'C' },
        { key: 3, value: 'D' },
        { key: 4, value: 'E' },
        { key: 5, value: 'F' }
      ],
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
        level: 1,
        tips_expend_score: 1.00,
        answer_income_score: 1.00,
        analysis: '',
        option_item: [
          {
            check: '',
            title: '',
            is_check: 2,
            uuid: '',
            option_uuid: ''
          }
        ],
        collection: [],
        tag: [],
        is_show: 1,
        category: []
      },
      ruleValidate: {
        title: [{ required: true, message: '请填写分类名称', trigger: 'blur' }],
        tips_expend_score: [{ required: true, message: '请填写解析消耗积分', trigger: 'blur' }],
        answer_income_score: [{ required: true, message: '请填写答案奖励积分', trigger: 'blur' }],
        level: [{ required: true, validator: validateLevel, trigger: 'blur' }]
      },
      tempRoute: {},
      collectionData: [], // 试题试卷
      knowledgeData: [], // 知识点
      categoryData: [] // 分类
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
    collectionList().then(res => {
      this.collectionData = res.data.items
    })
    knowledgeList().then(res => {
      this.knowledgeData = res.data.items
    })
    categoryList().then(res => {
      this.categoryData = res.data.items
    })
    this.tempRoute = Object.assign({}, this.$route)
    if (this.$route.params.uuid) {
      this.getDetails()
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push({ path: `/exam/library/option/list` })
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
        this.file_url = data.cover_file_info !== null ? data.cover_file_info.file_url + data.cover_file_info.file_name : ''
        this.formValidate = {
          uuid: data.uuid,
          file_uuid: data.file_uuid,
          title: data.title,
          tips_expend_score: data.tips_expend_score,
          answer_income_score: data.answer_income_score,
          is_show: data.is_show,
          level: data.level,
          category: data.category,
          tag: data.tag,
          collection: data.collection,
          option_item: data.option_item,
          analysis: data.analysis
        }
      })
      console.log(this.formValidate)
    },

    // 新增试题选项
    addOptions() {
      if (this.formValidate.option_item.length === 6) {
        return this.$message({ type: 'warning', message: '最多只能有六个选项' })
      }
      this.formValidate.option_item.push({
        check: '',
        title: '',
        is_check: 2,
        uuid: '',
        option_uuid: ''
      })
    },
    // 删除选项
    removeOptions(item) {
      const index = this.formValidate.option_item.indexOf(item)
      if (index !== -1) {
        this.formValidate.option_item.splice(index, 1)
      }
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

.el-checkbox.is-bordered.el-checkbox--medium {
  padding: 9px 20px 9px 10px;
}

.item-options-del-btn {
  height: 35px;
  margin-left: 20px;
}

</style>
