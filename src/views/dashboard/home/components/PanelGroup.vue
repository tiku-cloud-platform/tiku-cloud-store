<template>
  <el-row :gutter="40" class="panel-group" style="margin-left: -4px;">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="padding-left:5px;">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people" style="background: #40c9c6;">
          <svg-icon icon-class="xinzeng" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">新增人数</div>
          <count-to :start-val="0" :end-val="nowIncrNumber" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="padding-left:5px;">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message" style="background: #36a3f7;">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">注册人数</div>
          <count-to :start-val="0" :end-val="registerNumber" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="padding-left:5px;">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money" style="background: #f4516c;">
          <svg-icon icon-class="message" class-name="card-panel-icon" style="color: #FFF;" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">试题总数</div>
          <count-to :start-val="0" :end-val="examNumber" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="padding-left:5px;">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping" style="background: #34bfa3;">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">答题人数</div>
          <count-to :start-val="0" :end-val="examSubmitNumber" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    examSubmitNumber: {
      type: Number,
      default: 0
    },
    examNumber: {
      type: Number,
      default: 0
    },
    registerNumber: {
      type: Number,
      default: 0
    },
    nowIncrNumber: {
      type: Number,
      default: 0
    }
  }
  // methods: {
  //   handleSetLineChartData(type) {
  //     this.$emit('handleSetLineChartData', type)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 10px;

  .card-panel-col {
    margin-bottom: 5px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
      color: #fff;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
