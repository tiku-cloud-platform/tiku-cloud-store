<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form
            ref="searchFormList"
            :model="listQuery"
            inline
            size="small"
            label-position="right"
          >
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="用户昵称：" class="width100">
                    <el-input
                      v-model="listQuery.nickname"
                      placeholder="用户昵称"
                      clearable
                      @change="onChangePrograms(listQuery.nickname)"
                    />
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="手机号：" class="width100">
                    <el-input
                      v-model="listQuery.mobile"
                      placeholder="手机号"
                      clearable
                      @change="onChangePrograms(listQuery.mobile)"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
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
                    @click="reset('searchFormList')"
                  >重置
                  </el-button>
                  <!-- <el-button type="danger" @click="handleBatchDel()">删除</el-button> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <!--      用户基础信息开始-->
      <el-table
        :key="tableKey"
        :loading="listLoading"
        :data="list"
        empty-text="暂无数据"
        style="width: 100%"
        border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column
          label="用户等级"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.group !== null ? row.group.title : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="注册渠道"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.channel !== null ? row.channel.title : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.real_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="生日"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="年龄"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.age }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="简介"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="注册时间"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最近登录"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--      用户基础信息结束-->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.size"
        @pagination="getList"
      />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
// 常量配置
import { getList } from '@/api/user/user'

export default {
  name: 'User',
  components: {
    Pagination
  },
  data() {
    return {
      active: '',
      collapse: false,
      drawer: false,
      direction: 'rtl',
      tableKey: 0,
      list: null,
      userPlatform: {
        data: null,
        listQuery: {
          page: 1,
          size: 20,
          nickname: '',
          mobile: ''
        },
        total: 2
      },
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        nickname: '',
        mobile: ''
      },
      grid: {
        xl: 8,
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    reset(formName) {
    },
    // 搜索
    onChangePrograms() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

<style scoped>
.el-table__header-wrapper {
  height: 40px;
}

.el-drawer {
  overflow: auto;
}

.el-table .success-row {
  background: #f0f9eb;
}

.detail-user-info {
  width: 95%;
  height: 100px;
  margin: 10px auto;
  display: flex;
  position: relative;
  font-size: 14px;
}

.avatar {
  width: 94px;
  height: 94px;
}

::v-deep .el-card__body {
  padding: 0 !important;
}

.detail-table {
  width: 95%;
  margin: 20px auto;
}

.info {
  position: absolute;
  left: 100px;
  display: flex;
  height: 100%;
}

.selWidth {
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
