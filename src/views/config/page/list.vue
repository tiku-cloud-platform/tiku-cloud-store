<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form
            ref="searchFrom"
            :model="listQuery"
            inline
            size="small"
            label-position="right"
          >
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="显示位置：" prop="type">
                    <el-select
                      v-model="listQuery.type"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in typeData"
                        :key="item.value"
                        :value="item.value"
                        :label="item.title"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="页面名称：" prop="title">
                    <el-input
                      v-model="listQuery.title"
                      placeholder="请输入页面名称"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="页面路径：" prop="path">
                    <el-input
                      v-model="listQuery.path"
                      placeholder="请输入页面路径"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="5">
                <el-form-item>
                  <el-button
                    v-prevent-re-click
                    type="primary"
                    icon="el-icon-search"
                    label="default"
                    class="mr15"
                    size="small"
                    @click="search"
                  >搜索</el-button>
                  <el-button
                    class="ResetSearch mr10"
                    size="small"
                    @click="resetForm('searchFrom')"
                  >重置</el-button>
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
        empty-text="暂无数据"
        highlight-current-row
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="所属平台" width="auto" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="页面名称" width="auto" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="页面路径"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.path }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width"> -->
        <!-- <template slot-scope="{row,$index}"> -->
        <!-- <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button> -->
        <!-- <el-button size="mini" type="danger" @click="handleDelete(row, $index)">删除</el-button> -->
        <!-- </template> -->
        <!-- </el-table-column> -->
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.size"
        @pagination="getList"
      />
    </el-card>
  </div>
</template>

<script>
import { list } from '@/api/system/page'
import Pagination from '@/components/Pagination'
export default {
  name: 'Page',
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
      typeData: [
        { title: '微信小程序', value: 1 },
        { title: '微信公众号', value: 2 },
        { title: 'H5网页', value: 3 }
      ],
      listQuery: {
        page: 1,
        size: 10,
        type: '',
        title: '',
        path: ''
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
        describe: [
          { required: true, message: '请输入配置描述', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.listQuery).then((response) => {
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
    }
  }
}
</script>

<style>
.el-col-xl-18 {
  width: 57%;
}

.el-dialog {
  width: 550px;
}
</style>
