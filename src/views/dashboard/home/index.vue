<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="20">
        <!-- <el-carousel v-if="noticeData.length > 0" height="50px" direction="vertical" :autoplay="true" style="background: #FFF;line-height: 50px;">
          <el-carousel-item v-for="item in noticeData" :key="item">
            <div style="color: red;margin-left: 10px;font-size: 10px;">{{ item.title }}</div>
          </el-carousel-item>
        </el-carousel> -->

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
      </el-col>
      <el-col :span="4" style="padding-right:10px;">
        <el-col :span="24">
          <panel-group-rigth />
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { home } from '@/api/home/index'
import LineChart from './components/LineChart'
import PanelGroup from './components/PanelGroup'
import PanelGroupRigth from './components/PanelGroupRigth'
export default {
  name: 'Home',
  components: {
    PanelGroup,
    LineChart,
    PanelGroupRigth
  },
  data() {
    return {
      lineChartData: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData()
    })
  },
  methods: {
    async getData() {
      const res = await home()
      this.lineChartData = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin-left: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

</style>
