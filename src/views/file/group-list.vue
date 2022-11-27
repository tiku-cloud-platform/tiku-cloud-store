<template>
  <div class="divBox">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchFrom" :model="listQuery" inline size="small" label-position="left">
            <el-row>
              <el-col style="width: auto;">
                <el-form-item label="名称：">
                  <el-input v-model="listQuery.title" placeholder="请输入名称" clearable />
                </el-form-item>
                <el-form-item>
                  <el-button v-prevent-re-click type="primary" label="default" class="mr15" size="small" @click="search">搜索</el-button>
                  <el-button class="ResetSearch mr10" size="small" @click="resetForm('searchFrom')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-bind="grid" :span="5">
                <el-form-item>
                  <el-button type="success"  @click="handleCreate">添加</el-button>
                  <el-button type="danger" @click="handleBatchDel">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <el-table
        :key="tableKey"
        ref="store"
        empty-text="暂无数据"
        show-header
        border
        v-loading="listLoading"
        :data="list"
        row-key="uuid"
        :tree-props="{children: 'children'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_show === 2" size="mini" type="text">禁用</el-button>
            <el-button v-if="row.is_show === 1" size="mini" type="text">启用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="text" size="mini" @click="handleUpdate(row)">修改</el-button>
            <el-button size="mini" type="text" @click="handleDelete(row, $index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>

    <!--数据弹窗-->
    <el-dialog :title="winTitle[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="auto">
        <el-form-item label="上级分组">
          <el-select v-model="temp.parent_uuid" placeholder="请选择" style="width: 300px;">
            <el-option key="" label="请选择" value="" />
            <el-option
              v-for="item in optionData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分组名称" prop="title">
          <el-input v-model="temp.title" clearable placeholder="请填写分组名称" style="width: 300px;" />
        </el-form-item>
        <el-form-item label="显示状态">
          <el-radio v-for="item in this.$store.getters.isShow" :key="item.key" v-model="temp.is_show" :label="item.value">{{ item.label }}</el-radio>
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
import { list, add, edit, del } from '@/api/file/group'
import Pagination from '@/components/Pagination'
export default {
  name: 'GroupList',
  components: { Pagination },
  data() {
    return {
      options: [],
      // 批量删除选中id
      selectionDelList: [],
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        title: ''
      },
      winTitle: {
        update: '修改',
        create: '添加'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      grid: {
        xl: 8,
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      },
      temp: {
        uuid: null,
        title: '',
        parent_uuid: '',
        is_show: 1
      },
      rules: {
        title: [{ required: true, message: '请填写分组名称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    optionData() {
      const cloneData = JSON.parse(JSON.stringify(this.list))
      if (cloneData !== null) {
        const newArr = []
        cloneData.forEach(item => {
          newArr.push({
            value: item.uuid,
            label: item.title
          })
        })
        return newArr
      }
      return []
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
    },
    // 删除
    handleDelete(row, index) {
      this.$modalSure().then(() => {
        del(row.uuid).then(res => {
          this.$message({ message: res.message, type: 'success' })
        })
        this.getList()
      })
    },

    // 添加弹窗
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.temp.title = ''
      this.temp.parent_uuid = ''
      this.temp.is_show = 1
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
            this.getList()
            this.dialogFormVisible = false
          })
          loading.close()
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
      // 判断当前分组是否把自己设为上级分组
      if (this.temp.uuid === this.temp.parent_uuid) {
        return this.$message({ message: '当前分组不能设置此上级分组', type: 'warning' })
      }
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
            this.getList()
            this.dialogFormVisible = false
          })
          loading.close()
        }
      })
    }
  }
}
</script>

<style scoped>
::v-deep .el-card__body {
  padding: 0 !important;
}

.el-dialog {
  width: 550px;
}
</style>
