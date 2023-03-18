<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline size="small" label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width:auto">
                  <el-form-item label="附件名称：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入附件名称" size="small" clearable />
                  </el-form-item>
                </el-col>
                <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="getList">
                  搜索
                </el-button>
                <el-button class="ResetSearch mr10" size="small" @click="reset()">重置</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item>
                  <router-link :to="{path: '/book/attache/cate/list'}">
                    <el-button size="small" type="primary" class="mr10">附件分类</el-button>
                  </router-link>
                  <el-button size="small" type="primary" class="mr10" @click="showAttacheForm">添加附件</el-button>
                  <el-button type="danger" size="small" @click="handleBatchDel">删除附件</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="small"
        row-key="uuid"
        border
        empty-text="暂无数据"
        show-header
        stripe
        fixed="right"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :tree-props="{children: 'children'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column label="封面" width="70" align="center">
          <template slot-scope="scope">
            <viewer v-if="scope.row.cover != null"><img
              :src="scope.row.cover.file_url+scope.row.cover.file_name"
              width="20"
              height="20"
            ></viewer>
          </template>
        </el-table-column>
        <el-table-column label="分类" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.cate != null ? row.cate.title : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" width="200" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="内容" width="200" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <svg-icon
              icon-class="copy"
              style="font-size: 20px; cursor: pointer"
              @click="copyChannelId(row.content)"
            />
            <span>{{ row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下载次数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.download_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <span v-if="row.is_show === 2" class="show-disable-text">禁用</span>
            <span v-if="row.is_show === 1" class="show-enable-text">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="150" align="center">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.creator !== null ? row.creator.name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="auto" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="{row,$index}">
            <el-button type="text" size="mini" class="mr10" @click="showEditForm(row)">编辑</el-button>
            <el-button size="mini" type="text" style="color: red" @click="handleDelete(row, $index)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <pagination
          v-show="tableData.total>0"
          :total="tableData.total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.size"
          @pagination="getList"
        />
      </div>
    </el-card>

    <el-dialog
      title="附件内容设置"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="attacheForm" :model="attacheForm" :rules="ruleValidate" label-width="80px">
        <el-form-item label="附件封面" prop="file_uuid">
          <div class="upLoadPicBox" @click="modalPicTap('1')">
            <div v-if="attacheForm.file_uuid" class="pictrue"><img :src="attacheForm.file_url"></div>
            <div v-else class="upLoad">
              <i class="el-icon-camera cameraIconfont" />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="附件分类" prop="cate_uuid">
          <el-cascader
            v-model="attacheForm.cate_uuid"
            :options="categoryData"
            :props="{ expandTrigger: 'hover' }"
            style="width: 100%"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="附件名称" prop="title">
          <el-input v-model="attacheForm.title" aria-required="true" show-word-limit clearable style="width: 100%;" />
        </el-form-item>
        <el-form-item label="附件内容" prop="content">
          <el-input v-model="attacheForm.content" type="textarea" aria-required="true" show-word-limit clearable style="width: 100%;" />
        </el-form-item>
        <el-form-item label="是否显示" prop="is_show">
          <el-radio-group v-model="attacheForm.is_show">
            <el-radio v-for="(item, index) in this.$store.getters.isShow" :key="index" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
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
        <el-form-item label="显示顺序" prop="orders">
          <el-input-number v-model="attacheForm.orders" :min="1" :max="100000000" label="显示顺序" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="下载次数" prop="download_number">
          <el-input-number v-model="attacheForm.download_number" :min="0" :max="100000000" label="现在次数" style="width: 100%;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('attacheForm')">提交</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { list, del, add, edit } from '@/api/attache/content'
import Pagination from '@/components/Pagination'
import { treeAll } from '@/api/attache/cate'
export default {
  name: 'AttacheCate',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        title: '',
        category_uuid: ''
      },
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      grid: {
        xl: 8,
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      },
      typeList: [
        { label: 'Word文档', value: 1 },
        { label: 'PDF文档', value: 2 },
        { label: '视频文档', value: 3 },
        { label: '网站文档', value: 4 },
        { label: '工具文档', value: 5 },
        { label: '其他文档', value: 6 }
      ],
      dialogVisible: false,
      // 批量删除选中id
      selectionDelList: [],
      categoryData: [],
      sleOptions: {
        title: '',
        uuid: ''
      },
      defaultProps: [],
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
        download_number: 0
      },
      ruleValidate: {
        file_uuid: [{ required: true, message: '请上传附件封面', trigger: 'blur' }],
        title: [{ required: true, message: '请输入附件名称', trigger: 'blur' }],
        cate_uuid: [{ required: true, message: '请选择附件类型', trigger: 'blur' }],
        content: [{ required: true, message: '请填写附件内容', trigger: 'blur' }],
        is_show: [{ required: true, message: '请选择附件显示状态', trigger: 'blur' }],
        type: [{ required: true, message: '请选择附件类型', trigger: 'blur' }],
        orders: [{ required: true, message: '请选择附件显示顺序', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
      this.$refs['attacheForm'].resetFields()
    },
    showAttacheForm() {
      this.dialogVisible = true
      this.getCateTree()
    },
    showEditForm(row) {
      this.dialogVisible = true
      this.getCateTree()
      this.attacheForm = row
      this.attacheForm.file_url = row.cover.file_url + row.cover.file_name
    },
    // 复制链接地址
    copyChannelId(id) {
      (function() {
        document.oncopy = function(e) {
          e.clipboardData.setData('text', id)
          e.preventDefault()
          document.oncopy = null
        }
      })(id)
      document.execCommand('Copy')
      this.$message.success('复制成功')
    },
    // 创建提交
    onSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.attacheForm.uuid) {
            edit(this.attacheForm).then(res => {
              if (res.code === 1000) {
                this.$message.success('更新成功')
                this.getList()
                this.handleClose()
                this.attacheForm.uuid = ''
                this.$refs['attacheForm'].resetFields()
                return
              }
              this.$message.error('更新失败')
            })
          } else {
            add(this.attacheForm).then(res => {
              if (res.code === 1000) {
                this.$message.success('创建成功')
                this.getList()
                this.handleClose()
                this.$refs['attacheForm'].resetFields()
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
    // 选择附件分类
    handleChange(value) {
      if (value.length !== 1) {
        this.attacheForm.cate_uuid = value[1] // 有子集就返回第二个值
      } else {
        this.attacheForm.cate_uuid = value[0] // 没子集就是第一个值
      }
    },
    reset() {
      this.$refs['searchForm'].resetFields()
      this.getList()
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
    },
    // 列表
    getList() {
      this.listLoading = true
      list(this.listQuery).then(res => {
        this.tableData.data = res.data.items
        this.tableData.total = res.data.total
        this.listLoading = false
      })
    },
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.attacheForm.file_uuid = img.file_uuid
        _this.attacheForm.file_url = img.file_url
      }, tit)
    },
    // 删除
    handleDelete(row, idx) {
      this.$modalSure().then(() => {
        del(row.uuid).then(res => {
          this.$message({ message: res.message, type: 'success' })
          this.tableData.data.splice(idx, 1)
          this.tableData.total -= 1
          this.getList()
        })
      })
    },
    // 批量选择时触发
    handleSelectionChange(selection) {
      this.selectionDelList = []
      selection.forEach(element => {
        this.selectionDelList.push(element.uuid)
      })
    },
    // 批量删除
    handleBatchDel() {
      if (this.selectionDelList.length <= 0) {
        return this.$message({
          message: '未选择数据',
          type: 'warning'
        })
      }
      this.$modalSure().then(() => {
        del(this.selectionDelList.join(',')).then(res => {
          this.$message({ message: res.message, type: 'success' })
        })
        this.getList()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.selWidth {
  width: 300px;
}

::v-deep .el-card__body {
  padding: 0 !important;
}

.mr10 {
  margin-right: 10px;
}
</style>

