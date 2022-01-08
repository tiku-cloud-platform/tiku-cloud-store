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
          <el-col v-bind="grid">
            <el-form-item label="配置名称：" prop="title" label-for="title">
              <el-input v-model.trim="formValidate.title" placeholder="请输入" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="微信模板ID：" prop="template_id" label-for="title">
              <el-input v-model.trim="formValidate.template_id" placeholder="请输入" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="跳转路径：" prop="page" label-for="title">
              <el-input v-model.trim="formValidate.page" placeholder="请输入" element-id="title" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col v-bind="grid" class="mr50">
            <el-form-item label="跳转类型：" prop="miniprogram_state">
              <el-select v-model="formValidate.miniprogram_state" clearable placeholder="请选择" style="width: 90%">
                <el-option
                  v-for="item in routeList"
                  :key="item.key"
                  :value="item.key"
                  :label="item.title"
                />
              </el-select>
              <!-- <div class="desc">请参考微信小程序官方文档进行配置。</div> -->
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="语言类型：" prop="lang">
              <el-select v-model.trim="formValidate.lang" clearable placeholder="请选择" style="width: 90%">
                <el-option
                  v-for="item in langList"
                  :key="item.key"
                  :value="item.key"
                  :label="item.title"
                />
              </el-select>
              <!-- <div class="desc">请参考微信小程序官方文档进行配置。</div> -->
            </el-form-item>
          </el-col>
          <el-col v-bind="grid">
            <el-form-item label="备注：" prop="description" label-for="description">
              <el-input v-model="formValidate.description" type="textarea" autosize placeholder="请输入内容" style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="分类图片：" prop="file_uuid">
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
          <span class="title">模板参数</span><span class="small-title">(请严格按照微信小程序的订阅消息格式进行配置，否则无法发送订阅消息给用户)</span>
          <el-divider />
          <el-row>
            <el-col>
              <el-button type="primary" class="append-btn" size="mini" @click="appendParams('formValidate')">追加参数</el-button>
            </el-col>
          </el-row>
          <el-row v-for="(item, index) in formValidate.data" :key="item.key">
            <el-col v-bind="grid">
              <el-form-item
                :key="item.key"
                label="参数名称："
                :prop="'data.' + index + '.key_name'"
                label-for="title"
                :rules="{ required: true, message: '参数名称不能为空', trigger: 'blur' }"
              >
                <el-input v-model.trim="item.key_name" placeholder="小程序模板库中的key" element-id="title" style="width: 90%" />
              </el-form-item>
            </el-col>
            <el-col v-bind="grid">
              <el-form-item label="参数描述：" prop="key_title" label-for="key_title">
                <el-input v-model="item.key_title" placeholder="小程序模板库中的参数描述" element-id="key_title" style="width: 90%" />
              </el-form-item>
            </el-col>
            <el-col v-bind="grid">
              <el-form-item label="内容类型：" prop="value_type">
                <el-select v-model="item.value_type" clearable placeholder="请选择参数内容类型" style="width: 90%">
                  <el-option
                    v-for="items in pageDataList"
                    :key="items.key"
                    :value="items.key"
                    :label="items.title"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-bind="grid">
              <el-form-item label="默认内容：" prop="defualt_value" label-for="title">
                <el-input v-model="item.defualt_value" placeholder="请根据内容类型来填写值 发送数据时优先使用填写的值" element-id="title" style="width: 90%" />
              </el-form-item>
            </el-col>
            <el-button v-if="index >= 1" icon="el-icon-delete" size="mini" type="danger" @click.prevent="removeOptions(item)">移除</el-button>
          </el-row>
        </div>
        <div class="dividerTitle">
          <span class="title">其他设置</span>
          <el-divider />
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="显示排序：">
              <el-input-number v-model="formValidate.orders" :min="0" :max="10000" />
            </el-form-item>
            <el-form-item label="启用状态：">
              <el-radio-group v-model="formValidate.is_show">
                <el-radio :label="1" class="radio">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
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
import { add, edit, show } from '@/api/message/template'
export default {
  name: 'SaveMessageCategory',
  data() {
    const validateFileUuid = (rule, value, callback) => {
      if (this.formValidate.file_uuid) {
        callback()
      } else {
        callback(new Error('请上传封面图片'))
      }
    }
    // const validatePageData = (rule, value, callback) => {
    //   if (this.formValidate.pageData.key_name) {
    //     callback()
    //   } else {
    //     callback(new Error('参数名不能为空'))
    //   }
    // }
    return {
      grid: {
        xl: 10,
        lg: 10,
        md: 10,
        sm: 24,
        xs: 24
      },
      formValidate: {
        img_url: '',
        title: '',
        file_uuid: '',
        orders: '',
        is_show: 1,
        miniprogram_state: '',
        lang: '',
        template_id: '',
        description: '',
        page: '',
        data: [
          {
            value_type: '', // 值类型
            defualt_value: '', // 默认值
            key_name: '', // 微信key名称(与微信小程序模板消息的的key必须保持一致)
            key_title: '' // 微信key名称描述
          }
        ]
      },
      ruleValidate: {
        title: [{ required: true, message: '请输入配置名称', trigger: 'blur' }],
        template_id: [{ required: true, message: '请输入输入微信订阅模板ID', trigger: 'blur' }],
        file_uuid: [{ required: true, validator: validateFileUuid, trigger: 'change' }]
        // key_name: [{ required: true, validator: validatePageData, trigger: 'blur' }]
      },
      tempRoute: {},
      pageDataList: [{
        key: 'string',
        title: '字符串(默认使用模板消息标题)'
      }, {
        key: 'int',
        title: '整数(默认为0)'
      }, {
        key: 'double',
        title: '小数(默认为0.00)'
      }, {
        key: 'system_date',
        title: '发送时系统日期(2021-01-02)'
      }, {
        key: 'system_datetime',
        title: '发送时系统日期+时间(2021-01-02 12:12)'
      }, {
        key: 'system_time',
        title: '发送时系统时间(12:12)'
      }, {
        key: 'write_date',
        title: '固定日期(2021-01-02)'
      }, {
        key: 'write_datetime',
        title: '固定日期+时间(2021-01-02 12:12)'
      }, {
        key: 'write_time',
        title: '固定时间(12:12)'
      }, {
        key: 'system_date_cn',
        title: '[中文]发送时系统日期(2021年01月02日)'
      }, {
        key: 'system_datetime_cn',
        title: '[中文]发送时系统日期+时间(2021年01月02日 12:12)'
      }, {
        key: 'write_date_cn',
        title: '[中文]固定日期(2021年01月02日)'
      }, {
        key: 'write_datetime_cn',
        title: '[中文]固定日期+时间(2021年01月02日 12:12)'
      }, {
        key: 'write_datetime_cn',
        title: '[中文]固定日期+时间(2021年01月02日 12:12)'
      }],
      routeList: [{
        key: 'formal',
        title: '正式版'
      }, {
        key: 'developer',
        title: '开发版'
      }, {
        key: 'trial',
        title: '预览版'
      }],
      langList: [{
        key: 'zh_CN',
        title: '简体中文'
      }, {
        key: 'en_US',
        title: '英文'
      }, {
        key: 'zh_HK',
        title: '繁体中文'
      }, {
        key: 'zh_TW',
        title: '繁体中文'
      }]
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
    // 动态追加参数
    appendParams() {
      const originData = this.formValidate.data
      originData.push(
        {
          value_type: '', // 值类型
          defualt_value: '', // 默认值
          key_title: '',
          key_name: '' // 微信key名称(与微信小程序模板消息的的key必须保持一致)
        }
      )
    },
    // 返回
    back() {
      this.$router.push({ path: `/message/subscribe/wechat/list` })
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
          img_url: data.cover_file_info !== null ? data.cover_file_info.file_url + data.cover_file_info.file_name : '',
          uuid: data.uuid,
          file_uuid: data.file_uuid,
          title: data.title,
          orders: data.orders,
          miniprogram_state: data.miniprogram_state,
          is_show: data.is_show,
          lang: data.lang,
          template_id: data.template_id,
          description: data.description,
          page: data.page,
          data: data.data
        }
      })
    },
    // 删除选项
    removeOptions(item) {
      const index = this.formValidate.data.indexOf(item)
      if (index !== -1) {
        this.formValidate.data.splice(index, 1)
      }
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
