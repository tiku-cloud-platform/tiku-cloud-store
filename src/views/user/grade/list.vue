<template>
  <div class="divBox">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form ref="searchForm" :model="listQuery" inline size="small" label-position="right">
            <el-row>
              <el-col :span="19">
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="等级名称：" prop="title">
                    <el-input v-model="listQuery.title" placeholder="请输入" size="small" clearable/>
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="启用状态：" prop="is_show">
                    <el-select v-model="listQuery.is_show" clearable placeholder="请选择">
                      <el-option v-for="item in this.$store.getters.isShow" :key="item.key" :value="item.value"
                                 :label="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="getList">
                  搜索
                </el-button>
                <el-button class="ResetSearch mr10" size="small" @click="reset()">重置</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item>
                  <el-button size="small" type="success" class="mr10" @click="showDialogTableVisible">添加</el-button>
                  <el-button type="danger" @click="handleBatchDel">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-table
        :loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        border
        show-header
        stripe
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column label="等级名称" prop="title" align="center"></el-table-column>
        <el-table-column label="等级icon" align="center">
          <template slot-scope="scope">
            <viewer>
              <img :src="scope.row.icon.file_url+scope.row.icon.file_name"
                   height="50" alt=""
              >
            </viewer>
          </template>
        </el-table-column>
        <el-table-column label="等级积分" prop="score" align="center"></el-table-column>
        <el-table-column label="等级状态" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_show === 2" size="mini" type="text"  class="show-disable-text">禁用</el-button>
            <el-button v-if="row.is_show === 1" size="mini" type="text" class="show-enable-text">启用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="默认等级" align="center" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <el-button v-if="row.is_default === 2" size="mini" type="text"  class="show-disable-text">非默认等级</el-button>
            <el-button v-if="row.is_default === 1" size="mini" type="text" class="show-enable-text">默认等级</el-button>
          </template>
        </el-table-column>
        <el-table-column label="等级描述" align="center">
          <template slot-scope="{row}">
            <span>{{ row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="text" size="mini" class="mr10" @click="editorForm(row)">编辑</el-button>
            <el-button size="mini" type="text" style="color:red;" @click="handleDelete(row, $index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <pagination v-show="tableData.total>0" :total="tableData.total" :page.sync="listQuery.page"
                    :limit.sync="listQuery.size" @pagination="getList"
        />
      </div>
    </el-card>

    <!--    创建表单开始-->
    <div>
      <el-dialog title="会员等级设置" :visible.sync="dialogTableVisible" width="30%" :before-close="handleClose">
        <el-form ref="formValidate" :model="formValidate" :rules="rulesForm" label-width="100px">
          <el-form-item label="等级名称" prop="title">
            <el-input v-model="formValidate.title" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="初始积分" prop="score">
            <el-input-number v-model="formValidate.score" :min="1" :max="100000" label="初始积分" :step="0.01"
                             style="width: 100%;"
            ></el-input-number>
            <span>当用户积分达到该值时，用户自动升级为该等级。</span>
          </el-form-item>
          <el-form-item label="是否默认" prop="is_default">
            <el-radio-group v-model="formValidate.is_default">
              <el-radio :label="1">默认会员等级</el-radio>
              <el-radio :label="2">非默认会员等级</el-radio>
            </el-radio-group>
            <div>默认会员等级只能设置一个。</div>
          </el-form-item>
          <el-form-item label="是否启用" prop="is_show">
            <el-radio-group v-model="formValidate.is_show">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="等级icon" prop="file_uuid">
            <div class="upLoadPicBox" @click="modalPicTap('1')">
              <div v-if="formValidate.file_uuid" class="pictrue"><img :src="bannerImgUrl" alt=""></div>
              <div v-else class="upLoad">
                <i class="el-icon-camera cameraIconfont"/>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="等级描述" prop="remark">
            <el-input type="textarea" v-model="formValidate.remark" maxlength="100" show-word-limit></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('formValidate')">提交</el-button>
            <el-button @click="resetForm('formValidate')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--    创建表单结束-->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { add, edit, list, del } from '@/api/user/grade'
export default {
  name: 'UserGroupList',
  components: { Pagination },
  data() {
    const validateFileUuid = (rule, value, callback) => {
      if (this.formValidate.file_uuid) {
        callback()
      } else {
        callback(new Error('请上传等级icon'))
      }
    }
    return {
      dialogTableVisible: false,
      listQuery: {
        page: 1,
        size: 20,
        title: '',
        is_show: ''
      },
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      grid: {
        xl: 8,
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      },
      // 批量删除选中id
      selectionDelList: [],
      positionData: [], // 显示位置
      typeData: [], // 跳转类型
      // 会员等级表单
      bannerImgUrl: '',
      formValidate: {
        uuid: '',
        title: '',
        is_show: 1,
        remark: '',
        is_default: 2,
        file_uuid: '',
        score: 0.00
      },
      // 表单验证规则
      rulesForm: {
        title: [
          { required: true, message: '等级名称不能为空', trigger: 'blur', max: 10 }
        ],
        file_uuid: [{ required: true, validator: validateFileUuid, trigger: 'change' }],
        is_show: [
          { required: true, message: '是否默认必选', trigger: 'blur' }
        ],
        is_default: [
          { required: true, message: '启用状态必选', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '积分必须大于0', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    reset() {
      this.$refs['searchForm'].resetFields()
      this.getList()
    },
    // 重置创建表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 显示创建表单
    showDialogTableVisible() {
      this.dialogTableVisible = true
    },
    // 数据编辑回显
    editorForm(row) {
      this.bannerImgUrl = row.icon.file_url + row.icon.file_name
      this.formValidate = row
      this.dialogTableVisible = true
    },
    // 图片选择
    modalPicTap(tit) {
      const _this = this
      this.$modalUpload(function(img) {
        _this.bannerImgUrl = img.file_url
        _this.formValidate.file_uuid = img.file_uuid
      }, tit)
    },
    // 提交会员表单数据
    onSubmit(name) {
      console.log(this.formValidate)
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formValidate.uuid) {
            edit(this.formValidate).then(async message => {
              this.$message.success(message)
              this.handleClose()
            })
          } else {
            add(this.formValidate).then((message) => {
              this.$message.success(message)
              this.handleClose()
            })
          }
        } else {
          return false
        }
      })
    },
    // 关闭弹窗
    handleClose() {
      this.dialogTableVisible = false
      this.$refs['formValidate'].resetFields()
      this.getList()
    },
    // 列表
    getList() {
      this.listLoading = true
      list(this.listQuery).then(res => {
        this.tableData.data = res.data.items
        this.tableData.total = res.data.total
      })
      this.listLoading = false
    },
    // 删除
    handleDelete(row, idx) {
      this.$modalSure().then(() => {
        del(row.uuid).then(res => {
          this.$message({ message: res.message, type: 'success' })
          this.getList()
        })
      })
    },
    // 批量选择时触发
    handleSelectionChange(selection) {
      this.selectionDelList = []
      selection.forEach(element => {
        this.selectionDelList.push(element.uuid)
      })
    },
    // 批量删除
    handleBatchDel() {
      if (this.selectionDelList.length <= 0) {
        return this.$message({
          message: '未选择数据',
          type: 'warning'
        })
      }
      this.$modalSure().then(() => {
        del(this.selectionDelList.join(',')).then(res => {
          this.$message({ message: res.message, type: 'success' })
        })
        this.getList()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.selWidth {
  width: 300px;
}

::v-deep .el-card__body {
  padding: 0 !important;
}

.mr10 {
  margin-right: 10px;
}
</style>
