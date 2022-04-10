<template>
  <el-row class="panel-group-right">
    <el-col :span="24">
      <el-card class="box-card">
        <div class="clearfix">
          <div style="font-weight: 500; color: rgb(29 33 41); font-size: 16px">系统公告</div>
          <span class="text" style="float: right">
            <el-link type="primary" :underline="false">查看更多</el-link>
          </span>
        </div>
        <div style="padding-top: 10px">
          <div v-for="item,key in noticeData" :key="key" class="text item">
            <span
              class="waring-text"
              underline="false"
            >活动</span>
            <span
              style="padding-left: 5px; color: rgb(29 33 41)"
              :underline="false"
            >{{ item.title }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { list } from '@/api/notice/index'
export default {
  components: {},
  data() {
    return {
      noticeData: [],
      listQuery: {
        size: 10,
        page: 1
      }
    }
  },
  mounted() {
    this.getNotice()
  },
  methods: {
    getNotice() {
      list(this.listQuery).then((res) => {
        console.log(res.data.items)
        this.noticeData = res.data.items
        this.listQuery.page = res.data.page
        this.listQuery.size = res.data.size
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group-right {
  width: 100%;
  margin-top: 10px;
  padding-left: 10px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.waring-text {
  color: #249EFF;
}
</style>
