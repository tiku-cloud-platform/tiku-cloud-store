<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form
            ref="searchForm"
            :model="listQuery"
            inline
            size="small"
            label-position="right"
          >
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width: auto">
                  <el-form-item label="试卷名称：" prop="title">
                    <el-input
                      v-model="listQuery.title"
                      placeholder="请输入试卷名称"
                      size="small"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width: auto">
                  <el-form-item label="显示状态：" prop="is_show">
                    <el-select
                      v-model="listQuery.is_show"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in this.$store.getters.isShow"
                        :key="item.key"
                        :value="item.value"
                        :label="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width: auto">
                  <el-form-item label="是否推荐：" prop="is_recommend">
                    <el-select
                      v-model="listQuery.is_recommend"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in this.$store.getters.isRecommend"
                        :key="item.key"
                        :value="item.value"
                        :label="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-form-item>
                  <el-button
                    type="primary"
                    icon="ios-search"
                    label="default"
                    class="mr15"
                    size="small"
                    @click="getList"
                  >搜索
                  </el-button>
                  <el-button
                    class="ResetSearch mr10"
                    size="small"
                    @click="reset()"
                  >重置
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item>
                  <router-link :to="{ path: '/exam/collection/save' }">
                    <el-button
                      size="small"
                      type="success"
                      class="mr10"
                    >添加
                    </el-button>
                  </router-link>
                  <el-button
                    type="danger"
                    @click="handleBatchDel"
                  >删除
                  </el-button>
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
        stripe
        empty-text="暂无数据"
        show-header
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="auto"/>
        <!-- <el-table-column label="试卷编号" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.uuid }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="试卷分类" width="auto" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.exam_category_info.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="试卷名称"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷图片" width="auto" align="center">
          <template slot-scope="scope">
            <viewer><img
              :src="
                scope.row.cover_file_info.file_url +
                  scope.row.cover_file_info.file_name
              "
              width="50"
              height="50"
            ></viewer>
          </template>
        </el-table-column>
        <el-table-column label="难易程度" width="auto" align="center">
          <template slot-scope="{ row }" style="display: flex">
            <span v-if="row.level === 1 || row.level === 2" style="color: green;">简单</span>
            <span v-if="row.level === 3 || row.level === 4" style="color: orange;">中等</span>
            <span v-if="row.level === 5" style="color: red;">难</span>
          </template>
        </el-table-column>
        <el-table-column label="答题人数" width="auto" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.submit_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷题数" width="auto" align="center">
          <template slot-scope="{ row }">
            <el-popover
              placement="top-start"
              title="试题数量情况"
              trigger="hover"
              :content="
                `已添加问答题:` +
                  row.reading_sum +
                  ` 已添加选择题:` +
                  row.option_sum +
                  ` 已添加判断题:` +
                  row.jude_sum +
                  ` 设置问答题:` +
                  row.max_reading_total +
                  ` 设置选择题:` +
                  row.max_option_total +
                  ` 设置判断题:` +
                  row.max_judge_total
              "
            >
              <el-button slot="reference" type="text" size="mini">
                {{ row.total_number }}
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="试卷分数" width="auto" align="center">
          <template slot-scope="{ row }" ->
            <el-popover
              placement="top-start"
              title="试题分数情况"
              trigger="hover"
              :content="
                `问答题:` +
                  row.reading_score +
                  ` 加选择题:` +
                  row.option_score +
                  ` 判断题:` +
                  row.jude_score
              "
            >
              <el-button slot="reference" type="text" size="mini">
                {{ row.total_score }}
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="答题时间"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.exam_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="试题年份"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.exam_year }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出题人" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核人" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span>{{ row.audit_author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="显示顺序" width="auto" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.orders }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否推荐"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span v-if="row.is_recommend === 2" class="show-disable-text">否</span>
            <span v-if="row.is_recommend === 1" class="show-enable-text">是</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span v-if="row.is_show === 2" class="show-disable-text">禁用</span>
            <span v-if="row.is_show === 1" class="show-enable-text">启用</span>
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
        <el-table-column
          label="操作"
          align="center"
          width="auto"
          class-name="small-padding fixed-width"
          fixed="right"
        >
          <template slot-scope="{ row, $index }">
            <span style="color: orange;" @click="redirectDetail(row)">编辑</span>
            <span style="color: green;padding-left: 6px;" @click="exchangeExam(row)">试题</span>
            <span style="color: red;padding-left: 6px;" @click="handleDelete(row, $index)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <pagination
          v-show="tableData.total > 0"
          :total="tableData.total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.size"
          @pagination="getList"
        />
      </div>
    </el-card>
    <!--    设置试题顺序弹窗开始-->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="70%"
    >
      <div style="padding-left: 10px;">
        <el-tabs v-model="drawerOption" @click="tabsClick">
          <el-tab-pane label="问答试题" name="exam">
            <div class="drawer-content">
              <el-table
                :data="exchangeDataList"
                size="small"
                border
                stripe
                empty-text="暂无数据"
                show-header
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              >
                <el-table-column
                  fixed
                  prop="date"
                  label="创建时间"
                  align="center"
                />
                <el-table-column
                  prop="title"
                  label="试题名称"
                  align="center"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="income_score"
                  label="奖励积分"
                  align="center"
                />
                <el-table-column
                  prop="expend_score"
                  label="消耗积分"
                  align="center"
                />
                <el-table-column
                  prop="is_show"
                  label="显示状态"
                  align="center"
                />
                <el-table-column
                  prop="is_search"
                  label="搜索控制"
                  align="center"
                />
                <el-table-column
                  prop="level"
                  label="试题难度"
                  align="center"
                />
                <el-table-column
                  prop="orders"
                  label="显示顺序"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.orders" type="text" maxlength="100000" minlength="0" autosize
                              placeholder="试题排序"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="100"
                  fixed="right"
                >
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="updateReadingExam(scope.row)">更新数据</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="单选试题" name="option">
            <div class="drawer-content">
              单选试题
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
    <!--    设置试题顺序弹窗结束-->
  </div>
</template>

<script>
import { list, del } from '@/api/exam/collection'
import Pagination from '@/components/Pagination'

export default {
  name: 'Menu',
  components: { Pagination },
  data() {
    return {
      // 顺序调整弹窗
      drawer: false,
      direction: 'rtl',
      drawerOption: 'exam',
      // 调整试题数据
      exchangeDataList: [{
        uuid: 'asdfasdfasdfasd',
        date: '2016-05-02',
        title: '请说出一下PHP这门编程语言的理解',
        income_score: 12.32,
        expend_score: 12.1,
        is_show: 1,
        level: 1,
        is_search: 1,
        orders: 1
      }],
      // 查询条件
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
      typeData: [] // 跳转类型
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    reset() {
      this.$refs['searchForm'].resetFields()
      this.getList()
    },
    // 列表
    getList() {
      this.listLoading = true
      list(this.listQuery).then((res) => {
        for (let index = 0; index < res.data.items.length; index++) {
          res.data.items[index].total_score = parseFloat(res.data.items[index].jude_score) + parseFloat(res.data.items[index].reading_score) + parseFloat(res.data.items[index].option_score)
          res.data.items[index].total_number = parseInt(res.data.items[index].option_sum) + parseInt(res.data.items[index].reading_sum) + parseInt(res.data.items[index].jude_sum)
        }
        this.tableData.data = res.data.items
        this.tableData.total = res.data.total
        this.listLoading = false
      })
    },
    // 删除
    handleDelete(row, idx) {
      this.$modalSure().then(() => {
        del(row.uuid).then((res) => {
          this.$message({ message: res.message, type: 'success' })
          this.tableData.data.splice(idx, 1)
          this.tableData.total -= 1
        })
      })
    },
    // 试卷调整
    exchangeExam(row) {
      console.log(row)
      this.drawer = true
    },
    tabsClick(tab, event) {
      this.drawerOption = tab
    },
    // 更新问答试题
    updateReadingExam(row) {
      console.log('更新数据', row)
    },
    // 试题详情
    redirectDetail(row) {
      this.$router.push('/exam/collection/save/' + row.uuid)
    },
    // 批量选择时触发
    handleSelectionChange(selection) {
      this.selectionDelList = []
      selection.forEach((element) => {
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
        del(this.selectionDelList.join(',')).then((res) => {
          this.$message({ message: res.message, type: 'success' })
        })
        this.getList()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.svg-icon {
  width: 2em !important;
  height: 2em !important;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-left: -2px;
}

::v-deep .el-card__body {
  padding: 0 !important;
}

::v-deep .el-drawer__header {
  display: none;
}

.mr10 {
  margin-right: 10px;
}

.el-col-lg-12 {
  width: 30%;
}
</style>
