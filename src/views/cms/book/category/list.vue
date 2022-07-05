<template>
  <div class="divBox" style="margin-top: 5px;">
    <el-row :gutter="20">
      <el-col :span="4" style="padding-left: 0;padding-right: 0;width: 14%;margin-left: 20px;">
        <el-card id="box-card" shadow="never">
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
                        <!--  <span style="font-size: 14px;color: #3889b1">（{{ data.title }}）</span>-->
                      </div>
                      <span class="el-ic">
                        <i v-if="!data.parent_uuid" class="el-icon-circle-plus-outline" title="添加" @click.stop="onAdd(data.uuid)" />
                        <svg-icon icon-class="add" class="icon-space" />
                        <i v-if="node.label !== '全部分类'" class="el-icon-edit" title="修改" @click.stop="onEdit(data.uuid, data.parent_uuid, data.title)" />
                        <svg-icon icon-class="detail" class="icon-space" />
                        <i
                          v-if="!data.children && node.label !== '全部分类'"
                          class="el-icon-delete"
                          title="删除"
                          @click.stop="() => onDelete(data.uuid)"
                        />
                      </span>
                    </div>
                  </el-tree>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <div class="container">
              <el-form ref="searchForm" :model="contentQuery" inline size="small" label-position="right" label-width="100px">
                <el-row>
                  <el-col :span="14">
                    <el-col v-bind="grid" style="width:auto">
                      <el-form-item label="书籍名称：" prop="title">
                        <el-input v-model="contentQuery.title" placeholder="请输入" size="small" clearable />
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item>
                      <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="getContentList">搜索</el-button>
                      <el-button class="ResetSearch mr10" size="small" @click="reset()">重置</el-button>
                      <!--  <router-link :to="{path: '/cms/book/book/save'}">
                        <el-button size="small" type="success" class="mr10">添加</el-button>jumpAddContent
                      </router-link>-->
                      <el-button size="small" type="success" class="mr10" @click="jumpAddContent('')">添加</el-button>
                      <el-button type="danger" size="small" @click="handleBatchDel">删除</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <el-table
            v-loading="listLoading"
            :data="tableData.data"
            style="width: 100%"
            size="small"
            row-key="uuid"
            :tree-props="{children: 'children'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="编号" width="auto" align="center" :show-overflow-tooltip="true">
              <template slot-scope="{row}">
                <svg-icon
                  icon-class="copy"
                  style="font-size: 20px; cursor: pointer"
                  @click="copyChannelId(row.uuid)"
                />
                <span>{{ row.uuid }}</span>
              </template>
            </el-table-column>
            <el-table-column label="名称" width="auto" align="center" :show-overflow-tooltip="true">
              <template slot-scope="{row}">
                <span>{{ row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="书籍作者" width="auto" align="center">
              <template slot-scope="{row}">
                <span>{{ row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column label="书籍来源" width="auto" align="center">
              <template slot-scope="{row}">
                <span>{{ row.source }}</span>
              </template>
            </el-table-column>
            <el-table-column label="书籍标签" width="auto" align="center">
              <template slot-scope="{row}">
                <el-tag
                  v-for="(name, ix) in row.tags"
                  :key="ix"
                  size="mini"
                >
                  {{ name }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="收藏数量" width="auto" align="center">
              <template slot-scope="{row}">
                <span>{{ row.collection_number }}</span>
              </template>
            </el-table-column>
            <el-table-column label="阅读数量" width="auto" align="center">
              <template slot-scope="{row}">
                <span>{{ row.read_number }}</span>
              </template>
            </el-table-column>
            <el-table-column label="点赞数量" width="auto" align="center">
              <template slot-scope="{row}">
                <span>{{ row.click_number }}</span>
              </template>
            </el-table-column>
            <el-table-column label="显示顺序" width="auto" align="center">
              <template slot-scope="{row}">
                <span>{{ row.orders }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center" :show-overflow-tooltip="true">
              <template slot-scope="{row}">
                <span v-if="row.is_show === 2" class="show-disable-text">禁用</span>
                <span v-if="row.is_show === 1">启用</span>
              </template>
            </el-table-column>
            <!--  <el-table-column label="创建时间" width="150" align="center">
              <template slot-scope="{row}">
                <span>{{ row.created_at }}</span>
              </template>
            </el-table-column>-->
            <el-table-column label="更新时间" width="150" align="center">
              <template slot-scope="{row}">
                <span>{{ row.updated_at }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
              <template slot-scope="{row,$index}">
                <el-button type="text" size="mini" class="mr10" @click="jumpAddContent(row.uuid)">编辑</el-button>
                <el-button size="mini" type="text" style="color: red" @click="handleDelete(row, $index)"> 删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <pagination v-show="tableData.total>0" :total="tableData.total" :page.sync="contentQuery.page" :limit.sync="contentQuery.size" @pagination="getContentList" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  list as categoryList,
  add as categoryAdd,
  del as categoryDel,
  edit
} from '@/api/book/category'
import { list as contentList } from '@/api/book/content'
import Pagination from '@/components/Pagination'
export default {
  name: 'BookCategoryList',
  components: { Pagination },
  data() {
    return {
      treeData: [],
      treeData2: [],
      filterText: '',
      contentQuery: {
        page: 1,
        size: 20,
        title: '',
        store_book_category_uuid: '',
        store_book_uuid: ''
      },
      categoryQuery: {
        store_book_uuid: '',
        title: '',
        page: 1,
        size: 10000
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
      grid2: {
        xl: 18,
        lg: 18,
        md: 18,
        sm: 18,
        xs: 24
      },
      // 批量删除选中id
      selectionDelList: [],
      categoryData: [],
      sleOptions: {
        title: '',
        uuid: ''
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      bookCategoryTemp: {
        store_book_uuid: '',
        parent_uuid: '',
        title: '',
        is_show: 1,
        orders: 1
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.contentQuery.store_book_uuid = this.categoryQuery.store_book_uuid = this.bookCategoryTemp.store_book_uuid = this.$route.params.uuid
  },
  mounted() {
    this.getContentList()
    this.getCategoryList()
  },
  methods: {
    // 跳转添加内容页面
    jumpAddContent(uuid) {
      this.$router.push({
        name: 'bookContentSave',
        query: {
          store_book_category_uuid: this.contentQuery.store_book_category_uuid,
          store_book_uuid: this.$route.params.uuid,
          content_uuid: uuid
        }
      })
    },
    getContentList() {
      this.listLoading = true
      contentList(this.contentQuery).then(res => {
        this.tableData.data = res.data.items
        this.tableData.total = res.data.total
      })
      this.listLoading = false
    },
    // 搜索分类
    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    // 点击分类
    handleNodeClick(uuid) {
      this.contentQuery.store_book_category_uuid = uuid
      this.getContentList()
    },
    async onAdd(uuid) {
      if (Number(uuid) !== 0) this.bookCategoryTemp.parent_uuid = uuid
      this.bookCategoryTemp.title = await this.$modePromptBox('添加分类名称')
      categoryAdd(this.bookCategoryTemp).then(({ message }) => {
        this.$message.success(message)
        this.getCategoryList()
      })
    },
    async onEdit(uuid, parent_uuid, title) {
      this.bookCategoryTemp.title = await this.$modePromptBox('修改分类名称', title)
      this.bookCategoryTemp.uuid = uuid
      this.bookCategoryTemp.parent_uuid = parent_uuid
      edit(this.bookCategoryTemp).then(({ message }) => {
        this.$message.success(message)
        this.getCategoryList()
      })
    },
    // 删除
    onDelete(uuid) {
      this.$modalSure().then(() => {
        categoryDel(uuid).then(({ message }) => {
          this.$message.success(message)
          this.getCategoryList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
    // 分类
    getCategoryList() {
      const data = {
        title: '全部分类',
        uuid: ''
      }
      categoryList(this.categoryQuery).then(res => {
        this.treeData = res.data.items
        this.treeData.unshift(data)
        this.treeData2 = [...this.treeData]
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    // copy渠道编号
    copyChannelId(id) {
      (function() {
        document.oncopy = function(e) {
          e.clipboardData.setData('text', id)
          e.preventDefault()
          document.oncopy = null
        }
      })(id)
      document.execCommand('Copy')
      this.$message.success('复制成功')
    },
    handleChange(value) {
      console.log(value)
    },
    // 分类点击
    handleSelClick(node) {
      this.contentQuery.category_uuid = node.uuid
      this.sleOptions = {
        title: node.title,
        uuid: node.uuid
      }
    },
    reset() {
      this.$refs['searchForm'].resetFields()
      this.getContentList()
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

<style lang="scss">
#box-card {
  .el-card__body {
    padding: 10px;
  }
}

.selWidth{
  width: 300px;
}

.mr10 {
  margin-right: 10px;
}

/* 点击树结构项的选中颜色 */
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color:  #F56C6C;
}

.treeBox {
  width: 100%;
  height: 100%;
}

.Nav {
  height: auto;
}

.upload-demo {
  display: inline-block !important;
}

.tree_w {
  padding: 20px 10px;
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
</style>

