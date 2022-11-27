<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchFrom" :model="listQuery" inline size="small" label-position="right">
            <el-row>
              <el-col :span="24">
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="配置key：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入配置key" clearable />
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="配置值：" prop="value">
                    <el-input v-model="listQuery.value" placeholder="请输入配置值" clearable />
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="配置描述：" prop="describe">
                    <el-input v-model="listQuery.describe" placeholder="请输入配置描述" clearable />
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item>
                  <el-button v-prevent-re-click type="primary" icon="el-icon-search" label="default" class="mr15" size="small" @click="search">搜索</el-button>
                  <el-button class="ResetSearch mr10" size="small" @click="resetForm('searchFrom')">重置</el-button>
                  <!-- <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button> -->
                  <!-- <el-button type="danger" icon="el-icon-delete" @click="handleBatchDel">删除</el-button> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        style="width: 100%;"
        border
        empty-text="暂无数据"
        show-header
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="配置KEY" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="配置值" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="配置描述" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.describe }}</span>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
      <!-- <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width"> -->
        <!-- <template slot-scope="{row,$index}"> -->
        <!-- <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button> -->
        <!-- <el-button size="mini" type="danger" @click="handleDelete(row, $index)">删除</el-button> -->
        <!-- </template> -->
      <!-- </el-table-column> -->
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
    <!--数据弹窗-->
    <el-dialog :title="winTitle[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="auto">
        <el-form-item label="配置key" prop="title">
          <el-input v-model="temp.title" placeholder="请输入配置key" />
        </el-form-item>
        <el-form-item label="配置值" prop="value">
          <el-input v-model="temp.value" placeholder="请输入配置值" />
        </el-form-item>
        <el-form-item label="配置描述" prop="describe">
          <el-input v-model="temp.describe" placeholder="请输入配置描述" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, del, add, edit } from '@/api/system/const'
import Pagination from '@/components/Pagination'
export default {
  name: 'Constant',
  components: { Pagination },
  data() {
    return {
      // 批量删除选中id
      selectionDelList: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      txTrueVideoUrl: null,
      listQuery: {
        page: 1,
        size: 10,
        title: '',
        describe: '',
        value: ''
      },
      winTitle: {
        update: '修改',
        create: '添加'
      },
      dialogPvVisible: false,
      dialogFormVisible: false,
      dialogChannel: false,
      dialogStatus: '',
      collapse: false,
      grid: {
        xl: 8,
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      },
      temp: {
        title: '',
        value: '',
        describe: ''
      },
      rules: {
        title: [{ required: true, message: '请输入配置key', trigger: 'blur' }],
        value: [{ required: true, message: '请输入配置值', trigger: 'blur' }],
        describe: [{ required: true, message: '请输入配置描述', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 搜索
    search() {
      this.listQuery.page = 1
      this.getList()
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.getList()
    },
    // 批量选择时触发
    handleSelectionChange(selection) {
      this.selectionDelList = []
      selection.forEach(element => {
        this.selectionDelList.push(element.uuid)
        console.log(this.selectionDelList)
      })
    },
    // 批量删除
    handleBatchDel() {
      if (this.selectionDelList.length <= 0) {
        this.$message({
          message: '未选择数据',
          type: 'warning'
        })
        return
      }
    },
    // 删除
    handleDelete(row, index) {
      console.log(row.uuid)
      this.$modalSure().then(() => {
        del(row.uuid).then((res) => {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.total = this.total -= 1
          this.list.splice(index, 1)
        })
      })
    },
    // 添加弹窗
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.$refs['dataForm'].resetFields()
      })
    },

    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '上传中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          add(this.temp).then(res => {
            this.$message({
              message: res.message,
              type: 'success'
            })
          })
          loading.close()
          this.getList()
          this.dialogFormVisible = false
        }
      })
    },

    // 修改弹窗
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '修改中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          edit(this.temp).then(res => {
            this.$message({
              message: res.message,
              type: 'success'
            })
          })
          loading.close()
          this.getList()
          this.dialogFormVisible = false
        }
      })
    }
  }
}
</script>

<style scoped>
.el-col-xl-18 {
  width: 57%;
}
::v-deep .el-card__body {
  padding: 0 !important;
}
.el-dialog {
  width: 550px;
}

</style>
