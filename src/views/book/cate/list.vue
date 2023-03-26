<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline label-position="right">
            <el-row>
              <el-col :span="24">
                <el-col v-bind="grid" style="width: auto;">
                  <el-form-item label="分类名称：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入分类名称" size="small" clearable />
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width: auto;">
                  <el-form-item label="显示状态：" prop="is_show">
                    <el-select v-model="listQuery.is_show" clearable placeholder="请选择">
                      <el-option
                        v-for="item in this.$store.getters.isShow"
                        :key="item.key"
                        :value="item.value"
                        :label="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width: auto;">
                  <el-form-item label="是否推荐：" prop="is_home">
                    <el-select v-model="listQuery.is_home" clearable placeholder="请选择">
                      <el-option
                        v-for="item in this.$store.getters.isShow"
                        :key="item.key"
                        :value="item.value"
                        :label="item.label"
                      />
                    </el-select>
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
                  <el-button size="small" type="primary" class="mr10" @click="showFrom">添加分类</el-button>
                  <el-button type="danger" @click="handleBatchDel">删除分类</el-button>
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
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :tree-props="{children: 'children'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="分类名称" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="显示顺序" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.orders }}</span>
          </template>
        </el-table-column>
        <el-table-column label="首页推荐" width="auto" align="center">
          <template slot-scope="{row}">
            <span v-if="row.is_home === 2" class="show-disable-text">否</span>
            <span v-if="row.is_home === 1" class="show-enable-text">是</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="auto" align="center">
          <template slot-scope="{row}">
            <span v-if="row.is_show === 2" class="show-disable-text">禁用</span>
            <span v-if="row.is_show === 1" class="show-enable-text">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.creator !== null ? row.creator.name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="text" size="mini" class="mr10" @click="editForm(row)">编辑</el-button>
            <el-button size="mini" type="text" style="color:red;" @click="handleDelete(row, $index)">删除</el-button>
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
      title="章节目录设置"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="bookCategoryTemp" :model="bookCategoryTemp" :rules="ruleValidate" label-width="80px">
        <el-form-item label="上级分类" prop="parent_uuid">
          <el-select v-model="bookCategoryTemp.parent_uuid" placeholder="请选择上级分类" style="width: 100%;" clearable>
            <el-option
              v-for="item in categoryParentAll"
              :key="item.uuid"
              :label="item.title"
              :value="item.uuid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="title">
          <el-input v-model="bookCategoryTemp.title" aria-required="true" show-word-limit clearable style="width: 100%;" />
        </el-form-item>
        <el-form-item label="是否显示：" prop="is_show">
          <el-radio-group v-model="bookCategoryTemp.is_show">
            <el-radio v-for="(item, index) in this.$store.getters.isShow" :key="index" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="首页推荐：" prop="is_home">
          <el-radio-group v-model="bookCategoryTemp.is_home">
            <el-radio v-for="(item, index) in this.$store.getters.isShow" :key="index" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分类排序" prop="orders">
          <el-input-number v-model="bookCategoryTemp.orders" :min="1" :max="10000" label="分类排序" style="width: 100%;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('bookCategoryTemp')">提交</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { list, del, add, edit, parentAll } from '@/api/book/cate'
import Pagination from '@/components/Pagination'
export default {
  name: 'BookCate',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        size: 20,
        title: '',
        is_home: '',
        is_show: ''
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
      // 批量删除选中id
      selectionDelList: [],
      dialogVisible: false,
      categoryParentAll: [],
      bookCategoryTemp: {
        store_book_uuid: '',
        parent_uuid: null,
        title: '',
        is_show: 1,
        orders: 1,
        uuid: '',
        is_home: 2
      },
      ruleValidate: {
        title: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    reset() {
      this.$refs['searchForm'].resetFields()
      this.getList()
    },
    // 显示弹窗
    showFrom() {
      parentAll().then(res => {
        this.categoryParentAll = res.data
      })
      this.dialogVisible = true
    },
    editForm(row) {
      parentAll().then(res => {
        this.categoryParentAll = res.data
      })
      this.bookCategoryTemp = row
      this.dialogVisible = true
    },
    handleClose() {
      this.bookCategoryTemp = {}
      this.dialogVisible = false
    },
    // 创建提交
    onSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.bookCategoryTemp.uuid) {
            edit(this.bookCategoryTemp).then(res => {
              if (res.code === 1000) {
                this.$message.success('更新成功')
                this.getList()
                this.handleClose()
                return
              }
              this.$message.error('更新失败')
            })
          } else {
            add(this.bookCategoryTemp).then(res => {
              if (res.code === 1000) {
                this.$message.success('创建成功')
                this.getList()
                this.handleClose()
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
    // 列表
    getList() {
      this.listLoading = true
      list(this.listQuery).then(res => {
        this.tableData.data = res.data.items
        this.tableData.total = res.data.total
        this.listLoading = false
      })
    },
    // 删除
    handleDelete(row, idx) {
      this.$modalSure().then(() => {
        del(row.uuid).then(res => {
          this.$message({ message: res.message, type: 'success' })
        })
        this.getList()
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
.mr10 {
  margin-right: 10px;
}

::v-deep .el-card__body {
  padding: 0 !important;
}

.el-col-lg-12 {
  width: 30%;
}
</style>
