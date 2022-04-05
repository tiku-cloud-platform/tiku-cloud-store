<template>
  <div class="divBox">
    <el-card class="box-card">
      <el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn" style="margin-bottom: 20px;" @click="back">返回</el-button>
      <el-form ref="formValidate" class="form" :model="formValidate" label-width="120px" :rules="ruleValidate" @submit.native.prevent>
        <div class="dividerTitle">
          <span class="title mr10">基本信息</span>
          <el-divider />
        </div>
        <el-row :gutter="10">
          <el-col :span="grid" style="width: 45%">
            <el-form-item label="推广组：" prop="channel_group_uuid">
              <select-page :select.sync="formValidate.channel_group_uuid" url="store/channel/group/list?status=1" :group="false" :multiple="false" />
            </el-form-item></el-col>
          <el-col v-bind="grid">
            <el-form-item label="渠道名称：" prop="title" label-for="title">
              <el-input v-model.trim="formValidate.title" placeholder="请输入推广渠道名称" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="备注：" prop="remark" label-for="remark">
              <el-input v-model="formValidate.remark" type="textarea" autosize placeholder="请输入推广渠道描述信息" style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="自定义推广码：" prop="file_uuid">
              <div class="upLoadPicBox" @click="modalPicTap('1')">
                <div v-if="formValidate.file_uuid" class="pictrue"><img :src="formValidate.img_url"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dividerTitle">
          <span class="title">其他设置</span>
          <el-divider />
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="启用状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio :label="1" class="radio">启用</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" class="submission" @click="onsubmit('formValidate')">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 内容
import { add, edit, show } from '@/api/statistics/channel'
import SelectPage from '@/components/SelectPage'
export default {
  name: 'SaveMessageCategory',
  components: { SelectPage },
  data() {
    return {
      grid: {
        xl: 10,
        lg: 10,
        md: 10,
        sm: 24,
        xs: 24
      },
      formValidate: {
        uuid: '',
        img_url: '',
        title: '',
        file_uuid: '',
        is_show: 1,
        remark: '',
        channel_group_uuid: ''
      },
      ruleValidate: {
        title: [{ required: true, message: '请填写推广渠道名称', trigger: 'blur' }],
        channel_group_uuid: [{ required: true, message: '请选择推广组', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
    if (this.$route.params.uuid) {
      this.getDetails()
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push({ path: `/marketing/marketing/list` })
    },
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.formValidate.img_url = img.file_url
        _this.formValidate.file_uuid = img.file_uuid
      }, tit)
    },
    // 提交数据
    onsubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.$route.params.uuid) {
            edit(this.formValidate).then(async message => {
              this.$message.success(message)
              setTimeout(() => {
                this.back()
              }, 500)
            })
          } else {
            add(this.formValidate).then((message) => {
              this.$message.success(message)
              setTimeout(() => {
                this.back()
              }, 500)
            })
          }
        } else {
          return false
        }
      })
    },
    // 详情
    getDetails() {
      show({ uuid: this.$route.params.uuid }).then(async res => {
        const data = res.data
        this.formValidate = {
          img_url: data.file_info !== null ? data.file_info.file_url + data.file_info.file_name : '',
          uuid: data.uuid,
          file_uuid: data.file_uuid,
          title: data.title,
          is_show: data.is_show,
          remark: data.remark,
          channel_group_uuid: data.channel_group_uuid
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .el-divider--horizontal {
    margin: 19px 0;
  }
  .desc {
    color: rgb(206, 38, 38);
    font-size: 12px;
    line-height: 0;
    margin-top: 15px;
  }
  .append-btn {
    margin-left: 50px;
    float: right;
  }
  .small-title {
    font-size: 4px;
    color: red;
  }
</style>
