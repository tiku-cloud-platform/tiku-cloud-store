<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline size="mini" label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width: 250px;">
                  <el-form-item label="试题类型：" prop="collection_type_uuid">
                    <el-select v-model="listQuery.collection_type_uuid" clearable placeholder="请选择" style="width: 150px;">
                      <el-option
                        v-for="item in examSecondaryData"
                        :key="item.uuid"
                        :label="item.title"
                        :value="item.uuid"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="display:flex;">
                  <el-form-item label="答题时间：" prop="start_time">
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
      >
        <el-table-column label="答题时间" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试题类型" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.collection.collection_type.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷名称" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.collection.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷总分" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.collection.total_score }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷时长" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.collection.exam_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="答题得分" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.score }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;">
        <div style="margin-top: 38px;">
          <span style="color:#1890ff;">{{ total_score ? '答题总积分：' + total_score : '暂无' }}</span>
        </div>
        <pagination v-show="tableData.total>0" class="page" :total="tableData.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { list as answerList } from '@/api/user/answer'
import Pagination from '@/components/Pagination'
// 试题二级分类
import { examSecondaryList } from '@/api/exam/category'
export default {
  name: 'AnswerHistory',
  components: { Pagination },
  data() {
    return {
      examSecondaryData: [],
      total_score: '',
      listQuery: {
        page: 1,
        size: 20,
        collection_type_uuid: '',
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
    examSecondaryList().then(res => {
      this.examSecondaryData = res.data.items
    })
  },
  methods: {
    reset(formName) {
      this.$refs[formName].resetFields()
      this.getList()
    },
    // 列表
    getList() {
      console.log(11)
      this.listLoading = true
      answerList(this.listQuery).then(res => {
        this.total_score = res.data.total_score
        this.tableData.data = res.data.items
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
