<template>
  <div>
    <el-select
      v-model="selectValue"
      :disabled="disabled"
      :multiple="multiple"
      clearable
      filterable
      remote
      :remote-method="remoteSearch"
      placeholder="请选择"
      style="width: 90%"
      @change="handleChange"
      @visible-change="handleVisible"
    >
      <div v-if="!group" class="option">
        <el-option
          v-for="item in options"
          :key="item.uuid"
          :label="item.title"
          :value="item.uuid"
        />
      </div>
      <div v-else class="option">
        <el-option-group
          v-for="g in options"
          :key="g.title"
          :label="g.title"
        >
          <el-option
            v-for="item in g.children"
            :key="item.uuid"
            :label="item.title"
            :value="item.uuid"
          />
        </el-option-group>
      </div>
      <div v-if="total > size" class="page">
        <el-pagination small layout="prev, pager, next, total" :page-size="size" :total="total" :current-page="page" @current-change="nextPage" />
      </div>
    </el-select>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'SelectPage',
  components: {},
  props: {
    // 绑定的值（双向绑定显示的值）
    select: {
      type: [String, Array],
      required: true
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 请求地址
    url: {
      type: String,
      required: true
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否分组
    group: {
      type: Boolean,
      default: false
    },
    // 模糊查询关键字
    filterKey: {
      type: String,
      default: ''
    },
    // 下拉修改时使用到的参数
    editInfo: {
      type: Object,
      default: () => {}
    },
    // 回调函数
    callback: {
      type: Function
    }
  },
  data() {
    // 这里存放数据
    return {
      options: [],
      selectValue: [],
      page: 1,
      size: 5,
      total: 0
    }
  },
  mounted() {
    // 函数调用顺序要在options赋值为空数组之后
    this.initData()
    this.getOptionList()
  },
  // 方法集合
  methods: {
    // 处理值改变事件
    handleChange(value) {
      this.$emit('update:select', value)
    },
    // 下拉框隐藏事件
    handleVisible(val) {
      // 下拉框隐藏后重新加载下拉数据
      if (!val) {
        this.getOptionList()
      }
    },
    // 过滤，实现模糊查询
    remoteSearch(value = '') {
      let params = {}
      if (value) {
        params = {
          title: value
        }
      }
      this.getOptionList(params)
    },
    // 获取列表数据
    getOptionList(query = {}) {
      const params = Object.assign({
        size: this.size,
        page: this.page
      }, query)
      request({ url: this.url, method: 'get', params }).then(res => {
        this.total = res.data.total
        this.options = res.data.items
        console.log(this.options)
      })
      // 这里主要针对修改操作，如果当前下拉显示的值没有在下拉选项数组里（因为options数组里的值是会变化的）
      // 显示时会将value转换成字符串然后显示，所有将这条修改的数据添加到选项数组中
      if (this.select && (JSON.stringify(this.select)) !== '{}') {
        // this.options.push(this.editInfo)
        const test = {
          title: 'PHP函数专项训练',
          uuid: 'd1d87105-b977-1ba2-a27e-7c76fc68cf74'
        }
        this.options.push(test)
        console.log(this.options)
      }
    },
    // 初始化数据
    initData() {
      // 当父组件上存在值时，对select值进行初始化
      setTimeout(() => {
        this.selectValue = this.select
      }, 500)
    },
    // 主表格分页点击事件
    nextPage(page) {
      console.log(page)
      this.page = page
      this.getOptionList() // 更新
    }
  }
}
</script>
<style lang="scss" scoped>
.option{
  min-height: 50px;
  height: auto;
  max-height: 150px;
  overflow-y: auto;
}
.page{
  background:#fff;
}
::-webkit-scrollbar{
  width: 2px;
}
</style>
