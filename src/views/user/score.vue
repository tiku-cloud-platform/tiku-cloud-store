<template>
  <div class="divBox">
    <div slot="header" class="clearfix">
      <div class="container">
        <el-form size="small" label-width="100px">
          <el-form-item label="用户昵称：" class="width100">
            <el-input v-model="listQuery.nickname" placeholder="用户昵称" clearable style="width: 200px;" @change="onChangePrograms(listQuery.nickname)" />
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      max-height="650px"
      :data="list"
      border
      fit
      empty-text="暂无数据"
      highlight-current-row
      style="width: 100%;"
    >
      <!-- <el-table-column label="数据编号" width="100" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="积分编号" width="300" align="center">
        <template slot-scope="{row}">
          <span>{{ row.uuid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="积分类型" width="auto" align="center">
        <template slot-scope="{row}">
          <el-button size="mini" :type="row.type == 1 ? 'success' : 'danger'">{{ row.type == 1 ? '增加' : '减少' }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="积分用户" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="积分渠道" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.uuid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="积分值" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="积分时间" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.created_at }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Integral',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      txTrueVideoUrl: null,
      listQuery: {
        page: 1,
        limit: 10,
        nickname: ''
      },
      dialogPvVisible: false,
      dialogFormVisible: false,
      dialogChannel: false,
      dialogStatus: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    },
    // 搜索
    onChangePrograms() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

<style>

</style>
