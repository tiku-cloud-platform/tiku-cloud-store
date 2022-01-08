<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline label-position="right">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
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
                <el-col v-bind="grid" style="display:flex;">
                  <el-form-item label="获取时间：" prop="start_time">
                    <el-date-picker
                      v-model="listQuery.start_time"
                      style="width: 190px;"
                      type="datetime"
                      placeholder="开始日期"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    />
                  </el-form-item>
                  <el-form-item label="至" prop="end_time">
                    <el-date-picker
                      v-model="listQuery.end_time"
                      style="width: 190px;"
                      type="datetime"
                      placeholder="结束日期"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
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
      >
        <el-table-column label="获取时间" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="获取方式" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.key_info.describe }}</span>
          </template>
        </el-table-column>
        <el-table-column label="获取来源" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
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
            <span v-else style="color:red;">减少</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;">
        <div style="margin-top: 38px;">
          <span style="color:#1890ff;">总积分：{{ expend ? expend : '暂无' }}</span>
          <span style="margin-left:20px;color:red;">消耗积分：{{ income ? income : '暂无' }}</span>
        </div>
        <pagination v-show="tableData.total>0" class="page" :total="tableData.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { history } from '@/api/score/index'
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
        size: 10,
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
      })
      this.listLoading = false
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

.page {
  padding: 0;
  margin-top: 5px;
  margin-left: 35%;
}

</style>
