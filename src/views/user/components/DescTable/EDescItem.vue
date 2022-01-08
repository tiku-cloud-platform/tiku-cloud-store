<template>
  <el-col :span="computedSpan" class="desc-item">
    <div class="desc-item-content" :class="size">
      <label class="desc-item-label" :style="{width: labelWidth}" v-html="label" />
      <div v-if="$slots" class="desc-item-value">
        <!-- 纯文本 -->
        <slot v-if="$slots.default && $slots.default[0].text" />
        <!-- HTML -->
        <slot v-else-if="$slots.content" name="content" />
        <span v-else>暂无数据</span>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'EDescItem',
  inject: ['labelWidth', 'column', 'size'],
  props: {
    span: {
      type: [Number, String],
      required: false,
      default: 0
    },
    label: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      // 子组件自己的span
      selfSpan: 0
    }
  },
  computed: {
    computedSpan() {
      // 子组件自己的span，用于父组件计算修改span
      if (this.selfSpan) {
        return 24 / this.column * this.selfSpan
      } else if (this.span) {
        // props传递的span
        return 24 / this.column * this.span
      } else {
        // 未传递span时，取column
        return 24 / this.column
      }
    }
  }
}
</script>

<style scoped lang="scss">
.desc-item {
  border-right: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
  .desc-item-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    line-height: 1.5;
    width: 100%;
    background-color: #fafafa;
    height: 100%;
    .desc-item-label{
      border-right: 1px solid #EBEEF5;
      display: inline-block;
      padding: 12px 16px;
      flex-grow: 0;
      flex-shrink: 0;
      color: rgba(0, 0, 0, 0.6);
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .desc-item-value{
      background: #fff;
      padding: 4px 16px;
      flex-grow: 1;
      overflow: hidden;
      word-break: break-all;
      height: 100%;
      display: flex;
      align-items: center;
      color: #444;
      span{
        color: #aaa;
      }
    }
    &.small {
      .desc-item-label,
      .desc-item-value {
        padding: 10px 14px;
      }
    }
  }
}
</style>
