<template>
  <div class="divBox">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card class="box-card" shadow="never">
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
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <div class="container">
              <el-form ref="searchForm" :model="listQuery" inline size="small" label-position="right" label-width="100px">
                <el-row>
                  <el-col :span="19">
                    <el-col v-bind="grid" style="width:auto">
                      <el-form-item label="书籍名称：" prop="title">
                        <el-input v-model="listQuery.title" placeholder="请输入" size="small" clearable />
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item>
                      <el-button type="primary" icon="ios-search" label="default" class="mr15" size="small" @click="getList">搜索</el-button>
                      <el-button class="ResetSearch mr10" size="small" @click="reset()">重置</el-button>
                      <router-link :to="{path: '/cms/book/book/save'}">
                        <el-button size="small" type="success" class="mr10">添加</el-button>
                      </router-link>
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
            <el-table-column label="书籍封面" width="70" align="center">
              <template slot-scope="scope">
                <viewer v-if="scope.row.cover_file_info != null"><img :src="scope.row.cover_file_info.file_url+scope.row.cover_file_info.file_name" width="50" height="50"></viewer>
              </template>
            </el-table-column>
            <el-table-column label="书籍标题" width="auto" align="center" :show-overflow-tooltip="true">
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
            <el-table-column label="关注人数" width="auto" align="center">
              <template slot-scope="{row}">
                <span>{{ row.collection_number }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评分" width="auto" align="center">
              <template slot-scope="{row}">
                <span>{{ row.score }}</span>
              </template>
            </el-table-column>
            <el-table-column label="书籍章数" width="auto" align="center">
              <template slot-scope="{row}">
                <span>{{ row.numbers }}</span>
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
            <el-table-column label="">
              <template slot-scope="{row}">
                <el-rate v-model="row.level" style="display: contents;" disabled />
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="150" align="center">
              <template slot-scope="{row}">
                <span>{{ row.created_at }}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" width="150" align="center">
              <template slot-scope="{row}">
                <span>{{ row.updated_at }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
              <template slot-scope="{row,$index}">
                <router-link :to="{path: '/cms/book/book/save/'+row.uuid}">
                  <el-button type="text" size="mini" class="mr10">编辑</el-button>
                </router-link>
                <el-button size="mini" type="text" style="color: red" @click="handleDelete(row, $index)"> 删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <pagination v-show="tableData.total>0" :total="tableData.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { list as categoryList, del } from '@/api/book/category'
import Pagination from '@/components/Pagination'
export default {
  name: 'BookCategoryList',
  components: { Pagination },
  data() {
    return {
      treeData: [],
      treeData2: [],
      filterText: '',
      listQuery: {
        page: 1,
        size: 10,
        title: '',
        category_uuid: ''
      },
      categoryQuery: {
        store_book_uuid: '',
        title: '',
        page: 1,
        size: 10
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
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.categoryQuery.store_book_uuid = this.$route.params.uuid
  },
  mounted() {
    this.getList()
    this.getCategoryList()
  },
  methods: {
    // 搜索分类
    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    // 点击分类
    handleNodeClick(uuid) {
      console.log(uuid)
    },
    onAdd() {

    },
    onEdit(uuid, parent_uuid, title) {

    },
    // 分类
    getCategoryList() {
      const data = {
        title: '全部图片',
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
      this.listQuery.category_uuid = node.uuid
      this.sleOptions = {
        title: node.title,
        uuid: node.uuid
      }
    },
    reset() {
      this.$refs['searchForm'].resetFields()
      this.getList()
    },
    // 列表
    getList() {
      this.listLoading = true
      // list(this.listQuery).then(res => {
      //   this.tableData.data = res.data.items
      //   this.tableData.total = res.data.total
      // })
      this.listLoading = false
    },
    // 删除
    handleDelete(row, idx) {
      this.$modalSure().then(() => {
        del(row.uuid).then(res => {
          this.$message({ message: res.message, type: 'success' })
          this.tableData.data.splice(idx, 1)
          this.tableData.total -= 1
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

