<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="queryWhere" inline size="small" label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width:auto">
                  <el-form-item label="显示状态：" prop="is_show">
                    <el-select v-model="queryWhere.is_show" clearable placeholder="请选择">
                      <el-option
                        v-for="item in showOption"
                        :key="item.value"
                        :label="item.title"
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
          </el-form>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="dataList"
        style="width: 100%"
        size="small"
        row-key="uuid"
        border
        empty-text="暂无数据"
        show-header
        stripe
        fixed="right"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <!--        <el-table-column label="编号" width="auto" align="center" :show-overflow-tooltip="true">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <span>{{ row.uuid }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="评论用户" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.user.real_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微信昵称" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.mini.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微信头像" width="70" align="center">
          <template slot-scope="{row}">
            <viewer><img
              :src="row.mini.avatar_url"
              width="50"
              height="50"
            ></viewer>
          </template>
        </el-table-column>
        <el-table-column label="点评分数" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点评内容" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点评时间" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span v-if="row.is_show == 2" class="show-disable-text">禁用</span>
            <span v-if="row.is_show == 1" class="show-enable-text">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="审核人" align="center">
          <template slot-scope="{row}">
            <span>{{ row.audit !== null ? row.audit.name : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核时间" width="150" align="center">
          <template slot-scope="{row}">
            <span>{{ row.audit_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="{row,$index}">
            <el-button type="text" size="mini" class="mr10" @click="audit(row, $index)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <pagination
          v-show="dataList.length>0"
          :total="total"
          :page.sync="queryWhere.page"
          :limit.sync="queryWhere.size"
          @pagination="getList"
        />
      </div>
    </el-card>

    <el-dialog
      title="点评设置"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="auditContent" :model="auditContent" :rules="auditContentValidate" label-width="80px">
        <el-form-item label="点评内容" prop="content">
          <el-input v-model="auditContent.content" type="textarea" aria-required="true" show-word-limit style="width: 100%;" />
        </el-form-item>
        <el-form-item label="显示状态：" prop="is_show">
          <el-radio v-model="auditContent.is_show" label="1">显示</el-radio>
          <el-radio v-model="auditContent.is_show" label="2">禁用</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="auditSubmit('auditContent')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index.vue'
import { list, edit } from '@/api/book/evaluate'
import { del } from '@/api/book/book'
export default {
  name: 'EvaluateList',
  components: { Pagination },
  data() {
    return {
      queryWhere: {
        page: 1,
        size: 20,
        book_uuid: '',
        title: '',
        is_show: ''
      },
      listLoading: true,
      dataList: [],
      total: 0,
      grid: {
        xl: 8,
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      },
      showOption: [
        {
          'title': '显示',
          'value': '1'
        },
        {
          'title': '禁用',
          'value': '2'
        }
      ],
      dialogVisible: false,
      auditContent: {
        uuid: '',
        content: '',
        is_show: '0'
      },
      auditContentValidate: {
        content: [{ required: true, message: '点评内容不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.queryWhere.book_uuid = this.$route.params.uuid
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.queryWhere).then(res => {
        this.dataList = res.data.items
        this.total = res.data.total
        this.listLoading = false
      })
    },
    audit(row, index) {
      this.auditContent = row
      this.dialogVisible = true
    },
    auditSubmit(content) {
      edit({ uuid: this.auditContent.uuid, content: this.auditContent.content, is_show: this.auditContent.is_show }).then(res => {
        if (res.code !== 1000) {
          this.$message.error('审核失败')
          return
        }
        this.dialogVisible = false
        this.getList()
      })
    },
    handleClose() {
      this.auditContent = {}
    },
    reset() {
      this.queryWhere.is_show = ''
      this.getList()
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
