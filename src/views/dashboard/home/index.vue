<template>
  <div class="dashboard-container">

    <el-carousel v-if="noticeData.length > 0" height="50px" direction="vertical" :autoplay="true" style="background: #FFF;line-height: 50px;">
      <el-carousel-item v-for="item in noticeData" :key="item">
        <div style="color: red;margin-left: 10px;font-size: 10px;">{{ item.title }}</div>
      </el-carousel-item>
    </el-carousel>

    <panel-group
      :exam-submit-number="lineChartData.exam_submit_number"
      :exam-number="lineChartData.exam_number"
      :register-number="lineChartData.register_number"
      :now-incr-number="lineChartData.now_incr_number"
    />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart v-if="lineChartData.register_people_number_list !== ''" :chart-data="lineChartData.register_people_number_list" />
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart v-if="lineChartData.exam_submit_number_list !== ''" :chart-data="lineChartData.exam_submit_number_list" />
    </el-row>
  </div>
</template>

<script>
import { home } from '@/api/home/index'
import { list } from '@/api/notice/index'
import LineChart from './components/LineChart'
import PanelGroup from './components/PanelGroup'
export default {
  name: 'Home',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: [],
      noticeData: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData()
      this.getNotice()
    })
  },
  methods: {
    async getData() {
      const res = await home()
      this.lineChartData = res.data
    },
    getNotice() {
      list().then(res => {
        this.noticeData = res.data.items
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

</style>
