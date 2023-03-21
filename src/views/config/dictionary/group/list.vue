<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline size="small" label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="分组名称：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入" size="small" clearable />
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="分组状态：" prop="is_show">
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
                <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="getList">
                  搜索
                </el-button>
                <el-button class="ResetSearch mr10" size="small" @click="reset()">重置</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item>
                  <el-button size="small" type="primary" class="mr10" @click="addDialog">添加分组</el-button>
                  <el-button type="danger" @click="handleBatchDel">删除分组</el-button>
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
        border
        show-header
        stripe
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="分组名称" align="center">
          <template slot-scope="{row}">
            {{ row.title }}
          </template>
        </el-table-column>
        <el-table-column label="分组code" prop="code" align="center">
          <template slot-scope="{row}">
            {{ row.code }}
          </template>
        </el-table-column>
        <el-table-column label="启用状态" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_show === 2" size="mini" type="text" class="show-disable-text">禁用</el-button>
            <el-button v-if="row.is_show === 1" size="mini" type="text" class="show-enable-text">启用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="分组类型" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_system === 2" size="mini" type="text">自定义</el-button>
            <el-button v-if="row.is_system === 1" size="mini" type="text" style="color: #A5A8AD;">系统定义</el-button>
          </template>
        </el-table-column>
        <el-table-column label="分组描述" prop="remark" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            {{ row.remark }}
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
            <router-link :to="{path: '/setting/dict/dict/list/'+row.uuid}">
              <el-button type="text" size="mini" style="color: #e6a23c;" class="mr10">字典
              </el-button>
            </router-link>
            <el-button
              v-if="row.is_system === 2"
              size="mini"
              type="text"
              @click="editForm(row)"
            >编辑
            </el-button>
            <el-button
              v-if="row.is_system === 1"
              size="mini"
              type="text"
              style="color:#A5A8AD"
              :disabled="true"
              @click="editForm(row)"
            >编辑
            </el-button>
            <el-button
              v-if="row.is_system === 2"
              size="mini"
              type="text"
              style="color:red"
              @click="handleDelete(row, $index)"
            >删除
            </el-button>
            <el-button
              v-if="row.is_system === 1"
              size="mini"
              type="text"
              style="color:#A5A8AD"
              :disabled="true"
              @click="handleDelete(row, $index)"
            >删除
            </el-button>
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

    <!--    分组弹窗开始-->
    <div>
      <el-dialog
        title="字典分组操作"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="form" label-width="80px" :rules="rulesForm">
          <el-form-item prop="title" label="分组名称">
            <el-input
              v-model="form.title"
              placeholder="请输入分组名称"
              maxlength="32"
              show-word-limit
              :clearable="true"
            />
          </el-form-item>
          <el-form-item label="分组标识" prop="code">
            <el-input
              v-model="form.code"
              placeholder="请输入分组标识"
              maxlength="20"
              :clearable="true"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="启用状态" prop="is_show">
            <el-radio-group v-model="form.is_show">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分组描述" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              placeholder="请输入分组描述信息"
              maxlength="50"
              show-word-limit
              :clearable="true"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('form')">重 置</el-button>
          <el-button type="primary" @click="onsubmit('form')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!--    分组弹窗结束-->
  </div>
</template>

<script>
import { list, del, add, edit } from '@/api/dict/group'
import Pagination from '@/components/Pagination'

const validGroupCode = (rule, value, callback) => {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/
  if (!reg.test(value)) {
    callback(new Error('分组标识必须是由4-20位字母+数字组合'))
  } else {
    callback()
  }
}

export default {
  name: 'UserGroupList',
  components: { Pagination },
  data() {
    return {
      // 弹窗设置
      dialogVisible: false,
      // 查询条件
      listQuery: {
        page: 1,
        size: 20,
        title: '',
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
      positionData: [], // 显示位置
      typeData: [], // 跳转类型
      // 表单数据绑定
      form: {
        uuid: '',
        title: '',
        code: '',
        is_show: 2,
        resource: '',
        remark: ''
      },
      // 表单验证规则
      rulesForm: {
        code: [
          { required: true, message: '分组标识不能为空', trigger: 'blur' },
          { validator: validGroupCode, trigger: 'blur' }
        ],
        title: [
          { required: true, message: '分组名称不能为空', trigger: 'blur', max: 20 }
        ]
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
    // 列表
    getList() {
      this.listLoading = true
      list(this.listQuery).then(res => {
        this.tableData.data = res.data.items
        this.tableData.total = res.data.total
        this.listLoading = false
      })
    },
    // 表单修改回显
    editForm(row) {
      this.form = row
      this.dialogVisible = true
    },
    // 删除
    handleDelete(row, idx) {
      if (row.is_system === 1) {
        this.$message.warning('系统定义类型无法进行删除操作')
        return
      }
      this.$modalSure().then(() => {
        del({ uuid: row.uuid }).then(res => {
          this.$message({ message: res.message, type: 'success' })
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
        del({ uuid: this.selectionDelList.join(',') }).then(res => {
          this.$message({ message: res.message, type: 'success' })
        })
        this.getList()
      })
    },
    // 提交数据
    onsubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.form.uuid) {
            edit(this.form).then(async message => {
              this.form.uuid = ''
              this.$message.success(message)
              this.handleClose()
            })
          } else {
            add(this.form).then((message) => {
              this.$message.success(message)
              this.handleClose()
            })
          }
        } else {
          return false
        }
      })
    },
    // 显示添加弹窗
    addDialog() {
      this.dialogVisible = true
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false
      this.$refs['form'].resetFields()
      this.getList()
    },
    // 重置表单数据
    resetForm(fromName) {
      this.$refs[fromName].resetFields()
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
