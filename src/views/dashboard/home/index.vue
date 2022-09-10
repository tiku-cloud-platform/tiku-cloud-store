<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="19">
        <panel-group
          :exam-submit-number="lineChartData.exam_submit_number"
          :exam-number="lineChartData.exam_number"
          :register-number="lineChartData.register_number"
          :now-incr-number="lineChartData.now_incr_number"
        />
        <el-row style="background:#fff;padding-top:16px;margin-bottom:15px;">
          图形统计
        </el-row>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          图形统计
        </el-row>
      </el-col>
      <el-col :span=5 style="padding-right:10px;">
        <el-col :span=24>
          <panel-group-rigth />
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { home } from '@/api/home/index'
import PanelGroup from './components/PanelGroup'
import PanelGroupRigth from './components/PanelGroupRigth'
export default {
  name: 'Home',
  components: {
    PanelGroup,
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
