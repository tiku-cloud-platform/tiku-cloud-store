<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline size="small" label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width:auto">
                  <el-form-item label="分类名称：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入查询分类名称" size="small" clearable />
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto">
                  <el-form-item label="文章分类：" prop="category_uuid">
                    <el-select v-model="listQuery.category_uuid" clearable placeholder="请选择分类状态" style="width: 90%">
                      <el-option
                        v-for="item in categoryData"
                        :key="item.key"
                        :label="item.title"
                        :value="item.uuid"
                      />
                    </el-select>
                  </el-form-item>
                  <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="getList">搜索</el-button>
                  <el-button class="ResetSearch mr10" size="small" @click="reset()">重置</el-button>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item>
                  <router-link :to="{path: '/cms/article/save'}">
                    <el-button size="small" type="primary" class="mr10">添加文章</el-button>
                  </router-link>
                  <el-button type="danger" size="small" @click="handleBatchDel">删除</el-button>
                  <el-button type="warning" size="small" @click="handleBatchPub">微信收录</el-button>
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
        :tree-props="{children: 'children'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <!-- <el-table-column label="编号" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.uuid }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="封面" width="70" align="center">
          <template slot-scope="scope">
            <viewer v-if="scope.row.cover_file_info != null"><img :src="scope.row.cover_file_info.file_url+scope.row.cover_file_info.file_name" width="50" height="50"></viewer>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.category_info !== null ? row.category_info.title : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="来源" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.source }}</span>
          </template>
        </el-table-column>
        <el-table-column label="阅读" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.read_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="顺序" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.orders }}</span>
          </template>
        </el-table-column>
        .<el-table-column label="发布时间" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.publish_date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否置顶" width="auto" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.is_top === 2" size="mini" type="text" style="color: #A5A8AD;">否</el-button>
            <el-button v-if="row.is_top === 1" size="mini" type="text">是</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_show === 2" size="mini" type="text" class="show-disable-text">禁用</el-button>
            <el-button v-if="row.is_show === 1" size="mini" type="text" class="show-enable-text">启用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="发布" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_publish === 2" size="mini" type="text" class="show-disable-text">否</el-button>
            <el-button v-if="row.is_publish === 1" size="mini" type="text" class="show-enable-text">是</el-button>
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
            <router-link :to="{path: '/cms/article/save/'+row.uuid}">
              <el-button type="text" size="mini" class="mr10">编辑</el-button>
            </router-link>
            <el-button size="mini" type="text" style="color: red;" @click="handleDelete(row, $index)">删除</el-button>
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
import { list, del, publish } from '@/api/article/list'
import { list as categoryList } from '@/api/article/category'
import Pagination from '@/components/Pagination'
export default {
  name: 'ArticleList',
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
      // 批量删除选中id
      selectionDelList: [],
      categoryData: [],
      sleOptions: {
        title: '',
        uuid: ''
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  mounted() {
    this.getList()
    categoryList().then(res => {
      this.categoryData = res.data.items
    })
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    // 分类点击
    handleSelClick(node) {
      this.listQuery.category_uuid = node.uuid
      this.sleOptions = {
        title: node.title,
        uuid: node.uuid
      }
    },
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
    },
    // 批量发布
    handleBatchPub() {
      if (this.selectionDelList.length <= 0) {
        return this.$message({
          message: '未选择数据',
          type: 'warning'
        })
      }
      this.$publishWeChat().then(() => {
        publish(this.selectionDelList.join(',')).then(res => {
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
::v-deep .el-card__body {
  padding: 0 !important;
}
.mr10 {
  margin-right: 10px;
}
</style>

