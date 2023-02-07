<template>
  <div class="dashboard-card">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="card-title">订单销量</span>
            <el-button style="float: right;" size="mini" type="success" plain>昨日</el-button>
          </div>
          <div>
            <el-row style="font-size: 20px; font-weight: 400;margin-bottom: 30px;">
              <span>434.01</span>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="8">日环比 2888.04% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: red;" /></el-col>
              <el-col :span="8">日环比 2888.04% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: green;" />
              </el-col>
            </el-row>
          </div>
          <el-divider />
          <div>
            <el-row>
              <el-col :span="12"><span>本月销售额</span></el-col>
              <el-col :span="12" style="text-align: right;"><span>12365.36</span></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="card-title">用户访问量</span>
            <el-button style="float: right;" size="mini" type="success" plain>昨日</el-button>
          </div>
          <div>
            <el-row style="font-size: 20px; font-weight: 400;margin-bottom: 30px;">
              <span>434.01</span>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="8">日环比 2888.04% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: red;" /></el-col>
              <el-col :span="8">日环比 2888.04% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: green;" />
              </el-col>
            </el-row>
          </div>
          <el-divider />
          <div>
            <el-row>
              <el-col :span="12"><span>本月销售额</span></el-col>
              <el-col :span="12" style="text-align: right;"><span>12365.36</span></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="card-title">销售量</span>
            <el-button style="float: right;" size="mini" type="success" plain>昨日</el-button>
          </div>
          <div>
            <el-row style="font-size: 20px; font-weight: 400;margin-bottom: 30px;">
              <span>434.01</span>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="8">日环比 2888.04% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: red;" /></el-col>
              <el-col :span="8">日环比 2888.04% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: green;" />
              </el-col>
            </el-row>
          </div>
          <el-divider />
          <div>
            <el-row>
              <el-col :span="12"><span>本月销售额</span></el-col>
              <el-col :span="12" style="text-align: right;"><span>12365.36</span></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="card-title">新增用户</span>
            <el-button style="float: right;" size="mini" type="success" plain>昨日</el-button>
          </div>
          <div>
            <el-row style="font-size: 20px; font-weight: 400;margin-bottom: 30px;">
              <span>434.01</span>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="8">日环比 2888.04% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: red;" /></el-col>
              <el-col :span="8">日环比 2888.04% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: green;" />
              </el-col>
            </el-row>
          </div>
          <el-divider />
          <div>
            <el-row>
              <el-col :span="12"><span>本月销售额</span></el-col>
              <el-col :span="12" style="text-align: right;"><span>12365.36</span></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: {}
    }
  }
}
</script>

<style scoped lang="scss">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.card-title {
  font-weight: 600;
  font-size: 20px;
}
</style>
