<template>
  <div class="dashboard-card">
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span class="card-title">订单统计</span>
      </div>
      <div class="charts-box">
        <qiun-vue-ucharts
          type="line"
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
      // 您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
        padding: [15, 10, 0, 15],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true,
          title: '日期',
          titleOffsetX: '-20'
        },
        yAxis: {
          gridType: 'dash',
          dashLength: 2,
          showTitle: true,
          data: [
            {
              min: 0,
              title: '订单量'
            }
          ]
        },
        extra: {
          line: {
            type: 'straight',
            width: 2,
            activeType: 'hollow'
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
              name: '交易金额',
              data: [568.32, 697.65, 103.98, 1895.36, 2000.10, 0.00, 0.00]
            },
            {
              name: '完成订单',
              data: [70, 40, 65, 100, 102, 0, 0]
            },
            {
              name: '退款订单',
              data: [4, 5, 10, 1, 3, 0, 0]
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
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: auto;
}

.card-title {
  font-weight: 600;
  font-size: 20px;
}
</style>
