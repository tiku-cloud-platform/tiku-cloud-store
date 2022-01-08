<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form inline size="small" label-position="right">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-col v-bind="grid" style="width:auto">
                  <el-form-item label="标题名称：">
                    <el-input v-model="listQuery.title" placeholder="请输入文章标题" clearable class="selWidth" size="small" />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                <el-form-item>
                  <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="getList">搜索</el-button>
                  <el-button class="ResetSearch mr10" size="small" @click="reset()">重置</el-button>
                  <router-link :to="{path: '/article/cms/about-me/save'}">
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
      >
        <el-table-column type="selection" width="55" />
        <!-- <el-table-column label="内容编号" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.uuid }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="文章标题" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="显示位置" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.position_show ? row.position_show.describe : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_show === 0" size="mini" type="text">禁用</el-button>
            <el-button v-if="row.is_show === 1" size="mini" type="text">启用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <router-link :to="{path: '/article/cms/about-me/save/'+row.uuid}">
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
import { list, del } from '@/api/cms/content'
import Pagination from '@/components/Pagination'
export default {
  name: 'Article',
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
      listLoading: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      list().then(this.listQuery).then(res => {
        this.tableData.data = res.data.items
        this.tableData.total = res.data.total
      })
      this.listLoading = false
    },
    // 删除
    handleDelete(uuid, idx) {
      this.$modalSure().then(() => {
        del(uuid).then(({ message }) => {
          this.$message.success(message)
          this.getList()
        })
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
