<template>
  <div class="dashboard-card">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-card shadow="hover">
          <div @click="menuRedirect('/user/user')">
            <svg-icon icon-class="dashboard-menu-user" class-name="icon-size" />
          </div>
          <div class="dashboard-card-title" @click="menuRedirect('/user/user')">用户管理</div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card shadow="hover">
          <div @click="menuRedirect('/exam/collection/list')">
            <svg-icon icon-class="dashboard-menu-question" class-name="icon-size" />
          </div>
          <div class="dashboard-card-title" @click="menuRedirect('/exam/collection/list')">试卷管理</div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card shadow="hover">
          <div @click="menuRedirect('/marketing/score/history/list')">
            <svg-icon icon-class="dashboard-menu-activity" class-name="icon-size" />
          </div>
          <div class="dashboard-card-title" @click="menuRedirect('/marketing/score/history/list')">营销活动</div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card shadow="hover">
          <div @click="menuRedirect('/book/book/list')">
            <svg-icon icon-class="dashboard-menu-book" class-name="icon-size" />
          </div>
          <div class="dashboard-card-title" @click="menuRedirect('/book/book/list')">在线教程</div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card shadow="hover">
          <div @click="menuRedirect('/cms/article/list')">
            <svg-icon icon-class="dashboard-menu-article" class-name="icon-size" />
          </div>
          <div class="dashboard-card-title" @click="menuRedirect('/cms/article/list')">文章管理</div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card shadow="hover">
          <div @click="menuRedirect('/score/history/list')">
            <svg-icon icon-class="dashboard-menu-score" class-name="icon-size" />
          </div>
          <div class="dashboard-card-title" @click="menuRedirect('/score/history/list')">积分管理</div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card shadow="hover">
          <div @click="menuRedirect('/user/user')">
            <svg-icon icon-class="dashboard-menu-order" class-name="icon-size" />
          </div>
          <div class="dashboard-card-title" @click="menuRedirect('/user/user')">订单管理</div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card shadow="hover">
          <div @click="menuRedirect('/setting/wechat/config')">
            <svg-icon icon-class="dashboard-menu-setting" class-name="icon-size" />
          </div>
          <div class="dashboard-card-title" @click="menuRedirect('/setting/wechat/config')">系统设置</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: {}
    }
  }, methods: {
    menuRedirect(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard-card {
  text-align: center;
}

.icon-size {
  font-size: 40px;
}

.dashboard-card-title {
  font-size: 14px;
  margin-top: 10px;
}
</style>
