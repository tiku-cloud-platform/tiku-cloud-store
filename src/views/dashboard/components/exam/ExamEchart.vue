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
          categories: ['2023-02-05', '2023-02-06', '2023-02-07', '2023-02-08', '2023-02-09', '2023-02-10', '2023-02-11'],
          series: [
            {
              name: '单选题',
              data: [568, 689, 1569, 897, 1056, 0, 0]
            },
            {
              name: '问答题',
              data: [15687, 1897, 2687, 2065, 899, 0, 0]
            },
            {
              name: '完整答题',
              data: [456, 568, 899, 587, 899, 0, 0]
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
