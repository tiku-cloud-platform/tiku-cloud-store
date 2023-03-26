<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline size="small" label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width:auto">
                  <el-form-item label="教程名称：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入教程名称" size="small" clearable />
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
                  <router-link :to="{path: '/book/book/cate/list'}">
                    <el-button size="small" type="primary" class="mr10">教程分类</el-button>
                  </router-link>
                  <router-link :to="{path: '/book/book/save'}">
                    <el-button size="small" type="primary" class="mr10">添加教程</el-button>
                  </router-link>
                  <el-button type="danger" size="small" @click="handleBatchDel">删除教程</el-button>
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
        <el-table-column label="编号" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <svg-icon
              icon-class="copy"
              style="font-size: 20px; cursor: pointer"
              @click="copyChannelId(row.uuid)"
            />
            <span>{{ row.uuid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面" align="center">
          <template slot-scope="scope">
            <viewer v-if="scope.row.cover_file_info != null"><img
              :src="scope.row.cover_file_info.file_url+scope.row.cover_file_info.file_name"
              height="70"
            ></viewer>
          </template>
        </el-table-column>
        <el-table-column label="分类" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.cate != null ? row.cate.title : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="书名" width="200" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column label="收藏" align="center">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>{{ row.collection_number }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column label="点赞" align="center">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>{{ row.click_number }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column label="阅读" align="center">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>{{ row.read_number }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column label="评分" align="center">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>{{ row.score }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column label="章节" align="center">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>{{ row.numbers }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
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
            <router-link :to="{path: '/book/book/save/'+row.uuid}">
              <el-button type="text" size="mini" class="mr10">编辑</el-button>
            </router-link>
            <router-link :to="{path: '/book/book/category/list/'+row.uuid}">
              <el-button type="text" size="mini" class="mr10">章节</el-button>
            </router-link>
            <router-link :to="{path: '/book/book/evaluate/list/'+row.uuid}">
              <el-button type="text" size="mini" class="mr10">点评</el-button>
            </router-link>
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
  </div>
</template>

<script>
import { list, del } from '@/api/book/book'
import Pagination from '@/components/Pagination'

export default {
  name: 'BookList',
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
  },
  methods: {
    // 跳转分类页面
    // jumpCategory(uuid) {
    //   this.$router.push({
    //     name: 'bookCategory',
    //     params: {
    //       uuid
    //     }
    //   })
    // },
    // copy渠道编号
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

