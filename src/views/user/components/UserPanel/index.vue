<template>
  <div style="margin: -21px -50px;">
    <el-table
      :key="tableKey"
      :data="tableData.items"
      empty-text="暂无数据"
      highlight-current-row
      style="width: 100%;"
    >

      <el-table-column
        v-for="(item, index) in tableColumn"
        :key="index"
        :prop="item.key"
        :label="item.label"
        width="auto"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="{ row }">
          <span v-if="row[item.key] === -1"><el-button type="text">未使用</el-button></span>
          <span v-else-if="row[item.key] === -2"><el-button type="text">已使用</el-button></span>
          <span v-else>{{ row[item.key] }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'UserPanel',
  props: {
    tableColumn: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableKey: 0
    }
  }
}
</script>

<style scoped>

</style>
