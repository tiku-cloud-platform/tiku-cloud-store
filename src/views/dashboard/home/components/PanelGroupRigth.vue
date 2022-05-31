<template>
  <el-row class="panel-group-right">
    <el-col :span="24">
      <el-card class="box-card">
        <el-row class="clearfix">
          <div style="font-weight: 500; color: rgb(29 33 41); font-size: 16px;">系统公告</div>
          <span class="text" style="float: right">
            <el-link type="primary" :underline="false">查看更多</el-link>
          </span>
        </el-row>
        <el-row style="height:40px;line-height:40px;display:flex;width:100%;" :span="24">
          <el-row v-for="item,key in noticeData" :key="key" class="text item" :span="24">
            <el-col
              class="notice-category-title"
              underline="false"
              span="4"
            >活动</el-col>
            <el-col
              class="notice-title"
              span="20"
              style="color: rgb(29 33 41)"
              :underline="false"
            >{{ item.title }}</el-col>
          </el-row>
        </el-row>
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
  width: 100%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.notice-category-title {
  color: #249EFF;
}

.notice-title {
  overflow: hidden;
  word-break: keep-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
