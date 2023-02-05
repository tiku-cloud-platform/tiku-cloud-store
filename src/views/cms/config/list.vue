<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form inline size="small" label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col style="width:auto">
                  <el-form-item label="文章标题：">
                    <el-input
                      v-model="listQuery.title"
                      placeholder="请输入文章标题"
                      clearable
                      class="selWidth"
                      size="small"
                    />
                  </el-form-item>
                  <el-form-item label="配置描述：">
                    <el-input
                      v-model="listQuery.position"
                      placeholder="请输入配置描述"
                      clearable
                      class="selWidth"
                      size="small"
                    />
                  </el-form-item>
                  <el-button
                    type="primary"
                    icon="ios-search"
                    label="default"
                    class="mr15"
                    size="small"
                    @click="getList"
                  >搜索
                  </el-button>
                  <el-button class="ResetSearch mr10" size="small" @click="reset()">重置</el-button>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item>
                  <router-link :to="{path: '/cms/config/article/save'}">
                    <el-button size="small" type="success" class="mr10">添加文章</el-button>
                  </router-link>
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
        stripe
        empty-text="暂无数据"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="内容编号" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.uuid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章标题" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_show === 2" size="mini" type="text" class="show-disable-text">禁用</el-button>
            <el-button v-if="row.is_show === 1" size="mini" type="text" class="show-enable-text">启用</el-button>
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
            <router-link :to="{path: '/cms/config/article/save/'+row.uuid}">
              <el-button type="text" size="mini" class="mr10">编辑</el-button>
            </router-link>
            <el-button size="mini" type="text" style="color: red;" @click="handleDelete(row, $index)">删除</el-button>
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
import { list, del } from '@/api/cms/content'
import Pagination from '@/components/Pagination'

export default {
  name: 'Article',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        size: 20,
        title: '',
        position: ''
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
.selWidth {
  width: 300px;
}

.mr10 {
  margin-right: 10px;
}

::v-deep .el-card__body {
  padding: 0 !important;
}
</style>
