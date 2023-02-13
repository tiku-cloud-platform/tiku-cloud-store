<template>
  <div class="app-container">
    <el-row>
      <top />
    </el-row>
    <el-row>
      <op-menu />
    </el-row>
    <el-col>
      <order-chart />
    </el-col>
    <el-col>
      <exam-chart />
    </el-col>
  </div>
</template>

<script>
import Top from './components/top/DashBoardTop'
import OpMenu from './components/menu/Menu'
import ExamChart from './components/exam/ExamEchart'
import OrderChart from './components/order/OrderEchart'

export default {
  name: 'Dashboard',
  components: { Top, OpMenu, ExamChart, OrderChart },
  data() {
    return {}
  },
  mounted() {
    this.showLoading()
  },
  methods: {
    showLoading() {
      const loading = this.$loading({
        lock: true,
        text: '数据正在努力加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard-card {
  margin-bottom: 20px;
}
</style>
