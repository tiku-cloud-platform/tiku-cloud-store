<template>
  <el-card class="box-card">
    <router-link to>
      <el-button
        icon="el-icon-arrow-left"
        size="mini"
        class="pan-back-btn"
        style="margin-bottom: 20px;"
        @click="$router.back(-1)"
      >返回
      </el-button>
    </router-link>
    <el-form ref="attacheForm" :model="attacheForm" :rules="ruleValidate" label-width="80px">
      <div class="dividerTitle">
        <span class="title">基础信息</span>
        <el-divider />
      </div>
      <el-row :gutter="10">
        <el-col v-bind="grid">
          <el-form-item label="附件分类" prop="cate_uuid">
            <el-cascader
              v-model="attacheForm.cate_uuid"
              :options="categoryData"
              :props="{ expandTrigger: 'hover' }"
              style="width: 100%"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="grid">
          <el-form-item label="附件名称" prop="title">
            <el-input v-model="attacheForm.title" aria-required="true" show-word-limit clearable style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col v-bind="grid">
          <el-form-item label="是否显示" prop="is_show">
            <el-radio-group v-model="attacheForm.is_show" style="width: 100%;">
              <el-radio v-for="(item, index) in this.$store.getters.isShow" :key="index" :label="item.value">
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col v-bind="grid">
          <el-form-item label="附件类型" prop="type">
            <el-select v-model="attacheForm.type" placeholder="请选择附件类型" style="width: 100%;">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-bind="grid">
          <el-form-item label="显示顺序" prop="orders">
            <el-input-number
              v-model="attacheForm.orders"
              :min="1"
              :max="100000000"
              label="显示顺序"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="grid">
          <el-form-item label="下载次数" prop="download_number">
            <el-input-number
              v-model="attacheForm.download_number"
              :min="0"
              :max="100000000"
              label="现在次数"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="grid">
          <el-form-item label="附件链接" prop="content">
            <el-input
              v-model="attacheForm.content"
              type="textarea"
              aria-required="true"
              show-word-limit
              clearable
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="grid">
          <el-form-item label="附件封面" prop="file_uuid">
            <div class="upLoadPicBox" @click="modalPicTap('1')">
              <div v-if="attacheForm.file_uuid" class="pictrue"><img :src="attacheForm.file_url"></div>
              <div v-else class="upLoad">
                <i class="el-icon-camera cameraIconfont" />
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="dividerTitle">
        <span class="title">附件描述</span>
        <el-divider />
      </div>
      <el-form-item label="附件描述" prop="attache_content">
        <ueditor-from
          v-model="attacheForm.attache_content"
          :content="attacheForm.attache_content"
          style="width: 90%;"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('attacheForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import ueditorFrom from '@/components/ueditorFrom'
import { add, edit, show } from '@/api/attache/content'
import { treeAll } from '@/api/attache/cate'

export default {
  name: 'AttacheAdd',
  components: { ueditorFrom },
  data() {
    return {
      grid: {
        xl: 10,
        lg: 10,
        md: 10,
        sm: 24,
        xs: 24
      },
      categoryData: [],
      typeList: [
        { label: 'Word文档', value: 1 },
        { label: 'PDF文档', value: 2 },
        { label: '视频文档', value: 3 },
        { label: '网站文档', value: 4 },
        { label: '工具文档', value: 5 },
        { label: '其他文档', value: 6 }
      ],
      attacheForm: {
        file_uuid: '',
        cate_uuid: '',
        title: '',
        content: '',
        is_show: 1,
        orders: 1,
        uuid: '',
        type: 6,
        file_url: '',
        download_number: 0,
        attache_content: ''
      },
      ruleValidate: {
        file_uuid: [{ required: true, message: '请上传附件封面', trigger: 'blur' }],
        title: [{ required: true, message: '请输入附件名称', trigger: 'blur' }],
        attache_content: [{ required: true, message: '请输入附件描述', trigger: 'blur' }],
        cate_uuid: [{ required: true, message: '请选择附件类型', trigger: 'blur' }],
        content: [{ required: true, message: '请填写附件内容', trigger: 'blur' }],
        is_show: [{ required: true, message: '请选择附件显示状态', trigger: 'blur' }],
        type: [{ required: true, message: '请选择附件类型', trigger: 'blur' }],
        orders: [{ required: true, message: '请选择附件显示顺序', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.$route.params.uuid) {
      this.attacheForm.uuid = this.$route.params.uuid
      this.getShow()
    }
    this.getCateTree()
  },
  methods: {
    // 创建提交
    onSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.attacheForm.uuid) {
            edit(this.attacheForm).then(res => {
              if (res.code === 1000) {
                this.$message.success('更新成功')
                this.$router.go(-1)
                return
              }
              this.$message.error('更新失败')
            })
          } else {
            add(this.attacheForm).then(res => {
              if (res.code === 1000) {
                this.$message.success('创建成功')
                this.$router.go(-1)
                return
              }
              this.$message.error('创建失败')
            })
          }
        } else {
          return false
        }
      })
    },
    getShow() {
      show({ uuid: this.attacheForm.uuid }).then(res => {
        this.attacheForm = res.data
        this.attacheForm.file_url = res.data.cover.file_url + res.data.cover.file_name
      })
    },
    // 选择附件分类
    handleChange(value) {
      if (value.length !== 1) {
        this.attacheForm.cate_uuid = value[1] // 有子集就返回第二个值
      } else {
        this.attacheForm.cate_uuid = value[0] // 没子集就是第一个值
      }
    },
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.attacheForm.file_uuid = img.file_uuid
        _this.attacheForm.file_url = img.file_url
      }, tit)
    },
    // 获取附件分类
    getCateTree() {
      treeAll().then(res => {
        const data = res.data
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
        this.categoryData = newArr
      })
    }
  }
}
</script>
