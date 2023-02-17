<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width: auto;">
                  <el-form-item label="积分渠道：" prop="score_key">
                    <el-select v-model="listQuery.score_key" clearable placeholder="请选择" style="width: 150px;">
                      <el-option
                        v-for="item in scoreData"
                        :key="item.value"
                        :label="item.describe"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width: auto;">
                  <el-form-item label="获取来源：" prop="client_type">
                    <el-select v-model="listQuery.client_type" clearable placeholder="请选择" style="width: 150px;">
                      <el-option
                        v-for="item in score_channel"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="display:flex;width: auto;">
                  <el-form-item label="获取时间：" prop="start_time">
                    <el-date-picker
                      v-model="listQuery.start_time"
                      style="width: 190px;"
                      type="datetime"
                      placeholder="获取开始日期"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    />
                  </el-form-item>
                  <el-form-item label="至" prop="end_time">
                    <el-date-picker
                      v-model="listQuery.end_time"
                      style="width: 190px;"
                      type="datetime"
                      placeholder="获取结束日期"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item>
                  <el-button type="primary" icon="ios-search" label="default" class="mr15" size="mini" @click="getList">搜索</el-button>
                  <el-button class="ResetSearch mr10" size="mini" @click="reset('searchForm')">重置</el-button>
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
      >
        <el-table-column label="获取用户" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.user != null ? row.user.real_name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="获取时间" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="获取方式" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="获取来源" width="auto" align="center">
          <template slot-scope="{row}">
            <span v-if="row.client_type ===1 ">微信小程序</span>
            <span v-if="row.client_type ===2 ">微信公众号</span>
            <span v-if="row.client_type ===3 ">iOS客户端</span>
            <span v-if="row.client_type ===4 ">Android客户端</span>
            <span v-if="row.client_type ===5 ">PC端</span>
          </template>
        </el-table-column>
        <el-table-column label="积分分值" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column label="积分类型" width="auto" align="center">
          <template slot-scope="{row}">
            <span v-if="row.type === 1" style="color:#1890ff;">增加</span>
            <span v-else class="show-disable-text">减少</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: right; margin-bottom: 20px;margin-right: 20px;">
        <!--        <div style="margin-top: 38px; justify-content: left;">-->
        <!--          <span style="color:red;">消耗积分：{{ expend }}</span>-->
        <!--          <span style="margin-left:20px;color:#1890ff;">获取积分：{{ income }}</span>-->
        <!--        </div>-->
        <pagination v-show="tableData.total>0" class="page" :total="tableData.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { history } from '@/api/score'
// 常量配置
import { list as constantList } from '@/api/system/const'
import Pagination from '@/components/Pagination'
export default {
  name: 'ScoreHistory',
  components: { Pagination },
  data() {
    return {
      expend: '',
      income: '',
      score_channel: [
        { name: '微信小程序', value: 1 },
        { name: '微信公众号', value: 2 },
        { name: 'iOS客户端', value: 3 },
        { name: 'Android客户端', value: 4 },
        { name: 'PC端', value: 5 }
      ],
      listQuery: {
        page: 1,
        size: 15,
        score_key: '',
        client_type: '',
        start_time: '',
        end_time: ''
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
      scoreData: [] // 显示位置
    }
  },
  mounted() {
    this.getList()
    constantList({ title: 'system_score' }).then(res => {
      this.scoreData = res.data.items
    })
  },
  methods: {
    reset(formName) {
      this.$refs[formName].resetFields()
      this.listQuery.start_time = ''
      this.listQuery.end_time = ''
      this.getList()
    },
    // 列表
    getList() {
      this.listLoading = true
      history(this.listQuery).then(res => {
        this.tableData.data = res.data.items
        if (this.listQuery.page === 1) {
          this.expend = res.data.expend
          this.income = res.data.income
        }
        this.tableData.total = res.data.total
        this.listLoading = false
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

.page {
  padding: 0;
  margin-top: 5px;
  margin-left: 35%;
}

</style>
