<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form
            ref="searchFormList"
            :model="listQuery"
            inline
            size="small"
            label-position="right"
          >
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="用户昵称：" class="width100">
                    <el-input
                      v-model="listQuery.nickname"
                      placeholder="用户昵称"
                      clearable
                      @change="onChangePrograms(listQuery.nickname)"
                    />
                  </el-form-item>
                </el-col>
                <el-col v-bind="grid" style="width:auto;">
                  <el-form-item label="手机号：" class="width100">
                    <el-input
                      v-model="listQuery.mobile"
                      placeholder="手机号"
                      clearable
                      @change="onChangePrograms(listQuery.mobile)"
                    />
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                <el-form-item>
                  <el-button
                    type="primary"
                    icon="ios-search"
                    label="default"
                    class="mr15"
                    size="small"
                    @click="getList"
                  >搜索</el-button>
                  <el-button
                    class="ResetSearch mr10"
                    size="small"
                    @click="reset('searchFormList')"
                  >重置</el-button>
                  <el-button type="danger" @click="handleBatchDel">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        empty-text="暂无数据"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          label="用户组"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.group.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="70" align="center">
          <template slot-scope="scope">
            <viewer><img
              :src="scope.row.avatar_url"
              width="50"
              height="50"
            ></viewer>
          </template>
        </el-table-column>
        <el-table-column
          label="昵称"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="auto" align="center">
          <template slot-scope="{ row }">
            <span>{{
              row.gender == 1
                ? "男"
                : row.gender == 2
                  ? "女"
                  : row.gender == 0
                    ? "未知"
                    : ""
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <el-button
              v-if="row.is_forbidden == 1"
              size="mini"
              type="text"
            >启用</el-button>
            <el-button
              v-if="row.is_forbidden == 2"
              size="mini"
              type="text"
            >禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="注册时间"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最近登录"
          width="auto"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="详情" width="auto" align="center">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="mini"
              style="margin-left: 16px"
              @click="openDetail(row.uuid, (drawer = true))"
            >详情</el-button>
            <el-button
              type="text"
              size="mini"
              style="margin-left: 16px"
              @click="openExam(row.uuid, (drawer = true))"
            >试题</el-button>
            <el-button
              type="text"
              size="mini"
              style="margin-left: 16px"
              @click="openScore(row.uuid, (drawer = true))"
            >积分</el-button>
            <el-button
              type="text"
              size="mini"
              style="margin-left: 16px"
              @click="openSubscribe(row.uuid, (drawer = true))"
            >订阅</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.size"
        @pagination="getList"
      />
      <el-drawer
        :visible.sync="drawer"
        :with-header="true"
        :direction="direction"
        :show-close="true"
        :title="active === 'detail' ? '用户平台信息' : active === 'exam' ? '用户试题信息' : active === 'userScore' ? '用户积分历史' : active === 'subscribe' ? '用户订阅信息' : ''"
        size="80%"
        style="margin-bottom:0px;"
      >
        <div class="app-container" style="max-height:20%;">
          <!-------------------------------------- 详情 -------------------------------------->
          <div v-if="active === 'detail'">
            <div slot="header" class="clearfix">
              <div class="container">
                <el-form
                  ref="searchForm"
                  :model="userPlatform.listQuery"
                  inline
                  size="small"
                  label-position="right"
                  label-width="100px"
                >
                  <el-row>
                    <el-col :xs="24" :lg="18" :xl="18">
                      <el-col v-bind="grid">
                        <el-form-item label="用户昵称：" class="width100">
                          <el-input
                            v-model="userPlatform.listQuery.nickname"
                            size="mini"
                            placeholder="用户昵称"
                            clearable
                            style="width: 200px"
                            @change="
                              onChangePrograms(userPlatform.listQuery.nickname)
                            "
                          />
                        </el-form-item>
                      </el-col>
                      <el-col v-bind="grid">
                        <el-form-item label="手机号：" class="width100">
                          <el-input
                            v-model="userPlatform.listQuery.mobile"
                            size="mini"
                            placeholder="手机号"
                            clearable
                            style="width: 200px"
                            @change="
                              onChangePrograms(userPlatform.listQuery.mobile)
                            "
                          />
                        </el-form-item>
                      </el-col>
                      <div v-if="collapse">
                        <el-col v-bind="grid">
                          <el-form-item label="用户昵称：" class="width100">
                            <el-input
                              v-model="userPlatform.listQuery.nickname"
                              size="mini"
                              placeholder="用户昵称"
                              clearable
                              style="width: 200px"
                              @change="
                                onChangePrograms(userPlatform.listQuery.nickname)
                              "
                            />
                          </el-form-item>
                        </el-col>
                        <el-col v-bind="grid">
                          <el-form-item label="手机号：" class="width100">
                            <el-input
                              v-model="userPlatform.listQuery.mobile"
                              size="mini"
                              placeholder="手机号"
                              clearable
                              style="width: 200px"
                              @change="
                                onChangePrograms(userPlatform.listQuery.mobile)
                              "
                            />
                          </el-form-item>
                        </el-col>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                      <el-form-item>
                        <el-button
                          type="primary"
                          icon="ios-search"
                          label="default"
                          class="mr15"
                          size="mini"
                          @click="getShow(userPlatform.listQuery.uuid)"
                        >搜索</el-button>
                        <el-button
                          class="ResetSearch mr10"
                          size="mini"
                          @click="reset()"
                        >重置</el-button>
                        <a
                          class="ivu-ml-8"
                          style="margin-left: 20px"
                          @click="collapse = !collapse"
                        >
                          <template v-if="!collapse">
                            展开 <i class="el-icon-arrow-down" />
                          </template>
                          <template v-else>
                            收起 <i class="el-icon-arrow-up" />
                          </template>
                        </a>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>

            <el-table
              :key="tableKey"
              v-loading="listLoading"
              :data="userPlatform.data"
              empty-text="暂无数据"
              highlight-current-row
              style="width: 100%;margin:10px;"
            >
              <el-table-column
                label="平台"
                width="auto"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="{ row }">
                  <span>{{ row.platform }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="昵称"
                width="auto"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="{ row }">
                  <span>{{ row.nickname }}</span>
                </template>
              </el-table-column>
              <el-table-column label="头像" width="70" align="center">
                <template slot-scope="scope">
                  <viewer><img
                    :src="scope.row.avatar_url"
                    width="25"
                    height="25"
                  ></viewer>
                </template>
              </el-table-column>
              <el-table-column
                label="openid"
                width="250"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="{ row }">
                  <span
                    v-clipboard:copy="row.openid"
                    v-clipboard:success="copyOpenId"
                  >
                    <span>{{ row.openid }}</span>
                    <svg-icon
                      icon-class="copy"
                      style="font-size: 25px; cursor: pointer"
                    />
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="性别" width="auto" align="center">
                <template slot-scope="{ row }">
                  <span>{{
                    row.gender == 1
                      ? "男"
                      : row.gender == 2
                        ? "女"
                        : row.gender == 0
                          ? "未知"
                          : ""
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="地址"
                width="auto"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="{ row }">
                  <span>{{ row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间"
                width="auto"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="{ row }">
                  <span>{{ row.created_at }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                width="auto"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="{ row }">
                  <el-button
                    v-if="row.is_forbidden == 1"
                    type="text"
                  >启用</el-button>
                  <el-button
                    v-if="row.is_forbidden == 2"
                    style="color: red"
                    type="text"
                  >禁用</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="auto"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="{ row }">
                  <el-button
                    v-if="row.is_forbidden == 1"
                    type="text"
                  >启用</el-button>
                  <el-button
                    v-if="row.is_forbidden == 2"
                    style="color: red"
                    type="text"
                  >禁用</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="userPlatform.total > 0"
              :total="userPlatform.total"
              :page.sync="userPlatform.listQuery.page"
              :limit.sync="userPlatform.listQuery.size"
              @pagination="getList"
            />
          </div>
          <!-------------------------------------- 试题 -------------------------------------->
          <div v-if="active === 'exam'">
            <div slot="header" class="clearfix">
              <div class="container">
                <el-form ref="examSearchForm" :model="examDetail.listQuery" inline size="mini" label-position="right">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-col v-bind="grid" style="width: auto;">
                        <el-form-item label="试题类型：" prop="examDetail_listQuery_collection_type_uuid">
                          <el-select v-model="examDetail.listQuery.collection_type_uuid" clearable placeholder="请选择" style="width: 115px;">
                            <el-option
                              v-for="item in examDetail.examSecondaryData"
                              :key="item.uuid"
                              :label="item.title"
                              :value="item.uuid"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col v-bind="grid" style="width: auto;">
                        <el-form-item label="答题时间：" prop="examDetail_listQuery_start_time">
                          <el-date-picker
                            v-model="examDetail.listQuery.start_time"
                            style="width: 190px;"
                            type="datetime"
                            placeholder="开始日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                          />
                        </el-form-item>
                        <el-form-item label="至" prop="examDetail_listQuery_end_time">
                          <el-date-picker
                            v-model="examDetail.listQuery.end_time"
                            style="width: 190px;"
                            type="datetime"
                            placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                          />
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                      <el-form-item>
                        <el-button type="primary" icon="ios-search" label="default" class="mr15" size="mini" @click="getExamDetail">搜索</el-button>
                        <el-button class="ResetSearch mr10" size="mini" @click="reset('examSearchForm')">重置</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <el-table
              v-loading="listLoading"
              :data="examDetail.tableData.data"
              style="width: 100%"
              size="small"
            >
              <el-table-column label="答题时间" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.created_at }}</span>
                </template>
              </el-table-column>
              <el-table-column label="试题类型" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.collection.collection_type.title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="试卷名称" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.collection.title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="试卷总分" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.collection.total_score }}</span>
                </template>
              </el-table-column>
              <el-table-column label="试卷时长" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.collection.exam_time }}</span>
                </template>
              </el-table-column>
              <el-table-column label="答题得分" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.score }}</span>
                </template>
              </el-table-column>
            </el-table>
            <div style="display: flex;">
              <div style="margin-top: 38px;">
                <span style="color:#1890ff;">{{ '答题总积分：' + examDetail.total_score }}</span>
              </div>
              <pagination v-show="examDetail.tableData.total>0" class="page" :total="examDetail.tableData.total" :page.sync="examDetail.listQuery.page" :limit.sync="examDetail.listQuery.size" @pagination="getExamDetail" />
            </div>
          </div>
          <!-------------------------------------- 积分 -------------------------------------->
          <div v-if="active === 'userScore'">
            <div slot="header" class="clearfix">
              <div class="container">
                <el-form ref="scoreSearchForm" :model="userScoreDetail.listQuery" inline size="mini" label-position="right">
                  <el-row>
                    <el-col :xs="24" :lg="24" :xl="24">
                      <el-col v-bind="grid" style="width:auto;">
                        <el-form-item label="积分渠道：" prop="score_score_key">
                          <el-select v-model="userScoreDetail.listQuery.score_key" clearable placeholder="请选择">
                            <el-option
                              v-for="item in userScoreDetail.scoreData"
                              :key="item.value"
                              :label="item.describe"
                              :value="item.value"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col v-bind="grid" style="width:auto;">
                        <el-form-item label="获取来源：" prop="score_client_type">
                          <el-select v-model="userScoreDetail.listQuery.client_type" clearable placeholder="请选择">
                            <el-option
                              v-for="item in userScoreDetail.score_channel"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col v-bind="grid" style="width:auto;">
                        <el-form-item label="获取时间：" prop="score_start_time">
                          <el-date-picker
                            v-model="userScoreDetail.listQuery.start_time"
                            type="datetime"
                            placeholder="开始日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                          />
                        </el-form-item>
                        <el-form-item label="至" prop="score_end_time">
                          <el-date-picker
                            v-model="userScoreDetail.listQuery.end_time"
                            type="datetime"
                            placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                          />
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                      <el-form-item>
                        <el-button
                          type="primary"
                          icon="ios-search"
                          label="default"
                          class="mr15"
                          size="mini"
                          @click="getUserScore()"
                        >搜索</el-button>
                        <el-button
                          class="ResetSearch mr10"
                          size="mini"
                          @click="reset('scoreSearchForm')"
                        >重置</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <el-table
              v-loading="userScoreDetail.listLoading"
              :data="userScoreDetail.tableData.data"
              style="width: 100%"
              size="small"
            >
              <el-table-column label="获取时间" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.created_at }}</span>
                </template>
              </el-table-column>
              <el-table-column label="获取方式" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.key_info.describe }}</span>
                </template>
              </el-table-column>
              <el-table-column label="获取来源" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="积分分值" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.score }}</span>
                </template>
              </el-table-column>
              <el-table-column label="积分类型" width="auto" align="center">
                <template slot-scope="{row}">
                  <span v-if="row.type === 1" style="color:#1890ff;">增加</span>
                  <span v-else style="color:red;">减少</span>
                </template>
              </el-table-column>
            </el-table>
            <div style="display: flex;">
              <div style="margin-top: 38px;">
                <span style="color:#1890ff;">收入积分：{{ userScoreDetail.income ? userScoreDetail.income : '暂无' }}</span>
                <span style="margin-left:20px;color:red;">消耗积分：{{ userScoreDetail.expend }}</span>
              </div>
              <pagination v-show="userScoreDetail.tableData.total>0" class="page" :total="userScoreDetail.tableData.total" :page.sync="userScoreDetail.listQuery.page" :limit.sync="userScoreDetail.listQuery.size" @pagination="getUserScore" />
            </div>
          </div>
          <!-------------------------------------- 订阅 -------------------------------------->
          <div v-if="active === 'subscribe'">
            <div slot="header" class="clearfix">
              <div class="container">
                <el-form ref="userSubscribeForm" :model="userSubscribe.listQuery" inline size="mini" label-position="right">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-col v-bind="grid" style="width: auto;">
                        <el-form-item label="订阅类型：" prop="userSubscribe_listQuery_collection_type_uuid">
                          <el-select v-model="userSubscribe.listQuery.config_uuid" clearable placeholder="请选择" style="width: 115px;">
                            <el-option
                              v-for="item in userSubscribe.subscribe_type"
                              :key="item.uuid"
                              :label="item.title"
                              :value="item.uuid"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col v-bind="grid" style="width: auto;">
                        <el-form-item label="订阅时间：" prop="userSubscribe_listQuery_start_time">
                          <el-date-picker
                            v-model="userSubscribe.listQuery.start_time"
                            style="width: 190px;"
                            type="datetime"
                            placeholder="开始日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                          />
                        </el-form-item>
                        <el-form-item label="至" prop="userSubscribe_listQuery_end_time">
                          <el-date-picker
                            v-model="userSubscribe.listQuery.end_time"
                            style="width: 190px;"
                            type="datetime"
                            placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                          />
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                      <el-form-item>
                        <el-button type="primary" icon="ios-search" label="default" class="mr15" size="mini" @click="getUserSubscribe">搜索</el-button>
                        <el-button class="ResetSearch mr10" size="mini" @click="reset('userSubscribeForm')">重置</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <el-table
              v-loading="listLoading"
              :data="userSubscribe.tableData.data"
              style="width: 100%"
              size="small"
            >
              <el-table-column label="订阅时间" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.created_at }}</span>
                </template>
              </el-table-column>
              <el-table-column label="订阅类型" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.wechat_template.title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="是否使用" width="auto" align="center">
                <template slot-scope="{row}">
                  <span v-if="row.is_used === -1" style="color:#1890ff;">未使用</span>
                  <span v-if="row.is_used === -2" style="color:red;">已使用</span>
                </template>
              </el-table-column>
              <el-table-column label="配置编号" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.wechat_template.uuid }}</span>
                </template>
              </el-table-column>
              <el-table-column label="微信模板ID" width="auto" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.wechat_template.template_id }}</span>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <pagination v-show="userSubscribe.tableData.total>0" class="page" :total="userSubscribe.tableData.total" :page.sync="userSubscribe.listQuery.page" :limit.sync="userSubscribe.listQuery.size" @pagination="getUserSubscribe" />
            </div>
          </div>
        </div>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import { list as answerList } from '@/api/user/answer'
import { list as subscribeList, configList } from '@/api/user/subscribe'
// 试题二级分类
import { examSecondaryList } from '@/api/exam/category'
import Pagination from '@/components/Pagination'
import { history } from '@/api/score/index'
// 常量配置
import { list as constantList } from '@/api/system/const'
import { getList, getShow } from '@/api/user/wechat'
export default {
  name: 'Wechat',
  components: {
    Pagination
  },
  data() {
    return {
      active: '',
      collapse: false,
      drawer: false,
      direction: 'rtl',
      tableKey: 0,
      list: null,
      userPlatform: {
        data: null,
        listQuery: {
          page: 1,
          size: 10,
          nickname: '',
          mobile: ''
        },
        total: 2
      },
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        nickname: '',
        mobile: ''
      },
      dialogPvVisible: false,
      dialogFormVisible: false,
      dialogChannel: false,
      dialogStatus: '',
      grid: {
        xl: 8,
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      },
      examDetail: {
        examSecondaryData: [],
        total_score: '',
        listQuery: {
          user_id: '',
          page: 1,
          size: 10,
          collection_type_uuid: '',
          start_time: '',
          end_time: ''
        },
        tableData: {
          data: [],
          total: 0
        },
        scoreData: [] // 显示位置
      },
      userScoreDetail: {
        expend: '',
        income: '',
        score_channel: [
          { name: '微信小程序', value: 1 },
          { name: '微信公众号', value: 2 },
          { name: 'iOS客户端', value: 3 },
          { name: 'Android客户端', value: 4 },
          { name: 'PC端', value: 5 }
        ],
        tableData: {
          data: [],
          total: 0
        },
        listQuery: {
          page: 1,
          size: 10,
          score_key: '',
          client_type: '',
          start_time: '',
          end_time: '',
          user_id: ''
        }
      },
      userSubscribe: {
        subscribe_type: [],
        tableData: {
          data: [],
          total: 0
        },
        listQuery: {
          page: 1,
          size: 10,
          config_uuid: '',
          start_time: '',
          end_time: '',
          user_id: ''
        }
      }
    }
  },
  created() {
    console.log('created')
    configList().then(res => {
      this.userSubscribe.subscribe_type = res.data.items
    })
    examSecondaryList().then(res => {
      this.examDetail.examSecondaryData = res.data.items
    })
    this.getList()
  },
  methods: {
    getList() {
      console.log('getList')
      this.listLoading = true
      getList(this.listQuery).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    reset(formName) {
      this.$refs[formName].resetFields()
      if (this.active === 'exam') {
        this.getExamDetail()
      } else if (this.active === 'userScore') {
        this.getUserScore()
      } else if (this.active === 'detail') {
        this.getUserDetail()
      } else {
        this.getList()
      }
    },
    // 搜索
    onChangePrograms() {
      this.listQuery.page = 1
      this.getList()
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'success-row'
      }
    },
    // 点击详情获取用户信息
    openDetail(uuid) {
      this.active = 'detail'
      this.userPlatform.listQuery.uuid = uuid
      this.getUserDetail()
    },
    getUserDetail() {
      getShow(this.userPlatform.listQuery).then((response) => {
        this.userPlatform.data = response.data.items
        this.userPlatform.total = response.data.total
        this.listLoading = false
      })
    },
    // ---------------------------------- 试题弹窗  ----------------------------------
    openExam(uuid) {
      this.active = 'exam'
      this.examDetail.listQuery.user_id = uuid
      this.getExamDetail()
    },
    getExamDetail() {
      this.listLoading = true
      answerList(this.examDetail.listQuery).then(res => {
        this.examDetail.total_score = res.data.total_score
        this.examDetail.tableData.data = res.data.items
        this.examDetail.tableData.total = res.data.total
      })
      this.listLoading = false
    },
    // ---------------------------------- 积分弹窗  ----------------------------------
    openScore(uuid) {
      this.active = 'userScore'
      this.userScoreDetail.listQuery.user_id = uuid
      constantList({ title: 'system_score' }).then(res => {
        this.userScoreDetail.scoreData = res.data.items
      })
      this.getUserScore()
    },
    getUserScore() {
      this.listLoading = true
      history(this.userScoreDetail.listQuery).then(res => {
        this.userScoreDetail.tableData.data = res.data.items
        if (this.userScoreDetail.listQuery.page === 1) {
          this.userScoreDetail.expend = res.data.expend
          this.userScoreDetail.income = res.data.income
        }
        this.userScoreDetail.tableData.total = res.data.total
      })
      this.listLoading = false
    },
    // ---------------------------------- 订阅弹窗  ----------------------------------
    openSubscribe(uuid) {
      this.active = 'subscribe'
      this.userSubscribe.listQuery.user_id = uuid
      this.getUserSubscribe()
    },
    getUserSubscribe() {
      this.listLoading = true
      subscribeList(this.userSubscribe.listQuery).then(res => {
        this.userSubscribe.tableData.data = res.data.items
        this.userSubscribe.tableData.total = res.data.total
      })
      this.listLoading = false
    },

    copyOpenId(e) {
      this.$message.success('内容已复制到剪切板！')
    }
  }
}
</script>

<style>
.el-table__header-wrapper {
    height: 40px;
}
.el-card__body {
    padding-top: 0px;
}
.el-drawer {
  overflow: auto;
}
.el-table .success-row {
  background: #f0f9eb;
}

.detail-user-info {
  width: 95%;
  height: 100px;
  margin: 10px auto;
  display: flex;
  position: relative;
  font-size: 14px;
}

.avatar {
  width: 94px;
  height: 94px;
}

.detail-table {
  width: 95%;
  margin: 20px auto;
}

.info {
  position: absolute;
  left: 100px;
  display: flex;
  height: 100%;
}

.selWidth{
  width: 300px;
}

.mr10 {
  margin-right: 10px;
}

.page {
  padding: 0;
  margin-top: 5px;
  margin-left: 35%;
}
</style>
