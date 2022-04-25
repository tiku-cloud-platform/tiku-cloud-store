<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline size="small" label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="试题名称：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入试题名称" size="small" clearable />
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="显示状态：" prop="is_show">
                    <el-select v-model="listQuery.is_show" clearable placeholder="请选择">
                      <el-option v-for="item in this.$store.getters.isShow" :key="item.key" :value="item.value" :label="item.label" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="5">
                <el-form-item>
                  <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="getList">搜索</el-button>
                  <el-button class="ResetSearch mr10" size="small" @click="reset()">重置</el-button>
                  <router-link :to="{path: '/exam/library/option/save'}">
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="试题题目" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试题图片" width="70" align="center">
          <template slot-scope="scope">
            <viewer v-if="scope.row.cover_file_info"><img :src="scope.row.cover_file_info.file_url+scope.row.cover_file_info.file_name" width="50" height="50"></viewer>
          </template>
        </el-table-column>
        <el-table-column label="试题答案" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.answer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="难易程度" width="130" align="center">
          <template slot-scope="{row}" style="display: flex">
            <span style="justify-content: center;display: flex;"><svg-icon v-for="n in + row.level" :key="n" style="float: left" icon-class="xingxing" class="meta-item__icon" /></span>
          </template>
        </el-table-column>
        <el-table-column label="解析消耗积分" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.tips_expend_score }}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案奖励积分" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.answer_income_score }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试题状态" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span v-if="row.is_show === 2" class="show-disable-text">禁用</span>
            <span v-if="row.is_show === 1">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <router-link :to="{path: '/exam/library/option/save/'+row.uuid}">
              <el-button type="text" size="mini" class="mr10">编辑</el-button>
            </router-link>
            <el-button size="mini" type="text" style="color:red;" @click="handleDelete(row, $index)">删除</el-button>
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
import { list, del } from '@/api/exam/option'
import Pagination from '@/components/Pagination'
export default {
  name: 'ExamOption',
  components: { Pagination },
  data() {
    return {
      listLoading: true,
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
.svg-icon {
  width: 2em !important;
  height: 2em !important;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-left: -2px;
}

.mr10 {
  margin-right: 10px;
}

.el-col-lg-12 {
  width: 30%;
}
</style>
