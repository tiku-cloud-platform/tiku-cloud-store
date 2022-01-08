<template>
  <div class="app-container">
    <el-tabs tab-position="left" style="height: 350px;">
      <el-tab-pane label="七牛云存储">
        <el-form ref="form" :model="form" label-width="150px" label-position="right">
          <el-form-item label="存储空间名称 Bucket">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="ACCESS_KEY AK">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="SECRET_KEY SK">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="空间域名 Domain">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="阿里云OSS">
        <el-form ref="form" :model="form" label-width="150px" label-position="right">
          <el-form-item label="存储空间名称 Bucket">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="AccessKeyId">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="AccessKeySecret">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="空间域名 Domain">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="腾讯云OSS">
        <el-form ref="form" :model="form" label-width="150px" label-position="right">
          <el-form-item label="存储空间名称 Bucket">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="所属区域 Region">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="SecretId">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="SecretKey">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="空间域名 Domain">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

<!--    <el-dialog :visible.sync="dialogFormVisible" title="图片库" style="">-->
<!--      <ImgBox />-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
export default {
  name: 'UploadConf',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.dialogFormVisible = true
    },
    onSelect() {

    }
  }
}
</script>

<style>
  .el-form {
    width: 75%;
  }

  .el-dialog {
    height: 600px;
    width: 900px;
  }
</style>
