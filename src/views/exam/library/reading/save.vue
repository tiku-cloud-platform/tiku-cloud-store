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
            <el-form-item label="试题题目：" prop="title" label-for="title">
              <el-input v-model.trim="formValidate.title" type="textarea" autosize placeholder="请输入试题题目" maxlength="1000" style="width: 90%" />
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
              <el-button type="primary" @click="getCollectionList">选择试卷</el-button>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="视频链接：" prop="video_url" label-for="video_url">
              <el-input v-model.trim="formValidate.video_url" type="text" autosize placeholder="相关视频链接" maxlength="500" style="width: 90%" />
              <div class="input-alter">直接放入第三方平台的视频链接，支持.mp4格式。</div>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">其他设置</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="试题出处：" prop="source_author" label-for="source_author">
              <el-input v-model.trim="formValidate.source_author" placeholder="请输入" maxlength="32" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="试题链接：" prop="source_url" label-for="source_url">
              <el-input v-model.trim="formValidate.source_url" placeholder="请输入" maxlength="255" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="显示状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio v-for="item in this.$store.getters.isShow" :key="item.label" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="搜索状态：">
              <el-radio-group v-model="formValidate.is_search">
                <el-radio v-for="item in this.$store.getters.isSearch" :key="item.label" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
              <div class="input-alter">设置为显示状态，将在试题搜索页中展现；设置为禁用，则只会在时间的试题列表页中显示。</div>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title mr10">试题内容</span>
          <el-divider />
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="试题解析：">
              <el-input v-model="formValidate.analysis" autosize type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="试题描述：" prop="content">
              <ueditor-from v-model="formValidate.content" :content="formValidate.content" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
    </el-card>
    <!-- 试卷分类表格 -->
    <el-drawer
      title="试卷列表"
      :size="size"
      :visible.sync="drawer"
      :append-to-body="appendBody"
      :direction="direction"
    >
      <div class="clearfix" style="max-height:20%;">
        <el-form ref="searchForm">
          <el-row>
            <el-col :span="8" style="margin-left:20px;">
              <el-input v-model="listQuery.title" placeholder="请输入试卷名称" size="small" clearable />
            </el-col>
            <el-col :span="4" style="margin-left:10px;">
              <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="getCollectionList">搜索</el-button>
              <el-button icon="ios-search" label="default" class="mr15" size="small" @click="getCollectionListReset">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table
        ref="table"
        v-loading="listLoading"
        style="width: 100%;margin:10px;"
        :data="tableData.data"
        height="70%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="试卷编号" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.uuid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷分类" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.exam_category_info.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷名称" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面" width="70" align="center">
          <template slot-scope="scope">
            <viewer><img :src="scope.row.cover_file_info.file_url+scope.row.cover_file_info.file_name" width="50" height="50"></viewer>
          </template>
        </el-table-column>
        <el-table-column label="难易程度" width="130" align="center">
          <template slot-scope="{row}" style="display: flex">
            <span style="justify-content: center;display: flex;"><svg-icon v-for="n in + row.level" :key="n" style="float: left" icon-class="xingxing" class="meta-item__icon" /></span>
          </template>
        </el-table-column>
        <el-table-column label="答题人数" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.submit_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="答题时间" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.exam_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出题人" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核人" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.audit_author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="显示顺序" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.orders }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否推荐" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_recommend === 2" size="mini" type="text">否</el-button>
            <el-button v-if="row.is_recommend === 1" size="mini" type="text">是</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_show === 2" size="mini" type="text">禁用</el-button>
            <el-button v-if="row.is_show === 1" size="mini" type="text">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <pagination v-show="tableData.total>0" :page-size="1" :total="tableData.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getCollectionList" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import ueditorFrom from '@/components/ueditorFrom'
// 内容
import { show, add, edit } from '@/api/exam/reading'
// 试题分类
import { list as categoryList } from '@/api/exam/category'
// 试题知识点
import { list as knowledgeList } from '@/api/exam/knowledge'

// 试题试卷
import { list as collectionList } from '@/api/exam/collection'
import Pagination from '@/components/Pagination'
import { getName } from '@/utils/auth'
export default {
  name: 'SaveExamReading',
  components: { Pagination, ueditorFrom },
  data() {
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
      file_url: '',
      formValidate: {
        uuid: '',
        title: '',
        source_url: '',
        source_author: getName(),
        tips_expend_score: 1.00,
        answer_income_score: 1.00,
        analysis: '',
        level: 1,
        collection: [],
        tag: [],
        is_show: 1,
        is_search: 2,
        category: [],
        content: '',
        video_url: ''
      },
      ruleValidate: {
        title: [{ required: true, message: '请填写分类名称', trigger: 'blur' }],
        tips_expend_score: [{ required: true, message: '请填写解析消耗积分', trigger: 'blur' }],
        answer_income_score: [{ required: true, message: '请填写答案奖励积分', trigger: 'blur' }],
        level: [{ required: true, validator: validateLevel, trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'change' }]
      },
      tempRoute: {},
      knowledgeData: [], // 知识点
      categoryData: [], // 分类
      drawer: false, // 试卷弹窗显示信息
      direction: 'rtl',
      size: '80%',
      listQuery: {
        page: 1,
        size: 10,
        title: '',
        type: ''
      },
      tableData: {
        data: [],
        total: 0
      },
      listLoading: false,
      appendBody: true
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
    // 获取试卷分类列表
    getCollectionList() {
      this.drawer = true
      this.listLoading = true
      collectionList(this.listQuery).then(res => {
        console.log('试卷分类弹窗---')
        console.log('试卷分类弹窗', res)
        this.tableData.data = res.data.items
        this.tableData.total = res.data.total
        this.$nextTick(function() {
          for (let i = 0; i < this.tableData.data.length; i++) {
            if (this.formValidate.collection.indexOf(this.tableData.data[i].uuid) !== -1) {
              this.$refs.table.toggleRowSelection(this.tableData.data[i])
            }
          }
        })
      })
      this.listLoading = false
    },

    // 重置试卷分类筛选
    getCollectionListReset() {
      this.listQuery.title = ''
      this.getCollectionList()
    },
    // 试卷批量选中
    handleSelectionChange(selection) {
      this.formValidate.collection = []
      selection.forEach(element => {
        this.formValidate.collection.push(element.uuid)
      })
    },
    // 点击试卷搜索
    getList() {
      this.listLoading = true
      collectionList(this.listQuery).then(res => {
        this.tableData.data = res.data.items
        this.tableData.total = res.data.total
        this.listLoading = false
      })
    },
    // 返回
    back() {
      this.$router.push({ path: `/exam/library/reading/list` })
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
        this.formValidate = {
          uuid: data.uuid,
          title: data.title,
          tips_expend_score: data.tips_expend_score,
          answer_income_score: data.answer_income_score,
          is_show: data.is_show,
          level: data.level,
          category: data.category,
          tag: data.tag,
          collection: data.collection,
          analysis: data.analysis,
          content: data.content,
          source_url: data.source_url,
          source_author: data.source_author,
          video_url: data.video_url,
          is_search: data.is_search
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

.el-checkbox.is-bordered.el-checkbox--medium {
  padding: 9px 20px 9px 10px;
}

.options {
  width: 30%;
  margin-right: 10px;
}
</style>
