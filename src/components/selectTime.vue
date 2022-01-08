<template>
  <div>
    <el-form-item label="发布时间：" class="width100">
<!--      <el-radio-group
        v-model="listQuery.created_at"
        type="button"
        class="mr20"
        size="small"
        clearable
        @change="selectChange(listQuery.created_at)"
      >
        <el-radio-button
          v-for="(item,i) in fromList.fromTxt"
          :key="i"
          :label="item.val"
        >{{ item.text }}</el-radio-button>
      </el-radio-group>-->
<!--      <el-date-picker
        v-model="timeVal"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        size="small"
        type="daterange"
        placement="bottom-end"
        placeholder="自定义时间"
        style="width: 250px;margin-left: 20px;"
        clearable
        @change="onchangeTime"
      />-->
      <el-date-picker
        v-model="timeVal"
        value-format="yyyy/MM/dd"
        align="right"
        unlink-panels
        format="yyyy/MM/dd"
        size="small"
        type="daterange"
        placement="bottom-end"
        placeholder="自定义时间"
        class="selWidth"
        :picker-options="pickerOptions"
        @change="onchangeTime"
      />
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'SelectTime',
  data() {
    return {
      listQuery: {
        created_at: 'all'
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)))
              end.setTime(end.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())))
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近7天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), 1)))
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本年',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.setTime(new Date(new Date().getFullYear(), 0, 1)))
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      timeVal: [],
      fromList: {
        title: '注册时间',
        custom: true,
        fromTxt: [
          { text: '全部', val: 'all' },
          { text: '今天', val: 'today' },
          { text: '昨天', val: 'yesterday' },
          { text: '最近7天', val: 'lately7' },
          { text: '最近30天', val: 'lately30' },
          { text: '本月', val: 'month' },
          { text: '本年', val: 'year' }
        ]
      }
    }
  },
  methods: {
    // 选择时间
    selectChange(tab) {
      this.timeVal = []
      this.listQuery.created_at = tab
      this.$emit('on-changed', this.listQuery)
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e
      this.listQuery.created_at = e ? this.timeVal.join(' - ') : 'all'
      this.$emit('on-changed', this.listQuery)
    }
  }
}
</script>

<style scoped>

</style>
