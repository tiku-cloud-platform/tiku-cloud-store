<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%"
    :highlight-current-row="true"
    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
  >
    <el-table-column
      prop="order_id"
      label="订单编号"
      align="center"
    />
    <el-table-column
      prop="order_type"
      label="订单类型"
      align="center"
    />
    <el-table-column
      prop="order_total_money"
      label="订单总金额"
      align="center"
    />
    <el-table-column
      prop="order_pay_money"
      label="实际付款金额"
      align="center"
    />
    <el-table-column
      prop="order_pay_status"
      label="支付状态"
      align="center"
    />
    <el-table-column
      prop="order_refund_status"
      label="退款状态"
      align="center"
    />
    <el-table-column
      prop="order_is_score"
      label="是否积分抵扣"
      align="center"
    />
    <el-table-column
      prop="order_score"
      label="抵扣积分"
      align="center"
      fixed="right"
    />
    <el-table-column
      prop="order_time"
      label="下单时间"
      align="center"
      fixed="right"
    />
    <el-table-column
      prop="order_pay_time"
      label="支付时间"
      fixed="right"
    />
    <el-table-column
      prop="order_finish_pay_time"
      label="支付完成时间"
      align="center"
      fixed="right"
    />
  </el-table>
</template>

<script>
export default {
  name: 'Order',
  data() {
    return {
      loading: false,
      tableData: [{
        order_id: '1290342202302120100568794',
        order_type: '商城订单',
        order_total_money: 89.65,
        order_pay_money: 81.01,
        order_pay_status: '已付款',
        order_refund_status: '未退款',
        order_is_score: '是',
        order_score: 10.01,
        order_time: '2023-02-11 12:12:12',
        order_pay_time: '2023-02-11 12:12:12',
        order_finish_pay_time: '2023-02-11 12:12:12'
      },
      {
        order_id: '1290342202302120100568794',
        order_type: '商城订单',
        order_total_money: 89.65,
        order_pay_money: 81.01,
        order_pay_status: '已付款',
        order_refund_status: '未退款',
        order_is_score: '是',
        order_score: 10.01,
        order_time: '2023-02-11 12:12:12',
        order_pay_time: '2023-02-11 12:12:12',
        order_finish_pay_time: '2023-02-11 12:12:12'
      },
      {
        order_id: '1290342202302120100568794',
        order_type: '商城订单',
        order_total_money: 89.65,
        order_pay_money: 81.01,
        order_pay_status: '已付款',
        order_refund_status: '未退款',
        order_is_score: '是',
        order_score: 10.01,
        order_time: '2023-02-11 12:12:12',
        order_pay_time: '2023-02-11 12:12:12',
        order_finish_pay_time: '2023-02-11 12:12:12'
      },
      {
        order_id: '1290342202302120100568794',
        order_type: '商城订单',
        order_total_money: 89.65,
        order_pay_money: 81.01,
        order_pay_status: '已付款',
        order_refund_status: '未退款',
        order_is_score: '是',
        order_score: 10.01,
        order_time: '2023-02-11 12:12:12',
        order_pay_time: '2023-02-11 12:12:12',
        order_finish_pay_time: '2023-02-11 12:12:12'
      },
      {
        order_id: '1290342202302120100568794',
        order_type: '商城订单',
        order_total_money: 89.65,
        order_pay_money: 81.01,
        order_pay_status: '已付款',
        order_refund_status: '未退款',
        order_is_score: '是',
        order_score: 10.01,
        order_time: '2023-02-11 12:12:12',
        order_pay_time: '2023-02-11 12:12:12',
        order_finish_pay_time: '2023-02-11 12:12:12'
      },
      {
        order_id: '1290342202302120100568794',
        order_type: '商城订单',
        order_total_money: 89.65,
        order_pay_money: 81.01,
        order_pay_status: '已付款',
        order_refund_status: '未退款',
        order_is_score: '是',
        order_score: 10.01,
        order_time: '2023-02-11 12:12:12',
        order_pay_time: '2023-02-11 12:12:12',
        order_finish_pay_time: '2023-02-11 12:12:12'
      },
      {
        order_id: '1290342202302120100568794',
        order_type: '商城订单',
        order_total_money: 89.65,
        order_pay_money: 81.01,
        order_pay_status: '已付款',
        order_refund_status: '未退款',
        order_is_score: '是',
        order_score: 10.01,
        order_time: '2023-02-11 12:12:12',
        order_pay_time: '2023-02-11 12:12:12',
        order_finish_pay_time: '2023-02-11 12:12:12'
      }]
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
