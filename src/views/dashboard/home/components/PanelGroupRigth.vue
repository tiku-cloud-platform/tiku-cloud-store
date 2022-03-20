<template>
  <el-row class="panel-group-right">
    <el-col :span="24">
      <el-card class="box-card">
        <div class="clearfix">
          <el-text
            style="font-weight: 500; color: rgb(29 33 41); font-size: 16px"
          >系统公告</el-text>
          <span class="text" style="float: right">
            <el-link type="primary" :underline="false">查看更多</el-link>
          </span>
        </div>
        <div style="padding-top: 10px">
          <div v-for="item in noticeData" :key="item" class="text item">
            <el-text
              class="waring-text"
              underline="false"
            >活动</el-text>
            <el-text
              style="padding-left: 5px; color: rgb(29 33 41)"
              :underline="false"
            >{{ item.title }}</el-text>
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
      noticeData: []
    }
  },
  mounted() {
    this.getNotice()
  },
  methods: {
    getNotice() {
      list().then((res) => {
        console.log(res.data.items)
        this.noticeData = res.data.items
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
