<template>
  <div class="divBox">
    <div class="collect" style="padding:0px;">
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" :span="5" class="card-panel-col" style="padding-right:5px;">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people" style="background: #3689F5;">
              <svg-icon icon-class="system_count" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">系统用户</div>
              <count-to :start-val="0" :end-val="tableData.collect.systemCount" :duration="2600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" :span="5" class="card-panel-col" style="padding-right:5px;padding-left:5px;">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-message" style="background: #FF7F65;">
              <svg-icon icon-class="channel_system_count" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">渠道用户</div>
              <count-to :start-val="0" :end-val="tableData.collect.channelSystemCount" :duration="3000" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" :span="5" class="card-panel-col" style="padding-right:5px;padding-left:5px;">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-money" style="background: #f4516c;">
              <svg-icon icon-class="system_today_count" class-name="card-panel-icon" style="color: #FFF;" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">系统用户</div>
              <count-to :start-val="0" :end-val="tableData.collect.todaySystemTotal" :duration="3200" class="card-panel-num" />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" :span="5" class="card-panel-col" style="padding-right:5px;padding-left:5px;">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-shopping" style="background: #FF8B38;">
              <svg-icon icon-class="channel_today_count" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">渠道用户</div>
              <count-to :start-val="0" :end-val="tableData.collect.todayChannelSystemTotal" :duration="3600" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchFrom" inline size="small" label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="标题：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入" size="small" clearable />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="5">
                <el-form-item>
                  <el-button type="primary" icon="ios-search" label="default" class="mr10" size="small" @click="getList">搜索</el-button>
                  <el-button class="ResetSearch mr10" size="small" @click="resetForm()">重置</el-button>
                  <router-link :to="{path: '/marketing/marketing/save'}">
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
        <el-table-column label="渠道分组" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.group.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="推广渠道编号" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
            <svg-icon
              icon-class="copy"
              style="font-size: 20px; cursor: pointer"
              @click="copyChannelId(row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column label="渠道名称" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册人数" width="auto" align="center">
          <template slot-scope="{row}">
            <span>{{ row.register }}</span>
          </template>
        </el-table-column>
        <el-table-column label="自定义推广码" align="center">
          <template slot-scope="scope">
            <viewer v-if="scope.row.file_info != null" style="display: flex;align-items: flex-end;left: 50%;position: relative;margin-left: -25px;">
              <img :src="scope.row.file_info.file_url+scope.row.file_info.file_name" width="50" height="50">
              <svg-icon
                icon-class="download"
                style="font-size: 20px; cursor: pointer;"
                @click="download(scope.row.file_info.file_url+scope.row.file_info.file_name)"
              />
            </viewer>
          </template>
        </el-table-column>
        <el-table-column label="启用状态" width="auto" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_show === 2" size="mini" type="text" style="color:red;">禁用</el-button>
            <el-button v-if="row.is_show === 1" size="mini" type="text">启用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <router-link :to="{path: '/marketing/marketing/save/'+row.uuid}">
              <el-button type="text" size="mini" class="mr10">编辑</el-button>
            </router-link>
            <el-button size="mini" type="text" @click="handleDelete(row, $index)">删除</el-button>
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
import { list, del } from '@/api/statistics/channel'
import Pagination from '@/components/Pagination'
import CountTo from 'vue-count-to'
export default {
  name: 'MessageInfo',
  components: { Pagination, CountTo },
  data() {
    return {
      listQuery: {
        page: 1,
        size: 20,
        title: ''
      },
      tableData: {
        data: [],
        total: 0,
        collect: {
          systemCount: 0,
          todaySystemTotal: 0,
          channelSystemCount: 0,
          todayChannelSystemTotal: 0
        }
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
      selectionDelList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // copy渠道编号
    copyChannelId(id) {
      (function() {
        document.oncopy = function(e) {
          e.clipboardData.setData('text', id)
          e.preventDefault()
          document.oncopy = null
        }
      })(id)
      document.execCommand('Copy')
      this.$message.success('复制成功')
    },
    download(url) {
      this.getUrlBase64(url).then(base64 => {
        const a = document.createElement('a')
        a.style.display = 'none'
        a.download = '图片名称'
        a.href = base64
        document.body.appendChild(a)
        a.click()
      })
    },
    getUrlBase64(url) {
      return new Promise(resolve => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.crossOrigin = 'Anonymous' // 允许跨域
        img.src = url
        img.onload = function() {
          canvas.height = 300
          canvas.width = 300
          ctx.drawImage(img, 0, 0, 300, 300)
          const dataURL = canvas.toDataURL('image/png')
          resolve(dataURL)
        }
      })
    },
    // 列表
    getList() {
      this.listLoading = true
      list(this.listQuery).then(res => {
        this.tableData.data = res.data.items
        this.tableData.total = res.data.total
        this.tableData.collect.systemCount = res.data.systemCount
        this.tableData.collect.channelSystemCount = res.data.channelSystemCount
        this.tableData.collect.todaySystemTotal = res.data.todaySystemTotal
        this.tableData.collect.todayChannelSystemTotal = res.data.todayChannelSystemTotal
      })
      this.listLoading = false
    },
    // 重置
    resetForm() {
      this.listQuery.title = ''
      this.getList()
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
.panel-group {
  margin-top: 5px;

  .card-panel-col {
    margin-bottom: 5px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
      color: #fff;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

.selWidth{
  width: 300px;
}

.mr10 {
  margin-right: 10px;
}
</style>
