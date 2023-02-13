<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div class="app-container-top">
        <el-card shadow="never">
          <div style="display: flex;">
            <div class="left-avatar">
              <img
                src="http://qiniucloud.qqdeveloper.com/4109ce02ce626d9cea3189654d099c16.jpeg"
                alt="用户头像"
              >
            </div>
            <div class="left-text">
              <span class="user-nickname">{{ userInfo.real_name }}</span>
              <el-row :gutter="4">
                <el-col :span="2">
                  <el-button type="text">实名信息</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button type="text">变动积分</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button type="text">会员等级</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <el-divider />
          <div class="user-basic-info">
            <el-row :span="4">
              <el-col :span="4">
                <el-button type="text" style="color: #333;">用户ID: {{ userInfo.id }}</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">用户姓名: {{ userInfo.real_name }}</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">用户手机: {{ userInfo.mobile }}</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">用户年龄: {{ userInfo.age }}</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">用户生日: {{ userInfo.birthday }}</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">会员等级: {{ userInfo.group.title }}</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">会员到期: 无限制</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">用户积分: {{ userInfo.score.score }}</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">注册日期: {{ userInfo.created_at }}</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">注册IP: {{ userInfo.register_ip }}</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">用户地址: {{ userInfo.address }}</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">最近登录: {{ userInfo.updated_at }}</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" style="color: #333;">用户描述: {{ userInfo.remark }}</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      <div class="app-container-bottom">
        <el-card shadow="never">
          <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="注册端口" name="first">
              <client />
            </el-tab-pane>
            <el-tab-pane label="积分明细" name="second" :lazy="true">
              <score />
            </el-tab-pane>
            <el-tab-pane label="订单明细" name="third">
              <Order />
            </el-tab-pane>
            <el-tab-pane label="答题历史" name="fourth">
              <Exam />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import Client from './info/Client'
import Score from './info/Score'
import Order from './info/Order'
import Exam from './info/Exam'
import { getAllInfo as UserInfo } from '@/api/user/user'
export default {
  name: 'UserDetail',
  components: {
    Client,
    Score,
    Order,
    Exam
  },
  data() {
    return {
      uuid: '',
      userInfo: {},
      activeName: 'first'
    }
  },
  created() {
    if (this.$route.params.uuid) {
      this.uuid = this.$route.params.uuid
      this.getUserInfo()
    }
  },
  methods: {
    getUserInfo() {
      UserInfo({ user_uuid: this.uuid }).then(res => {
        this.userInfo = res.data
      })
    },
    handleTabClick(tab, event) {

    }
  }
}
</script>

<style scoped lang="scss">
.divBox {
      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent
}
.app-container-top {
  //height: 100px;
}

.left-avatar{
  width: 50px;
  height: 50px;
}

.left-avatar > img{
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.left-text {
  margin-left: 40px;
  width: 90%;
}

.user-nickname {
  font-size: 18px;
  font-weight: 600;
  padding-top: 30px;
}

.user-basic-info {
  color: #333;
}

.app-container-bottom {
  margin-top: 10px;
}
</style>
