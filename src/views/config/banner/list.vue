<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline size="small" label-position="right">
            <el-row>
              <el-col :span="24">
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="文章标题：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入文章标题" size="small" clearable/>
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="显示状态：" prop="is_show">
                    <el-select v-model="listQuery.is_show" clearable placeholder="请选择">
                      <el-option v-for="item in this.$store.getters.isShow" :key="item.key" :value="item.value"
                                 :label="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="跳转类型：" prop="type">
                    <el-select v-model="listQuery.type" clearable placeholder="请选择">
                      <el-option
                        v-for="item in typeData"
                        :key="item.value"
                        :label="item.describe"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="显示位置：" prop="position">
                    <el-select v-model="listQuery.position" clearable placeholder="请选择">
                      <el-option
                        v-for="item in positionData"
                        :key="item.value"
                        :label="item.describe"
                        :value="item.value"
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
                  <router-link :to="{path: '/cms/banner/save'}">
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
        border
        empty-text="暂无数据"
        show-header
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <!-- <el-table-column label="编号" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.uuid }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="显示端口" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.client === null ? '' : row.client.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="显示位置" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.position === null ? '' : row.position.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" width="70" align="center">
          <template slot-scope="scope">
            <viewer><img :src="scope.row.cover_file_info.file_url+scope.row.cover_file_info.file_name" width="50"
                         height="50" alt=""
            ></viewer>
          </template>
        </el-table-column>
        <el-table-column label="跳转类型" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="跳转地址" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.url ? row.url : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="显示顺序" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.orders }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_show === 2" size="mini" type="text" class="show-disable-text">禁用</el-button>
            <el-button v-if="row.is_show === 1" size="mini" type="text" class="show-enable-text">启用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <router-link :to="{path: '/cms/banner/save/'+row.uuid}">
              <el-button type="text" size="mini" class="mr10">编辑</el-button>
            </router-link>
            <el-button size="mini" type="text" @click="handleDelete(row, $index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <pagination v-show="tableData.total>0" :total="tableData.total" :page.sync="listQuery.page"
                    :limit.sync="listQuery.size" @pagination="getList"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { list, del } from '@/api/banner'
// 常量配置
import { list as constantList } from '@/api/system/const'
import Pagination from '@/components/Pagination'

export default {
  name: 'Banner',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        title: '',
        position: '',
        type: '',
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
      routerList: [] // 跳转类型
    }
  },
  mounted() {
    this.getList()
    constantList({ title: 'wechat_banner' }).then(res => {
      this.positionData = res.data.items
    })
    constantList({ title: 'wechat_banner_navi' }).then(res => {
      this.typeData = res.data.items
    })
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
