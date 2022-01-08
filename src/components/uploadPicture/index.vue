<template>
  <div>
    <el-row :gutter="30">
      <el-col v-bind="grid">
        <div class="Nav">
          <div class="input">
            <el-input
              v-model="filterText"
              placeholder="选择分类"
              prefix-icon="el-icon-search"
              style="width: 100%;"
              clearable
            />
          </div>
          <div class="trees-coadd">
            <div class="scollhide">
              <div class="trees">
                <el-tree
                  ref="tree"
                  :data="treeData2"
                  :filter-node-method="filterNode"
                  :props="defaultProps"
                  :highlight-current="true"
                >
                  <div slot-scope="{ node, data}" class="custom-tree-node" @click.stop="handleNodeClick(data.uuid)">
                    <div>
                      <span>{{ node.label }}</span>
                      <span style="font-size: 14px;color: #3889b1">（{{ data.title }}）</span>
                    </div>
                    <span class="el-ic">
                      <i v-if="data.parent_uuid == null" class="el-icon-circle-plus-outline" title="添加" @click.stop="onAdd(data.uuid)" />
                      <svg-icon icon-class="add" class="icon-space" />
                      <i class="el-icon-edit" title="修改" @click.stop="onEdit(data.uuid, data.parent_uuid, data.title)" />
                      <svg-icon icon-class="detail" class="icon-space" />
                      <i
                        v-if="!data.children"
                        class="el-icon-delete"
                        title="删除"
                        @click.stop="() => handleDelete(data.uuid)"
                      />
                    </span>
                  </div>
                </el-tree>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col v-bind="grid2" class="colLeft">
        <div v-loading="loading" class="conter">
          <div class="bnt">
            <el-button size="mini" class="mr" type="primary" @click="checkPics">使用选中图片</el-button>
            <el-upload
              class="upload-demo mr"
              action=""
              :disabled="fileTemp.file_group_uuid===null"
              :http-request="UploadFile"
              :show-file-list="false"
              :before-upload="beforeUpload"
              multiple
            >
              <el-button size="mini" type="primary" :disabled="fileTemp.file_group_uuid===null">点击上传</el-button>
            </el-upload>
            <el-button type="success" class="mr" size="mini" @click.stop="onAdd(0)">添加分类</el-button>
            <el-button
              type="danger"
              size="mini"
              class="mr"
              :disabled="checkPicList.length===0"
              @click.stop="delPicList()"
            >删除图片
            </el-button>
          </div>
          <div class="pictrueList acea-row" style="height: 500px;overflow: auto;">
            <div v-show="isShowPic" class="imagesNo">
              <i class="el-icon-picture" style="font-size: 60px;color: rgb(219, 219, 219);" />
              <span class="imagesNo_sp">图片库为空</span>
            </div>
            <div class="conters">
              <div
                v-for="(item, index) in pictrueList.list"
                :key="index"
                class="gridPic"
              >
                <img
                  :src="item.file_url+'/'+item.file_name"
                  :class="item.isSelect ? 'on': '' "
                  @click="changImage(item, index, pictrueList.list)"
                >
              </div>
            </div>
          </div>
          <div class="block">
            <pagination v-show="pictrueList.total>0" :total="pictrueList.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getFileList" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 文件组
import { list as groupList, del as groupDel, edit as groupEdit, add as groupAdd } from '@/api/file/group'
// 文件
import { list, add, del } from '@/api/file/file'
// 获取文件上传token
import { uploadToken } from '@/api/file/token'
import uploadFileCloud from '@/utils/upload'
import Pagination from '@/components/Pagination'
export default {
  name: 'Upload',
  components: { Pagination },
  mixins: [uploadFileCloud],
  props: {
    isMore: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      loading: false,
      grid: {
        xl: 6,
        lg: 6,
        md: 6,
        sm: 6,
        xs: 24
      },
      grid2: {
        xl: 18,
        lg: 18,
        md: 18,
        sm: 18,
        xs: 24
      },
      filterText: '',
      treeData: [],
      treeData2: [],
      defaultProps: {
        children: 'children',
        label: 'attachment_category_name'
      },
      pictrueList: {
        list: [],
        total: 0
      },
      isShowPic: false,
      checkPicList: [],
      checkPicUuid: [], // 选择单张图片时的uuid
      uuids: [],
      checkedMore: [],
      checkedAll: [],
      tokenInfo: [],
      temp: {
        uuid: null,
        title: '',
        parent_uuid: '',
        is_show: 1
      },
      fileTemp: {
        storage: '',
        file_info: {},
        file_group_uuid: null
      },
      listQuery: {
        page: 1,
        size: 30,
        file_group_uuid: ''
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    if (this.$route && this.$route.query.field === 'dialog') import('../../../public/UEditor/dialogs/internal')
    this.getGroupList()
    this.getFileList()
  },
  methods: {
    // 搜索分类
    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    // 所有分类
    getGroupList() {
      const data = {
        title: '全部图片',
        uuid: ''
      }
      groupList().then(res => {
        this.treeData = res.data.items
        this.treeData.unshift(data)
        this.treeData2 = [...this.treeData]
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // 添加分组
    async onAdd(uuid) {
      if (Number(uuid) !== 0) this.temp.parent_uuid = uuid
      this.temp.title = await this.$modePromptBox('添加分组名称')
      groupAdd(this.temp).then(({ message }) => {
        this.$message.success(message)
        this.getGroupList()
      })
    },
    // 编辑分组
    async onEdit(uuid, parent_uuid, title) {
      this.temp.title = await this.$modePromptBox('修改分组名称', title)
      this.temp.uuid = uuid
      this.temp.parent_uuid = parent_uuid
      groupEdit(this.temp).then(({ message }) => {
        this.$message.success(message)
        this.getGroupList()
      })
    },
    // 删除分组
    handleDelete(uuid) {
      this.$modalSure().then(() => {
        groupDel(uuid).then(({ message }) => {
          this.$message.success(message)
          this.getGroupList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    // 上传图片前
    beforeUpload(file) {
      if (file.size > 1024 * 1024 * 20) {
        this.$message.warning(`请上传小于20MB的文件`)
        return false
      }
      const tmp = file.name.split('.')
      const extname = tmp.pop()
      const extList = ['jpg', 'jpeg', 'png', 'gif', 'webp']
      // 校验文件类型
      const isValid = extList.includes(extname)
      if (!isValid) {
        this.$message.warning(`只支持上传 jpg、jpeg、png、gif 格式的图片`)
        return false
      }
    },
    // 上传文件
    async UploadFile(opt) {
      await uploadToken().then(res => {
        this.tokenInfo = res.data
        this.fileTemp.storage = res.data.driver
      })
      const result = await this.uploadFile(opt, this.tokenInfo)
      console.log(result)
      this.fileTemp.file_info = result
      add(this.fileTemp).then(({ message }) => {
        this.$message.success(message)
        this.getFileList()
      })
    },
    // 点击文件分组
    handleNodeClick(uuid) {
      this.fileTemp.file_group_uuid = uuid
      this.listQuery.file_group_uuid = uuid
      this.getFileList()
    },
    // 获取文件列表
    getFileList() {
      this.loading = true
      list(this.listQuery).then(async res => {
        this.pictrueList.list = res.data.items
        this.pictrueList.total = res.data.total
        if (this.pictrueList.list.length) {
          this.isShowPic = false
        } else {
          this.isShowPic = true
        }
        this.pictrueList.total = res.data.total
        if (this.$route && this.$route.query.field && this.$route.query.field !== 'dialog') this.checkedMore = window.form_create_helper.get(this.$route.query.field) || []
        this.loading = false
      }).catch(res => {
        this.$message.error(res.message)
        this.loading = false
      })
    },
    // 选中图片
    changImage(item, index, row) {
      let selectItem = ''
      this.$set(item, 'isSelect', item.isSelect === undefined ? true : !item.isSelect)
      selectItem = this.pictrueList.list.filter((item) => {
        return item.isSelect === true
      })
      this.uuids = []
      const pic = []
      const fileUuid = []
      selectItem.map((item, index) => {
        this.uuids.push(item.uuid)
        pic.push(item.file_url + item.file_name)
        fileUuid.push({ file_url: item.file_url + item.file_name, file_uuid: item.uuid })
      })
      this.checkPicList = pic
      this.checkPicUuid = fileUuid
    },
    // 点击使用选中图片
    checkPics() {
      if (this.checkPicList.length) {
        if (this.$route) {
          if (this.$route.query.type === '1') {
            if (this.checkPicList.length > 1) return this.$message.warning('最多只能选一张图片')
            /* eslint-disable */
            form_create_helper.set(this.$route.query.field, this.checkPicList[0])
            form_create_helper.close(this.$route.query.field);
          }
          if (this.$route.query.type === '2') {
            this.checkedAll = [...this.checkedMore,...this.checkPicList ]
            form_create_helper.set(this.$route.query.field, Array.from(new Set(this.checkedAll)))
            form_create_helper.close(this.$route.query.field);
          }
          if (this.$route.query.field === 'dialog') {
            let str = '';
            for (let i = 0; i < this.checkPicList.length; i++) {
              str += '<img src="' + this.checkPicList[i] + '">'
            }
            /* eslint-disable */
            nowEditor.dialog.close(true);
            // nowEditor.editor.setContent(str,true)
            nowEditor.editor.execCommand('insertHtml', str)
          }
        }else{
          if(this.isMore==='1' && this.checkPicList.length > 1){ return this.$message.warning('最多只能选一张图片')}
          this.$emit('getImage', this.checkPicUuid[0])
        }
      }else{
        this.$message.warning('请先选择图片')
      }
    },
    // 删除图片
    delPicList() {
      this.$modalSure().then(() => {
        del(this.uuids.join(',')).then(({ message }) => {
          this.$message.success(message)
          this.getFileList()
          this.checkPicList = []
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">

/* 点击树结构项的选中颜色 */
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color:  #F56C6C;
}

.treeBox {
  width: 100%;
  height: 100%;
}

.upload-demo {
  display: inline-block !important;
}

.tree_w {
  padding: 20px 30px
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  color: #4386c6;
}

.el-ic {
  display: none;
  i, span {
    /*padding: 0 14px;*/
    font-size: 18px;
    font-weight: 600;
  }
  .svg-icon {
    color: #4386c6;
  }
}

.el-tree-node__content {
  height: 38px;
}

.el-tree-node__expand-icon {
  color: #428bca;
  /*padding: 10px 10px 0px 10px !important;*/
}

.el-tree-node__content:hover .el-ic {
  color: #428bca !important;
  display: inline-block;
}

.el-tree-node__content:hover {
  font-weight: bold;
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content :hover {
  .el-tree-node__expand-icon.is-leaf {
    color: transparent;
    cursor: default;
  }
  /*background-color: #3998d9;*/
  .custom-tree-node {
    font-weight: bold;
  }
  .el-tree-node__expand-icon {
    font-weight: bold;
  }
}

.el-dialog__body {
  .upload-container .image-preview .image-preview-wrapper img {
    height: 100px;
  }
  .el-dialog .el-collapse-item__wrap {
    padding-top: 0px;

  }
  .spatial_img {
    .el-collapse-item__wrap {
      margin-bottom: 0;
      padding-top: 0px;
    }
  }
  .upload-container .image-preview .image-preview-wrapper {
    width: 120px;
  }
  .upload-container .image-preview .image-preview-action {
    line-height: 100px;
    height: 100px;
  }
}

.trees-coadd {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  .scollhide {
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 10px 0 10px 0;
    box-sizing: border-box;
    .trees {
      width: 100%;
      max-height: 374px;
    }
  }
  .scollhide::-webkit-scrollbar {
    display: none;
  }
}

.conters {
  display: flex;
  flex-wrap: wrap;
}

.gridPic {
  margin-right: 20px;
  margin-bottom: 10px;
  width: 110px;
  height: 110px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.conter {
  width: 99%;
  height: 100%;
  .bnt {
    width: 100%;
    padding: 0 13px 10px 15px;
    box-sizing: border-box;
  }
  .pictrueList {
    padding-left: 15px;
    width: 100%;
    el-image {
      width: 100%;
      border: 2px solid #fff;
    }
    .on {
      border: 2px solid #5FB878;
    }
  }
  .el-image {
    width: 110px;
    height: 110px;
    cursor: pointer;
  }
  .imagesNo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 65px 0;
    .imagesNo_sp {
      font-size: 13px;
      color: #dbdbdb;
      line-height: 3;
    }
  }
}

.mr {
  margin-right: 10px;
}
</style>
