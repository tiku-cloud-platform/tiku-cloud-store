<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width: auto;">
                  <el-form-item label="分类名称：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入分类名称" size="small" clearable />
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width: auto;">
                  <el-form-item label="显示状态：" prop="is_show">
                    <el-select v-model="listQuery.is_show" clearable placeholder="请选择">
                      <el-option v-for="item in this.$store.getters.isShow" :key="item.key" :value="item.value" :label="item.label" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width: auto;">
                  <el-form-item label="是否推荐：" prop="is_recommend">
                    <el-select v-model="listQuery.is_recommend" clearable placeholder="请选择">
                      <el-option v-for="item in this.$store.getters.isRecommend" :key="item.key" :value="item.value" :label="item.label" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="getList">搜索</el-button>
                <el-button class="ResetSearch mr10" size="small" @click="reset()">重置</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item>
                  <router-link :to="{path: '/exam/category/save'}">
                    <el-button size="small" type="success" class="mr10">添加</el-button>
                  </router-link>
                  <el-button type="danger" @click="handleBatchDel">删除</el-button>
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
        <!-- <el-table-column label="编号" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.uuid }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="分类名称" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类描述" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="显示顺序" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.orders }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否推荐" width="auto" align="center">
          <template slot-scope="{row}">
            <span v-if="row.is_recommend === 2" class="show-disable-text">否</span>
            <span v-if="row.is_recommend === 1">是</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="auto" align="center">
          <template slot-scope="{row}">
            <span v-if="row.is_show === 2" class="show-disable-text">禁用</span>
            <span v-if="row.is_show === 1">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <router-link :to="{path: '/exam/category/save/'+row.uuid}">
              <el-button type="text" size="mini" class="mr10">编辑</el-button>
            </router-link>
            <el-button size="mini" type="text" style="color:red;" @click="handleDelete(row, $index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <pagination v-show="tableData.total>0" :total="tableData.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { list, del } from '@/api/exam/category'
import Pagination from '@/components/Pagination'
export default {
  name: 'ExamCategory',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        size: 20,
        title: '',
        is_recommend: '',
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
      selectionDelList: []
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
      })
      this.listLoading = false
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
