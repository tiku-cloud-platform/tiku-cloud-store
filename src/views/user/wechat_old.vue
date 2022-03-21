<template>
  <div class="divBox">
    <div slot="header" class="clearfix">
      <div class="container">
        <el-form ref="searchForm" :model="listQuery" inline size="small" label-position="right" label-width="100px">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
              <el-col v-bind="grid">
                <el-form-item label="用户昵称：" class="width100">
                  <el-input v-model="listQuery.nickname" placeholder="用户昵称" clearable style="width: 200px;" @change="onChangePrograms(listQuery.nickname)" />
                </el-form-item>
              </el-col>
              <el-col v-bind="grid">
                <el-form-item label="手机号：" class="width100">
                  <el-input v-model="listQuery.mobile" placeholder="手机号" clearable style="width: 200px;" @change="onChangePrograms(listQuery.mobile)" />
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
              <el-form-item>
                <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="getList">搜索</el-button>
                <el-button class="ResetSearch mr10" size="small" @click="reset()">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      max-height="650px"
      :data="list"
      empty-text="暂无数据"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="头像" width="70" align="center">
        　<template slot-scope="scope">
        <viewer><img :src="scope.row.avatar_url" width="25" height="25"></viewer>
        　</template>
      </el-table-column>
      <el-table-column label="昵称" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="auto" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gender == 1 ? '男' : row.gender == 2 ? '女' : row.gender == 0 ? '未知' : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="省" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.province }}</span>
        </template>
      </el-table-column>
      <el-table-column label="市" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区县" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.district }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <el-button v-if="row.is_forbidden ==1 " size="mini" type="success">启用</el-button>
          <el-button v-if="row.is_forbidden ==2 " size="mini" type="danger">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近登录" width="auto" align="center" :show-overflow-tooltip="true">
        <template slot-scope="{row}">
          <span>{{ row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" width="auto" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" style="margin-left: 16px;" @click="openDetail(row, drawer = true)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      :direction="direction"
      size="80%"
    >
      <div class="detail-user-info">
        <div class="avatar">
          <viewer><img :src="userDetail.avatar_url" width="100%" height="100%"></viewer>
        </div>
        <div class="info">
          <e-desc :data="userDetail" margin="0px" label-width="100px">
            <e-desc-item label="OpenID">{{ userDetail.openid }}</e-desc-item>
            <e-desc-item label="昵称">{{ userDetail.nickname }}</e-desc-item>
            <e-desc-item label="性别">{{ userDetail.gender === 1 ? '男' : userDetail.gender === 2 ? '女' : '未知' }}</e-desc-item>
            <e-desc-item label="生日">2021.09.17</e-desc-item>
            <e-desc-item label="地址">{{ userDetail.province + userDetail.city + userDetail.district + userDetail.address }}</e-desc-item>
            <e-desc-item label="注册时间">{{ userDetail.created_at }}</e-desc-item>
          </e-desc>
        </div>
      </div>
      <div class="detail-table">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="积分历史" name="score">
            <el-form ref="scoreSearchForm" :model="scoreData.listQuery" inline size="small" label-position="right" label-width="100px">
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                  <el-col style="width: 30%;">
                    <el-form-item label="获取方式：" prop="score_key">
                      <el-select v-model="scoreData.listQuery.score_key" clearable placeholder="请选择" style="width: 200px;">
                        <el-option
                          v-for="item in scoreTypeData"
                          :key="item.value"
                          :label="item.describe"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col style="width: 50%;">
                    <el-form-item label="获取时间：" prop="created_at">
                      <el-date-picker
                        v-model="scoreData.listQuery.start_time"
                        style="width: 200px;"
                        type="datetime"
                        placeholder="开始日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      />
                      至
                      <el-date-picker
                        v-model="scoreData.listQuery.end_time"
                        style="width: 200px;"
                        type="datetime"
                        placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col style="width: 20%;">
                    <el-form-item>
                      <el-button type="primary" icon="ios-search" label="default" class="mr15" size="mini" @click="getScore()">搜索</el-button>
                      <el-button class="ResetSearch mr10" size="mini" @click="getScoreReset()">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
            </el-form>
            <el-table
              :key="1"
              v-loading="scoreData.listLoading"
              max-height="550px"
              :data="scoreData.list"
              empty-text="暂无数据"
              highlight-current-row
              style="width: 100%;"
            >
              <el-table-column label="获取方式" width="auto" align="center" :show-overflow-tooltip="true">
                <template slot-scope="{row}">
                  <span>{{ row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="积分数值" width="auto" align="center" :show-overflow-tooltip="true">
                <template slot-scope="{row}">
                  <span>{{ row.score }}</span>
                </template>
              </el-table-column>
              <el-table-column label="获取时间" width="auto" align="center" :show-overflow-tooltip="true">
                <template slot-scope="{row}">
                  <span>{{ row.created_at }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="scoreData.total>0" :total="scoreData.total" :page.sync="scoreData.listQuery.page" :limit.sync="scoreData.listQuery.size" @pagination="getScore" />
          </el-tab-pane>
          <el-tab-pane label="微信订阅" name="subscribe">
            微信订阅
          </el-tab-pane>
          <el-tab-pane label="答题记录" name="record">角色管理</el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
// import UserPanel from './components/UserPanel/index'
import { getList } from '@/api/user/wechat'
import { history as scoreList } from '@/api/score/index'
import EDesc from './components/DescTable/EDesc'
import EDescItem from './components/DescTable/EDescItem'
import { list as constantList } from '@/api/system/const'
export default {
  name: 'Wechat',
  components: {
    Pagination,
    EDesc,
    EDescItem
  },
  data() {
    return {
      scoreTypeData: [], // 积分获取类型
      activeName: 'score',
      scoreData: {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          score_key: '',
          user_id: '',
          start_time: '',
          end_time: '',
          page: 1,
          size: 10
        }
      },
      userDetail: {},
      drawer: false,
      direction: 'rtl',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      txTrueVideoUrl: null,
      listQuery: {
        page: 1,
        size: 10,
        nickname: '',
        mobile: ''
      },
      detailListQuery: {
        user_id: '',
        page: 1,
        size: 10
      },
      dialogPvVisible: false,
      dialogFormVisible: false,
      dialogChannel: false,
      dialogStatus: '',
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
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 搜索
    onChangePrograms() {
      this.listQuery.page = 1
      this.getList()
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return 'success-row'
      }
    },
    openDetail(row) {
      this.userDetail = row
      this.scoreData.listQuery.user_id = row.uuid
      this.getScore()
    },
    // 获取积分历史
    getScore() {
      constantList({ title: 'system_score' }).then(res => {
        this.scoreTypeData = res.data.items
      })
      this.scoreData.listLoading = true
      scoreList(this.scoreData.listQuery).then(response => {
        this.scoreData.list = response.data.items
        this.scoreData.total = response.data.total
        this.scoreData.listLoading = false
      })
    },
    getScoreReset() {
      this.$refs['scoreSearchForm'].resetFields()
      this.getScore()
    },
    // 获取微信订阅
    getSubscribe() {

    },
    // 获取答题记录
    getRecord() {

    },
    // 点击选项卡切换
    handleClick() {
      if (this.activeName === 'score') {
        this.getScore()
      } else if (this.activeName === 'subscribe') {
        this.getSubscribe()
      } else if (this.activeName === 'record') {
        this.getRecord()
      }
    }
  }
}
</script>

<style>
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

</style>
