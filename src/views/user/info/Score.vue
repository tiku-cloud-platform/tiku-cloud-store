<template>
  <div>
    <div slot="header" class="clearfix">
      <div class="container">
        <el-form ref="searchForm" :model="queryWhere" inline size="small" label-position="right">
          <el-row>
            <el-col :span="24">
              <el-col v-bind="grid" style="width:auto;">
                <el-form-item label="积分场景：" prop="title">
                  <el-input v-model="queryWhere.title" placeholder="请输入积分场景" size="small" clearable />
                </el-form-item>
              </el-col>
              <el-col v-bind="grid" style="width:auto;">
                <el-form-item label="开始时间：" prop="start_time">
                  <el-date-picker
                    v-model="queryWhere.start_time"
                    type="datetime"
                    placeholder="开始时间"
                  />
                </el-form-item>
              </el-col>
              <el-col v-bind="grid" style="width:auto;">
                <el-form-item label="结束时间：" prop="end_time">
                  <el-date-picker
                    v-model="queryWhere.end_time"
                    type="datetime"
                    placeholder="结束时间"
                  />
                </el-form-item>
              </el-col>
              <el-col v-bind="grid" style="width:auto;">
                <el-form-item label="客户端：" prop="client_type">
                  <el-select v-model="queryWhere.client_type" clearable placeholder="请选择客户端">
                    <el-option
                      v-for="item in clientType"
                      :key="item.value"
                      :value="item.value"
                      :label="item.title"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-bind="grid" style="width:auto;">
                <el-form-item label="积分类型：" prop="type">
                  <el-select v-model="queryWhere.type" clearable placeholder="请选择积分类型">
                    <el-option
                      v-for="item in typeList"
                      :key="item.value"
                      :value="item.value"
                      :label="item.title"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-bind="grid" style="width:auto;">
                <el-row><el-button type="primary" size="small" @click="getUserScoreHistory">搜索</el-button></el-row>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%;margin-top: 10px;"
      border
      :highlight-current-row="true"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column
        prop="client_type"
        label="客户端"
        align="center"
      >
        <template slot-scope="{row}">
          <span v-if="row.client_type ===1 ">微信小程序</span>
          <span v-if="row.client_type ===2 ">微信公众号</span>
          <span v-if="row.client_type ===3 ">iOS客户端</span>
          <span v-if="row.client_type ===4 ">Android客户端</span>
          <span v-if="row.client_type ===5 ">PC端</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="积分场景"
        align="center"
      />
      <el-table-column
        prop="type"
        label="积分类型"
        align="center"
      >
        <template slot-scope="{row}">
          <span v-if="row.type === 1" style="color:#1890ff;">增加</span>
          <span v-else class="show-disable-text">减少</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="积分值"
        align="center"
      />
      <el-table-column
        prop="created_at"
        label="获取时间"
        align="center"
      />
    </el-table>
    <div class="block">
      <pagination
        v-show="queryWhere.total>0"
        :total="queryWhere.total"
        :page.sync="queryWhere.page"
        :limit.sync="queryWhere.size"
        @pagination="getUserScoreHistory"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getList } from '@/api/user/score'
export default {
  name: 'Score',
  components: {
    Pagination
  },
  data() {
    return {
      loading: false,
      tableData: [],
      clientType: [{
        title: '微信小程序',
        value: 1
      }, {
        title: '微信公众号',
        value: 2
      }, {
        title: 'iOS客户端',
        value: 3
      }, {
        title: 'Android客户端',
        value: 4
      }, {
        title: 'PC端',
        value: 5
      }],
      typeList: [{
        title: '增加',
        value: 1
      }, {
        title: '减少',
        value: 2
      }],
      grid: {
        xl: 8,
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      },
      queryWhere: {
        page: 1,
        size: 10,
        user_uuid: '',
        total: 0,
        title: '',
        client_type: '',
        start_time: '',
        end_time: '',
        type: ''
      }
    }
  },
  created() {
    if (this.$route.params.uuid) {
      this.queryWhere.user_uuid = this.$route.params.uuid
      this.getUserScoreHistory()
    } else {
      this.$message.error('用户编号不能为空')
    }
  },
  methods: {
    getUserScoreHistory() {
      this.loading = true
      getList(this.queryWhere).then(res => {
        this.tableData = res.data.items
        this.queryWhere.page = res.data.page
        this.queryWhere.size = res.data.size
        this.queryWhere.total = res.data.total
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
