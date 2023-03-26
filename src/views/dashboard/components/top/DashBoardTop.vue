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
              <span>156</span>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="8">日环比 20.89% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: green;" /></el-col>
              <el-col :span="8">月环比 12.09% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: green;" />
              </el-col>
            </el-row>
          </div>
          <el-divider />
          <div>
            <el-row>
              <el-col :span="12"><span>本月销售额</span></el-col>
              <el-col :span="12" style="text-align: right;"><span>8978.32</span></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="card-title">会员答题总量</span>
            <el-button style="float: right;" size="mini" type="success" plain>昨日</el-button>
          </div>
          <div>
            <el-row style="font-size: 20px; font-weight: 400;margin-bottom: 30px;">
              <span>894</span>
            </el-row>
            <el-row :gutter="2">
              <el-col :span="8">日环比 23.32% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: green;" /></el-col>
              <el-col :span="8">月环比 45.63% &nbsp;&nbsp;<i class="el-icon-caret-top" style="color: green;" />
              </el-col>
            </el-row>
          </div>
          <el-divider />
          <div>
            <el-row>
              <el-col :span="12"><span>本月会员答题总量</span></el-col>
              <el-col :span="12" style="text-align: right;"><span>15687</span></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="card-title">会员访问总量</span>
            <el-button style="float: right;" size="mini" type="success" plain>昨日</el-button>
          </div>
          <div>
            <el-row style="font-size: 20px; font-weight: 400;margin-bottom: 30px;">
              <span>{{ user.visitor.yesterday }}</span>
            </el-row>
            <el-row :gutter="2">
              <el-col v-if="user.visitor.yesterday_circular_ratio <0" :span="8">日环比 {{ user.visitor.yesterday_circular_ratio + `%` }} &nbsp;&nbsp;
                <i class="el-icon-caret-bottom" style="color: red;" />
              </el-col>
              <el-col v-if="user.visitor.yesterday_circular_ratio >=0" :span="8">日环比  {{ user.visitor.yesterday_circular_ratio + `%` }} &nbsp;&nbsp;
                <i class="el-icon-caret-top" style="color: green;" />
              </el-col>
              <el-col v-if="user.visitor.current_month_circular_ratio <0" :span="8">月环比 {{ user.visitor.current_month_circular_ratio + `%` }} &nbsp;&nbsp;
                <i class="el-icon-caret-bottom" style="color: red;" />
              </el-col>
              <el-col v-if="user.visitor.current_month_circular_ratio >=0" :span="8">月环比 {{ user.visitor.current_month_circular_ratio + `%` }} &nbsp;&nbsp;
                <i class="el-icon-caret-top" style="color: green;" />
              </el-col>
            </el-row>
          </div>
          <el-divider />
          <div>
            <el-row>
              <el-col :span="12"><span>本月会员访问总量</span></el-col>
              <el-col :span="12" style="text-align: right;"><span>{{ user.visitor.current_month }}</span></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="card-title">新增会员</span>
            <el-button style="float: right;" size="mini" type="success" plain>昨日</el-button>
          </div>
          <div>
            <el-row style="font-size: 20px; font-weight: 400;margin-bottom: 30px;">
              <span>{{ user.increment.yesterday }}</span>
            </el-row>
            <el-row :gutter="2">
              <el-col v-if="user.increment.yesterday_circular_ratio <0" :span="8">日环比 {{ user.increment.yesterday_circular_ratio + `%` }} &nbsp;&nbsp;
                <i class="el-icon-caret-bottom" style="color: red;" />
              </el-col>
              <el-col v-if="user.increment.yesterday_circular_ratio >=0" :span="8">日环比  {{ user.increment.yesterday_circular_ratio + `%` }} &nbsp;&nbsp;
                <i class="el-icon-caret-top" style="color: green;" />
              </el-col>
              <el-col v-if="user.increment.current_month_circular_ratio <0" :span="8">月环比 {{ user.increment.current_month_circular_ratio + `%` }} &nbsp;&nbsp;
                <i class="el-icon-caret-bottom" style="color: red;" />
              </el-col>
              <el-col v-if="user.increment.current_month_circular_ratio >=0" :span="8">月环比 {{ user.increment.current_month_circular_ratio + `%` }} &nbsp;&nbsp;
                <i class="el-icon-caret-top" style="color: green;" />
              </el-col>
            </el-row>
          </div>
          <el-divider />
          <div>
            <el-row>
              <el-col :span="12"><span>本月新增会员</span></el-col>
              <el-col :span="12" style="text-align: right;"><span>{{ user.increment.current_month }}</span></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { user } from '@/api/dashboard/user'
export default {
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    // 获取用户指标
    getUser() {
      user({}).then(res => {
        this.user = res.data
      })
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
