<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchFrom" inline size="small" label-position="right">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="标题：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入" size="small" clearable />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                <el-form-item>
                  <el-button type="primary" icon="ios-search" label="default" class="mr10" size="small" @click="getList">搜索</el-button>
                  <el-button class="ResetSearch mr10" size="small" @click="resetForm()">重置</el-button>
                  <router-link :to="{path: '/message/subscribe/wechat/save'}">
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="标题" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="模板图标" width="70" align="center">
          <template slot-scope="scope">
            <viewer><img :src="scope.row.cover_file_info.file_url+scope.row.cover_file_info.file_name" width="50" height="50"></viewer>
          </template>
        </el-table-column>
        <el-table-column label="模板编号" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.template_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="跳转路径" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.page }}</span>
          </template>
        </el-table-column>
        <el-table-column label="启用状态" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_show === 2" size="mini" type="text">禁用</el-button>
            <el-button v-if="row.is_show === 1" size="mini" type="text">启用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <router-link :to="{path: '/message/subscribe/wechat/save/'+row.uuid}">
              <el-button type="text" size="mini" class="mr10">编辑</el-button>
            </router-link>
            <el-button size="mini" type="text" @click="handleDelete(row, $index)">删除</el-button>
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
import { list, del } from '@/api/message/template'
import Pagination from '@/components/Pagination'
export default {
  name: 'MessageInfo',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        title: ''
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
    // 列表
    getList() {
      this.listLoading = true
      list(this.listQuery).then(res => {
        console.log(res)
        this.tableData.data = res.data.items
        this.tableData.total = res.data.total
      })
      this.listLoading = false
    },
    // 重置
    resetForm() {
      this.listQuery.title = ''
      this.getList()
    },
    // 删除
    handleDelete(row, idx) {
      this.$modalSure().then(() => {
        del(row.uuid).then(res => {
          this.$message({ message: res.message, type: 'success' })
          this.tableData.data.splice(idx, 1)
          this.tableData.total -= 1
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
.selWidth{
  width: 300px;
}

.mr10 {
  margin-right: 10px;
}
</style>
