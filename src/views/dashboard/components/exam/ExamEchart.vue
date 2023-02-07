<template>
  <div class="dashboard-card">
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span class="card-title">答题统计</span>
      </div>
      <div class="charts-box">
        <qiun-vue-ucharts
          type="column"
          :opts="opts"
          :chart-data="chartData"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import qiunVueUcharts from '@qiun/vue-ucharts'

export default {
  components: {
    qiunVueUcharts
  },
  data() {
    return {
      chartData: {},
      opts: {
        title: {
          name: '用户答题统计',
          color: '#EA7C7CFF'
        },
        color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
        padding: [15, 15, 0, 5],
        enableScroll: false,
        enableMarkLine: true,
        legend: {
        },
        xAxis: {
          disableGrid: true,
          title: '日期',
          titleOffsetX: '-20'
        },
        yAxis: {
          showTitle: true,
          data: [
            {
              min: 0,
              title: '人数'
            }
          ]
        },
        extra: {
          column: {
            type: 'group',
            width: 30,
            activeBgColor: '#000000',
            activeBgOpacity: 0.08,
            seriesGap: 5,
            barBorderRadius: [
              6,
              6,
              6,
              6
            ]
          },
          markLine: {
            data: [
              {
                value: 21,
                showLabel: true
              }
            ]
          }
        }
      }
    }
  },
  mounted() {
    this.getServerData()
  },
  methods: {
    getServerData() {
      // 模拟从服务器获取数据时的延时
      setTimeout(() => {
        // 模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        const res = {
          categories: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'],
          series: [
            {
              name: '单选题',
              data: [35, 36, 31, 33, 13, 34, 23, 3, 43, 109]
            },
            {
              name: '问答题',
              data: [18, 27, { 'value': 21, 'color': '#EE6666' }, 24, 6, 28, 24, 6, 28, 100]
            },
            {
              name: '完整答题',
              data: [35, 156, 31, 33, 13, 894, 23, 3, 789, 894]
            }
          ]
        }
        this.chartData = JSON.parse(JSON.stringify(res))
      }, 500)
    }
  }
}
</script>

<style scoped>
.charts-box {
  width: 100%;
  height: auto;
}

.card-title {
  font-weight: 600;
  font-size: 20px;
}
</style>
