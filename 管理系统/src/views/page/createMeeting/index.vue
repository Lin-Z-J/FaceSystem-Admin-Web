<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card class="box-card" style="height: 510px">
        <template #header>
          <div class="card-header">
            <span>填写会议使用说明</span>
            <!-- <el-button class="button">预定</el-button> -->
          </div>
        </template>

        <!--  -->
        <el-form ref="form" :model="Meetingdata" label-width="90px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="会议室">
                <el-select v-model="MeetingRoom.roomName" placeholder="请选择会议室">
                  <!-- <el-option label="新会议室-001" value="新会议室-001"></el-option>
                  <el-option label="新会议室-002" value="新会议室-002"></el-option> -->
                  <el-option
                    v-for="item in MeetingRoomoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    @click.native="handleChangeMeetingRoomoptions(item)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="会议主题">
                <el-input v-model="Meetingdata.theme" placeholder="请输入会议主题" maxlength="30" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 单个日期 -->
          <!-- <el-row> -->
          <el-form-item label="会议日期">
            <el-col :span="8">
              <el-date-picker
                v-model="Meetingdata.startdate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                type="date"
                :disabled-date="disabledDateFun"
                placeholder="日期"
              />
            </el-col>
            <!--            <el-col :span="7">
              <el-time-select
                v-model="Meetingdata.startTime"
                :max-time="Meetingdata.endTime"
                format="HH:mm"
                value-format="HH:mm"
                class="mr-4"
                placeholder="起始时间"
                start="00:00"
                step="00:15"
                end="24:00"
              />
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="7">
              <el-time-select
                v-model="Meetingdata.endTime"
                :min-time="Meetingdata.startTime"
                format="HH:mm"
                value-format="HH:mm"
                placeholder="结束时间"
                start="00:00"
                step="00:15"
                end="24:00"
              />
            </el-col> -->
          </el-form-item>
          <el-form-item label="会议时间">
            <el-col :span="9">
              <el-time-select
                v-model="Meetingdata.startTime"
                :max-time="Meetingdata.endTime"
                format="HH:mm"
                value-format="HH:mm"
                class="mr-4"
                placeholder="起始时间"
                start="00:00"
                step="00:15"
                end="24:00"
              />
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="9">
              <el-time-select
                v-model="Meetingdata.endTime"
                :min-time="Meetingdata.startTime"
                format="HH:mm"
                value-format="HH:mm"
                placeholder="结束时间"
                start="00:00"
                step="00:15"
                end="24:00"
              />
            </el-col>
          </el-form-item>
          <!-- </el-row> -->
          <!--  -->

          <!--          <el-row>
            <el-form-item label="起始日期">
              <el-col :span="12">
                <el-date-picker
                  v-model="Meetingdata.startdate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  type="date"
                  :disabled-date="disabledDateFun"
                  placeholder="起始日期"
                />
              </el-col>
              <el-col :span="12">
                <el-time-select
                  v-model="Meetingdata.startTime"
                  :max-time="Meetingdata.endTime"
                  format="HH:mm"
                  value-format="HH:mm"
                  class="mr-4"
                  placeholder="起始时间"
                  start="00:00"
                  step="00:15"
                  end="24:00"
                />
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="结束日期">
              <el-col :span="12">
                <el-date-picker
                  v-model="Meetingdata.endTdate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  type="date"
                  :disabled-date="disabledDateFun"
                  placeholder="结束日期"
                />
              </el-col>
              <el-col :span="12">
                <el-time-select
                  v-model="Meetingdata.endTime"
                  :min-time="Meetingdata.startTime"
                  format="HH:mm"
                  value-format="HH:mm"
                  placeholder="结束时间"
                  start="00:00"
                  step="00:15"
                  end="24:00"
                />
              </el-col>
            </el-form-item>
          </el-row> -->
          <el-row>
            <el-col :span="12">
              <!-- <el-form-item label="可签到时段"> -->
              <el-form-item label="可签到时段">
                <!-- <el-input v-model="Meetingdata.host" placeholder="请输入你的昵称" maxlength="30" /> -->
                <!-- <span>{{ user.username }}</span> -->
                <!-- <el-input v-model="user.username" :disabled="true"> </el-input> -->
                <el-radio-group v-model="radio">
                  <el-radio :label="0">与会议时段相同</el-radio>
                  <!--                <el-radio :label="30">会议前半小时到会议结束</el-radio>
                  <el-radio :label="60">会议前一小时到会议结束</el-radio> -->
                  <el-radio :label="30">提前半小时至结束</el-radio>
                  <el-radio :label="60">提前一小时至结束</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="主持人">
                <!-- <el-input v-model="Meetingdata.host" placeholder="请输入你的昵称" maxlength="30" /> -->
                <!-- <span>{{ user.username }}</span> -->
                <el-input v-model="user.username" :disabled="true"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="会议介绍">
                <el-input
                  type="textarea"
                  autosize
                  maxlength="200"
                  v-model="Meetingdata.content"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--         <el-form-item>
            <el-button type="primary" @click="submitCreateMeeting()">预定</el-button>
          </el-form-item> -->
        </el-form>
      </el-card>
      <!--  -->
    </el-col>

    <el-col :span="12">
      <el-card class="box-card" style="height: 510px">
        <template #header>
          <div class="card-header">
            <span>参会人员列表</span>
            <el-button class="button" type="primary" @click="handleUserAdd()" text
              >添加参会人员</el-button
            >
          </div>
        </template>
        <el-table height="400" :data="meetingUserList" :border="true">
          <el-table-column
            prop="username"
            label="用户名称"
            show-overflow-tooltip
            width=""
          ></el-table-column>
          <el-table-column prop="sex" label="性别" show-overflow-tooltip width="">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            show-overflow-tooltip
            width=""
          ></el-table-column>
          <!--          <el-table-column
            prop="note"
            label="备注"
            show-overflow-tooltip
            width=""
          ></el-table-column> -->
          <template #empty>
            <div class="table-empty">
              <div>暂无数据</div>
            </div>
          </template>
        </el-table>
        <!-- 对话框的结构 -->
        <el-dialog v-model="UserAddopen" title="添加参会人员" width="1200px">
          <el-row>
            <!--部门数据-->
            <el-col :span="9">
              <div style="border: 1px solid; padding: 1.5rem; margin: 0.5px">
                <ul class="infinite-list" style="overflow: auto">
                  <!-- <li class="infinite-list-item">{{ i }}</li> -->
                  <div class="head-container">
                    <!-- :props="defaultProps" -->
                    <!-- :filter-node-method="filterNode" -->
                    <el-tree
                      :data="deptOptions"
                      :expand-on-click-node="false"
                      ref="tree"
                      default-expand-all
                      highlight-current
                      @node-click="handleNodeClick"
                      @check="currentChecked"
                      :current-node-key="currentNodeKey"
                      show-checkbox
                    />
                  </div>
                </ul>
              </div>
            </el-col>
            <el-col :span="15">
              <div style="text-align: center">
                <el-transfer
                  v-model="rightValue"
                  style="text-align: left; display: inline-block"
                  filterable
                  :left-default-checked="[2, 3]"
                  :right-default-checked="[1]"
                  :titles="['未选用户', '已选用户']"
                  :button-texts="['', '']"
                  :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}',
                  }"
                  :data="fn2(this.UserListDataOption)"
                  @change="handleChange"
                >
                  <template #default="{ option }">
                    <span> {{ option.label }}</span>
                  </template>
                  <!--              <template #left-footer>
                    <el-button class="transfer-footer" size="small">操作</el-button>
                  </template>
                  <template #right-footer>
                    <el-button class="transfer-footer" size="small">操作</el-button>
                  </template> -->
                </el-transfer>
              </div>
            </el-col>
          </el-row>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="UserAddopen = false">取消</el-button>
              <el-button type="primary" @click="SaveSelectedUser()">保存已选用户</el-button>
            </span>
          </template>
        </el-dialog>
      </el-card>
    </el-col>

    <!--    <el-form-item>
      <el-button type="primary" @click="submitCreateMeeting()">预定</el-button>
    </el-form-item> -->
    <!--    <el-col :span="24">
      <div style="margin: auto; width: 60px">
        <el-button type="primary" @click="submitCreateMeeting()">预定</el-button>
      </div>
    </el-col> -->
  </el-row>

  <!-- display: none -->
  <el-card class="box-card" style="height: ">
    <template #header>
      <div class="card-header">
        <span
          >批量上传参会人员
          <el-switch
            v-model="outOpen"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
          />
        </span>
        <!--               <el-button class="button" type="primary" @click="handleUserAdd()" text
          >添加参会人员</el-button
        > -->
      </div>
    </template>
    <el-row v-show="outOpen" :gutter="10">
      <div class="layui-word-aux">
        <ul>
          <li>①图片批量上传</li>
          <li>上传必看：</li>
          <li>1、只能上传jpg/png/gif类型的图片，且大小不能超过2MB；</li>
          <li>2、本页面功能方便用户快速批量上传参会人员；</li>
          <li
            >3、建议把批量上传的图片文件名称命名为(邮箱_名字.jpg/png/gif)，
            <br />以便系统自动识别输入固定参会人员的邮箱和名字；
          </li>
          <li>4、图片批量上传的所有参会人员初始密码为其邮箱；</li>
          <!-- <li>4、鼠标悬浮于人脸缩略图上，可以放大图片，方便查看参会人员的图片；</li> -->
        </ul>
      </div>
      <el-col :span="16">
        <el-row>
          <!-- <el-col :span="8" style="line-height: 32px"> 批量上传参会人员照片 </el-col> -->
          <el-col :span="12">
            <el-button type="primary" @click="uploadImage">批量上传</el-button>
            <input
              id="takepicture"
              style="display: none"
              type="file"
              name="image[]"
              multiple="multiple"
              accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
              @change="batchUploadFilesChange"
            />
          </el-col>
          <!--          <el-col :span="12">
            <el-button type="primary" @click="downloadExcel">下载Excel导入</el-button>
          </el-col> -->
        </el-row>

        <!--        <el-row>
          <el-col :span="18">
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              label-width=""
              class="demo-ruleForm"
            >
              <el-form-item prop="input">
                <el-input v-model="ruleForm.input" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="searchFormSubmit()">
              <icon-search></icon-search>搜索
            </el-button>
          </el-col>
        </el-row> -->

        <el-table
          height="400"
          :data="
            outUserList.slice(
              (this.pageable.currentPage - 1) * this.pageable.pageSize,
              this.pageable.currentPage * this.pageable.pageSize
            )
          "
          :border="true"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column type="selection" width="55" /> -->

          <el-table-column prop="faceurl" label="照片" show-overflow-tooltip width="">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <!--         <el-icon>
                  <timer />
                </el-icon> -->
                <!-- <span style="margin-left: 10px">{{ scope.row.faceurl }}</span> -->
                <img :src="scope.row.faceurl" class="el-upload-list__item-thumbnail" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="pcname" label="原图片名" show-overflow-tooltip width="">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <!-- <el-input v-model="scope.row.pcname" placeholder="" maxlength="30" /> -->
                <span style="margin-left: 10px">{{ scope.row.pcname }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="邮箱" show-overflow-tooltip width="">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-input v-model="scope.row.email" placeholder="请核对邮箱" maxlength="30" />
                <!-- <span style="margin-left: 10px">{{ scope.row.name }}</span> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名字" show-overflow-tooltip width="">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-input v-model="scope.row.name" placeholder="请核对名字" maxlength="30" />
                <!-- <span style="margin-left: 10px">{{ scope.row.name }}</span> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" v-slot="scope" fixed="right">
            <el-button type="primary" link @click="deleteAccount(scope.$index, scope.row)">
              <icon-delete-five></icon-delete-five>
            </el-button>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:currentPage="pageable.currentPage"
          v-model:page-size="pageable.pageSize"
          :page-sizes="[10, 25, 50, 100]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageable.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-col>
      <el-col :span="8">
        <!--        <div class="layui-word-aux">
          <ul>
            <li>上传必看：</li>
            <li>1、只能上传jpg/png/gif类型的图片，且大小不能超过2MB；</li>
            <li>2、本页面功能方便用户快速批量上传参会人员的照片；</li>
            <li
              >3、建议把图片文件名称命名为(邮箱_名字.jpg/png/gif)，
              <br />便系统自动识别输入固定参会人员的邮箱和名字；</li
            >
            <li>4、鼠标悬浮于人脸缩略图上，可以放大图片，方便查看参会人员的图片；</li>
          </ul>
        </div> -->

        <!-- 文件上传 -->
        <el-row>
          <el-col :span="24">
            <el-button type="primary" @click="downloadExcel">下载Excel导入</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <!--            <el-upload class="upload-demo" name="Excel_user" drag :action="action" multiple>
              <div class="el-upload__text">将Excel文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->

            <!--            <el-upload
              class="upload-demo"
              ref="upload"
              action="#"
              :limit="1"
              accept=".xlsx, .xls"
              :on-change="onChange"
              drag
            > -->

            <el-upload
              ref="upload"
              action="#"
              :limit="1"
              accept=".xlsx, .xls"
              :on-change="onChange"
              :auto-upload="false"
              drag
            >
              <!-- <el-icon class="el-icon--upload"><upload-filled /></el-icon> -->
              <div class="el-upload__text">将Excel文件拖到此处，或<em>点击上传</em></div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
              <!--              <template #tip>
                <div class="el-upload__tip"> 只能上传jpg/png文件，且不超过500kb </div>
              </template> -->
              <template #tip>
                <div class="el-upload__tip text-center">
                  仅允许导入xls、xlsx格式文件。
                  <!--               <el-link
                    type="primary"
                    :underline="false"
                    style="font-size: 12px; vertical-align: baseline"
                    @click="importTemplate"
                    >下载模板</el-link
                  > -->
                </div>
              </template>
            </el-upload>
          </el-col>
        </el-row>
        <!--        <div class="layui-word-aux">
          <ul>
            <li>表格上传必看：</li>
            <li>1、只能上传下载的Excel模板；</li>
            <li>2、；</li>
            <li
              >3、建议把图片文件名称命名为(邮箱_名字.jpg/png/gif)，
              <br />便系统自动识别输入固定参会人员的邮箱和名字；</li
            >
          </ul>
        </div> -->
      </el-col>
    </el-row>
  </el-card>

  <!-- 文件上传 -->
  <!--  <el-upload class="upload-demo" name="Excel_user" drag :action="action" multiple>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload> -->

  <el-row>
    <el-col :span="24">
      <div style="margin: auto; width: 60px">
        <el-button type="primary" @click="submitCreateMeeting()">预定</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import { Check, Close } from '@element-plus/icons-vue';
  import {
    createMeeting,
    insertUserMeeting,
    insertRoomMeeting,
    searchUserMessage,
    downloadUserModel,
  } from '@/api/meeting';
  import { searchAllUser, insertUsers1, insertUsers2 } from '@/api/system/user.js';
  import { searchOneUser } from '@/api/user';
  import { searchRoom, searchFreeRoom } from '@/api/meetingRoom.js';
  import { ElMessage, ElMessageBox } from 'element-plus';

  // import { searchDepartmentUsersByWant, searchDepartmentUsers } from '@/api/department.js';
  import {
    insertUserDepartment,
    deleteUserDepartment,
    searchDeptAndUserByWant,
    searchDeptAndUser,
  } from '@/api/department.js';
  import { netConfig } from '@/config/net.config.js';
  import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/accessToken';
  export default {
    data() {
      return {
        //签到时间radio
        radio: 0,
        // fileList: [],
        fileExcel: '',
        action: netConfig.baseURL + '/user/insertUserByExcel',
        myHeaders: {
          token: getAccessToken(),
        },
        currentNodeKey: '',
        ruleForm: {},
        //外部
        outOpen: false,
        outUserList: [],
        deptOptions: [
          {
            label: '广东轻工职业技术学院',
            children: [
              {
                label: '信息技术学院',
                children: [
                  {
                    label: '软件201',
                    children: [],
                  },
                  {
                    label: '软件202',
                  },
                  {
                    label: '软件203',
                  },
                  {
                    label: '软件204',
                  },
                ],
              },
              {
                label: '艺术技术学院',
                children: [
                  {
                    label: '数媒201',
                    children: [],
                  },
                  {
                    label: '数媒202',
                  },
                  {
                    label: '数媒203',
                  },
                  {
                    label: '数媒204',
                  },
                ],
              },
              {
                label: '机电技术学院',
                children: [
                  {
                    label: '机制191',
                    children: [],
                  },
                  {
                    label: '机制192',
                  },
                  {
                    label: '机制193',
                  },
                  {
                    label: '机制194',
                  },
                ],
              },
            ],
          },
        ],

        // 分页
        pageable: {
          // 当前页数
          currentPage: 1,
          // 每页显示个数
          pageSize: 10,
          // 总条目数
          total: 0,
        },

        Check: 'Check',
        Close: 'Close',
        //创建会议表单数据
        Meetingdata: {
          room: '',
          theme: '',
          data: '',
          startdate: '',
          endTdate: '',
          startTime: '',
          endTime: '',
          host: '',
          content: '',
        },
        searchParam: {},
        // 是否显示弹出层
        open: false,

        // ssdata: {
        //   // createtime: this.setNowTimes(),
        //   // createtime:'',
        //   name: '疫情防空主题班会',
        //   link: '',
        //   introduce: '',
        //   updatetime: '',
        //   starttime: '2022-6-22 10:00',
        //   endtime: '2022-6-22 11:00',
        //   sign_number: 2,
        //   user_number: 1,
        //   file_url: '',
        //   online: false,
        //   deleted: 1,
        // },
        //提交的打包数据
        ssdata: {
          host: '',
          name: '',
          introduce: '',
          startTime: '',
          endTime: '',
          // link: 'http://www.xxx.com',
          link: '',
          online: 0,
        },

        // Meetingdata:{
        //   name: '',
        //   introduce: '',
        //   startTime: '2022-06-23 12:24:00',
        //   endTime: '2022-06-23 14:24:00',
        //   link: 'http://www.baidu.com',
        //   online: 0,
        // },

        // {
        //     "name": "实训答辩-早上",
        //     "introduce": "软件204班JavaWeb框架实训答辩",
        //     "startTime:": "2022-06-23 12:24:00",
        //     "endTime": "2022-06-23 14:24:00",
        //     "link": "http://www.baidu.com",
        //     "online": 0
        // }
        // 会议室内容
        MeetingRoom: {
          // id: 1,
          // meetroomState: 1,
          // peoples: 100,
          // roomAddr: '第四工业实训楼',
          // roomName: '实训楼B407',
          roomName: '',
        },
        MeetingRoomoptions: [
          // {
          //   value: 'id',
          //   label: 'Option1-label',
          // },
        ],

        //用户模块内容
        // 是否显示弹出层
        UserAddopen: false,
        //自己的信息
        user: {},
        //全部用户数据
        UserList: [],
        //用户数据{id,username}
        UserListDataOption: [],
        //用户数据未去重
        UserListDataOptionFuben: [],
        //已选参会用户
        meetingUserList: [],
        //提交的参会人员id
        rightValue: [],
      };
    },
    mounted() {
      //初始化部门数据
      this.searchDepartmentAll();
      this.handleNodeClick('');
      // searchDepartmentUsersByWant('软件204').then((response) => {
      //   console.log('模糊查找部门下的全部用户软件204', response);
      // });
      // searchDepartmentUsers().then((response) => {
      //   console.log('查找全部部门下的全部用户', response);
      // });
      this.getCurrentTime();
      this.setNowTimes();
      this.searchUserAll();
      this.getRoom();
      // this.getMeetingUser();
    },
    methods: {
      //下载Excel
      downloadExcel() {
        // this.UserAddopen = true;
        // downloadUserModel().then((response) => {
        //   console.log('导出参会人员模版成功', response);
        // });
        window.open(netConfig.baseURL + '/meeting/downloadUserModel', '_self');
        ElMessage({
          showClose: true,
          message: '下载成功',
          type: 'success',
        });
      },
      //获取部门数据
      getTreeData(obj, arrT) {
        obj.forEach((item, index) => {
          let obj = {
            id: item.id,
            // partname: item.partname,
            // addr: item.addr,
            // introduce: item.introduce,
            // parentid: item.parentid,
            users: item.users,
            label: item.partname,
            children: [],
          };
          arrT.push(obj);
          //对其children再次执行getTreeData()函数
          if (item.departments) this.getTreeData(item.departments, obj.children);
        });
      },
      searchDepartmentAll() {
        let data = {
          // id: 32
          // introduce: null,
          // parentid: null,
          // addr:'南海',
          // partname: this.searchParam.departmentName,
        };
        searchDeptAndUserByWant(data).then((response) => {
          this.deptOptions = [];
          // console.log('模糊查询部门用户', response);
          this.getTreeData(response.data, this.deptOptions);
          // this.pageable.total = this.deptOptions.length;
        });
      },
      //去重
      fn2(arr) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.key) && res.set(arr.key, arr.key));
      },
      //获取用户数据
      getUserData(obj, a) {
        obj.forEach((item, index) => {
          // let obj = {
          //   id: item.id,
          //   users: item.users,
          //   label: item.partname,
          //   children: [],
          // };
          // arrT.push(obj);
          // let user = item.users;
          if (item.users) {
            a.push(...item.users);
            // console.log('次');
          }
          //对其children再次执行getTreeData()函数
          if (item.children) this.getUserData(item.children, a);
        });
        // for (let i = 0; i < obj.length; i++) {
        //   if (obj[i].users) {
        //     a.push(item.users);
        //   }
        //   if (item[i].children) {
        //     this.getUserData(item[i].children, a);
        //   }
        // }
      },
      // 选中的部门节点
      currentChecked(nodeObj, SelectedObj) {
        // console.log('currentNodeKey', this.currentNodeKey);
        // console.log(nodeObj);
        // console.log(SelectedObj);
        // console.log('选中节点的key数组', SelectedObj.checkedKeys); // 这是选中节点的key数组
        // console.log('这是选中节点数组', SelectedObj.checkedNodes); // 这是选中节点数组
        //获取主节点 如果子节点全部选上 这个方法就是空的
        this.rightValue = [];
        this.UserListDataOptionFuben = [];
        this.UserListDataOption = [];
        let Adata = [];
        this.getUserData(SelectedObj.checkedNodes, Adata);
        // console.log('Adata', Adata);
        for (let i = 0; i < Adata.length; i++) {
          //选项去掉自己
          if (Adata[i].id != this.user.id) {
            this.UserListDataOption.push({
              key: Adata[i].id,
              label: Adata[i].username,
              // disabled: i % 4 === 0,
            });
          }
        }
        //循环标签查用户
        // for (let i = 0; i < Adata.length; i++) {
        //   //选项去掉自己
        //   if (Adata[i].id != this.user.id) {
        //     this.UserListDataOption.push({
        //       key: Adata[i].id,
        //       label: Adata[i].username,
        //       // disabled: i % 4 === 0,
        //     });
        //   }
        // }
        // console.log('选项', this.UserListDataOption);
        //循环标签查用户
        // for (let i = 0; i < SelectedObj.checkedNodes.length; i++) {
        //   let label = SelectedObj.checkedNodes[i].label;
        //   searchDepartmentUsersByWant(label).then((response) => {
        //     // console.log('模糊查找部门下的全部用户', response);
        //     let Option = [];
        //     for (let i = 0; i < response.data.length; i++) {
        //       for (let j = 0; j < response.data[i].users.length; j++) {
        //         Option.push(response.data[i].users[j]);
        //       }
        //     }
        //     for (let i = 0; i < Option.length; i++) {
        //       //选项去掉自己
        //       if (Option[i].id != this.user.id) {
        //         this.UserListDataOptionFuben.push({
        //           key: Option[i].id,
        //           label: Option[i].username,
        //           // disabled: i % 4 === 0,
        //         });
        //       }
        //     }
        //   });
        // }
        // console.log('用户', Option);
        //赋值查重的用户数据去选项列表
        // this.UserListDataOption = this.UserListDataOptionFuben;
        // console.log('UserListDataOptionFuben', this.UserListDataOptionFuben);

        // this.UserListDataOption = [new Set(UserListDataOptionFuben)];
        // this.UserListDataOptio = this.fn2(this.UserListDataOption);
        // console.log('选项', this.UserListDataOptio);
        // console.log('选项', [new Set(UserListDataOptionFuben)]);
      },

      // currentChecked(data) {
      //   console.log('选中节点的key数组', data); // 这是选中节点的key数组
      // },
      // 部门
      handleNodeClick(data) {
        // console.log('data', data);
        // let label = data.label;
        // console.log('部门', label);
        // this.UserListDataOption = [];
        // searchDepartmentUsersByWant(label).then((response) => {
        //   console.log('模糊查找部门下的全部用户', response);
        //   let Option = [];
        //   for (let i = 0; i < response.data.length; i++) {
        //     for (let j = 0; j < response.data[i].users.length; j++) {
        //       Option.push(response.data[i].users[j]);
        //     }
        //   }
        //   console.log('用户', Option);
        //   for (let i = 0; i < Option.length; i++) {
        //     //选项去掉自己
        //     if (Option[i].id != this.user.id) {
        //       this.UserListDataOption.push({
        //         key: Option[i].id,
        //         label: Option[i].username,
        //         // disabled: i % 4 === 0,
        //       });
        //     }
        //   }
        // });
      },
      // 部门

      //单个删除
      deleteAccount(i, row) {
        // console.log('i', i);
        let deleteI = i;
        // console.log('row', row);
        // for (let i = 0; i < this.tableData.length; i++) {
        //   const element = this.tableData[i]
        //   element.id = i
        // }
        this.outUserList.forEach((e, i) => {
          if (deleteI == i) {
            this.outUserList.splice(i, 1);
          }
        });
        // console.log('outUserList', this.outUserList);
      },
      //多选删除
      // 批量删除
      delectAll() {
        // for (let i = 0; i < this.outUserList.length; i++) {
        //   const element = this.outUserList[i]
        //   element.id = i
        // }
        if (this.multipleSelection.length == 0) this.$message.error('请先至少选择一项');
        this.multipleSelection.forEach((element) => {
          this.outUserList.forEach((e, i) => {
            //判断相等的条件
            if (element.id == e.id) {
              this.outUserList.splice(i, 1);
            }
          });
        });
      },
      // 选择框
      handleSelectionChange(val) {
        // this.multipleSelection = val;
        // console.log(val);
      },

      //表格上传人员
      onChange(file, fileList) {
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
        //这里我需要上传mp3文件，所以做了限制
        const extension = testmsg === 'mp3';
        // if (!extension) {
        // 	this.$message({
        // 		message: '上传文件只能是mp3格式!',
        // 		type: 'warning'
        // 	});
        // 	return
        // }
        //将选取的文件拿到，这里需要根据自己业务来写
        // this.fileList[0] = file;
        this.fileExcel = file;
        // console.log('file', file);
        // console.log('fileList', fileList);

        // var that = this;
        // var reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = function (e) {
        //     that.fileList[0]=this.result
        // 	console.log('result',this.result)
        // };
      },

      //外部人员
      uploadImage() {
        var takePicture = document.getElementById('takepicture');
        takePicture.click();
      },
      batchUploadFilesChange(e) {
        var that = this;
        var files = e.target.files;
        for (var i = 0; i < files.length; i++) {
          const file = files[i];
          // console.log('file', file);
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            // # 只保留中文
            //    s_zh = re.sub(r"[^\u4e00-\u9fa5 ]+", '', s)
            //    # 只保留英文
            //    s_en = re.sub(r"[^a-zA-Z ]+", '', s)
            //通过正则表达式匹配出名字
            // let name = file['name'].replace(/.[^\d.]/g, '');
            let name = file['name'].replace(/[^\u4e00-\u9fa5 ]/gi, '');
            // let email = file['name'].replace(
            //   /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/gi,
            //   ''
            // );
            let email = file['name'].split('_');
            var item = {
              pcname: file['name'],
              email: email[0],
              name: name,
              faceurl: this.result,
            };
            //添加到集合
            that.outUserList.push(item);
            that.pageable.total = that.outUserList.length;
          };
        }
        // this.pageable.total = this.outUserList.length;
      },
      // getMeetingUser() {
      //   searchUserMessage(65).then((response) => {
      //     console.log(response);
      //   });
      // },
      //获得会议室
      getRoom() {
        searchRoom().then((response) => {
          // console.log(this.searchQueryMeetingForm);
          // this.meetingRoomList = response.data;
          // this.pageable.total = this.meetingRoomList.length;
          // console.log(response);
          this.MeetingRoom = response.data[0];
          for (let i = 0; i < response.data.length; i++) {
            this.MeetingRoomoptions.push({
              // value: response.data[i].id,
              value: response.data[i].roomName,
              label: response.data[i].roomName,
            });
          }
        });
      },
      //选取会议室
      handleChangeMeetingRoomoptions(val) {
        // console.log(val);
        // console.log(this.MeetingRoom); //id
        // room_name
      },

      //查询所有用户
      searchUserAll() {
        //查询自己
        searchOneUser().then((response) => {
          const { data } = response;
          this.user = data[0];
        });
        //查询所有用户
        searchAllUser().then((response) => {
          // console.log('查询所有用户', response);
          this.UserList = response.data;
          // console.log('this.UserList');
          // console.log(this.UserList);
          //
          // for (let i = 0; i < response.data.length; i++) {
          //   //选项去掉自己
          //   if (response.data[i].id != this.user.id) {
          //     this.UserListDataOption.push({
          //       key: response.data[i].id,
          //       label: response.data[i].username,
          //       // disabled: i % 4 === 0,
          //     });
          //   }
          // }
        });

        //根据部门变换选择列表
      },
      /** 添加参会人员操作 */
      handleChange(value, direction, movedKeys) {
        // console.log(value, direction, movedKeys);
        //右边框有的值
        // console.log(this.rightValue);
      },
      handleUserAdd() {
        this.UserAddopen = true;

        // downloadUserModel().then((response) => {
        //   console.log('导出参会人员模版成功', response);
        // });
        // window.open(netConfig.baseURL + '/meeting/downloadUserModel', '_self');
        // ElMessage({
        //   showClose: true,
        //   message: '导出成功',
        //   type: 'success',
        // });

        // insertUsers1(data).then((response) => {
        //   console.log('批量注册用户1', response);
        // });
        // console.log('faceurl46', this.outUserList[0].faceurl);
        // insertUsers1(userList, meetingid).then((response) => {
        //   console.log('批量注册用户1', response);
        // });

        //表格上传
        //自定义上传
        // const form = new FormData();
        // //将选取的文件插入formdata中
        // form.append('Excel_user', this.fileList[0].raw);
        // insertUsers2(form, meetingid).then((response) => {
        //   console.log('批量注册用户表格上传2', response);
        // });
      },

      //保存已选用户
      SaveSelectedUser() {
        this.UserAddopen = false;
        this.meetingUserList = [];
        // console.log('this.UserList item');
        for (let i = 0; i < this.UserList.length; i++) {
          // console.log(this.UserList[i].id);
          let x = this.UserList[i].id;
          for (let j = 0; j < this.rightValue.length; j++) {
            let y = this.rightValue[j];
            if (x == y) {
              // console.log(x);
              this.meetingUserList.push(this.UserList[i]);
            }
          }
        }
        // console.log('已选的参会人员的基本信息', this.meetingUserList);
      },
      CreateMeeting() {
        ElMessageBox.confirm('是否确定提交预定?', '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            // (this.ssdata.signTime = this.Meetingdata.startdate + ' ' + this.Meetingdata.startTime),
            (this.ssdata.signTime = this.subDelete(
              this.Meetingdata.startdate + ' ' + this.Meetingdata.startTime,
              this.radio
            )),
              (this.ssdata.host = this.Meetingdata.host),
              (this.ssdata.name = this.Meetingdata.theme),
              (this.ssdata.introduce = this.Meetingdata.content),
              (this.ssdata.meetingTime =
                this.Meetingdata.startdate +
                ' ' +
                this.Meetingdata.startTime +
                '-' +
                this.Meetingdata.endTime),
              // (this.ssdata.startTime =
              //   this.Meetingdata.startdate + ' ' + this.Meetingdata.startTime),
              // (this.ssdata.endTime = this.Meetingdata.endTdate + ' ' + this.Meetingdata.endTime),
              (this.ssdata.link = ''),
              (this.ssdata.online = 0),
              // console.log(this.ssdata);
              createMeeting(this.ssdata).then((response) => {
                // console.log(response);
                let userList = {
                  type: '',
                  idList: this.rightValue,
                  meetingid: response.data,
                };
                //插入用户
                insertUserMeeting(userList).then((response) => {
                  // console.log('插入用户成功', response);
                });
                //插入会议室
                let RoomAndMeeting = {
                  // room_name: '实训楼B505',
                  room_name: this.MeetingRoom.roomName,
                  meetingid: response.data,
                };
                insertRoomMeeting(RoomAndMeeting).then((response) => {
                  // console.log('插入会议室成功', response);
                });
                let meetingid = response.data;
                let userDataList = [];
                if (this.outOpen) {
                  if (this.outUserList != []) {
                    for (let i = 0; i < this.outUserList.length; i++) {
                      let use = {
                        email: this.outUserList[i].email,
                        username: this.outUserList[i].name,
                        base64Face: this.outUserList[i].faceurl,
                      };
                      userDataList.push(use);
                    }
                    // console.log('图片批量注册用户数据', userDataList);
                    insertUsers1(userDataList, meetingid).then((response) => {
                      // console.log('图片批量注册用户1', response);
                    });
                  }
                }
                if (this.fileExcel) {
                  // 表格批量注册用户上传;
                  const form = new FormData();
                  //将选取的文件插入formdata中
                  form.append('Excel_user', this.fileExcel.raw);
                  insertUsers2(form, meetingid).then((response) => {
                    // console.log('批量注册用户表格上传2', response);
                    this.$router.push({
                      name: '会议管理',
                      path: `/meeting`,
                      // query: {
                      //   id: id,
                      // },
                    });
                  });
                }

                ElMessage({
                  showClose: true,
                  message: '预定成功',
                  type: 'success',
                });
                this.$router.push({
                  name: '会议管理',
                  path: `/meeting`,
                  // query: {
                  //   id: id,
                  // },
                });
              });
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            });
          });
      },
      //提交预定会议
      submitCreateMeeting() {
        // console.log('radio', this.radio);

        // console.log(
        //   'subDelete',
        //   this.subDelete(this.Meetingdata.startdate + ' ' + this.Meetingdata.startTime, this.radio)
        // );
        // console.log('提交的会议数据', this.Meetingdata);
        //是否是email
        let emailflag = true;
        let nameflag = true;
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        for (let i = 0; i < this.outUserList.length; i++) {
          if (this.outUserList[i].name == '') {
            nameflag = false;
          } else {
            nameflag = true;
          }
          if (!regEmail.test(this.outUserList[i].email)) {
            emailflag = false;
          } else {
            emailflag = true;
          }
        }
        //检查会议主题
        if (this.Meetingdata.theme == '') {
          ElMessage({
            showClose: true,
            message: '请输入会议主题',
            type: 'warning',
          });
          //检查图片批量上传的邮箱格式和名字
          //有一个不行提示
        } else if (!emailflag || !nameflag) {
          ElMessage({
            showClose: true,
            message: '请检查图片批量上传的邮箱格式和名字！',
            type: 'error',
          });
        } else if (
          this.Meetingdata.startdate == '' ||
          this.Meetingdata.startTime == '' ||
          this.Meetingdata.endTime == ''
        ) {
          ElMessage({
            showClose: true,
            message: '请选择会议时间',
            type: 'warning',
          });
        } else {
          //查询会议室是否空闲
          let searchFreeRoomQuery = {
            roomName: this.MeetingRoom.roomName,
            meetingTime:
              this.Meetingdata.startdate +
              ' ' +
              this.Meetingdata.startTime +
              '-' +
              this.Meetingdata.endTime,
          };
          // console.log('查询会议室是否空闲参数', searchFreeRoomQuery);
          searchFreeRoom(searchFreeRoomQuery).then((response) => {
            // console.log('查询会议室是否空闲', response);
            if (response.code == 200) {
              // console.log('通过');

              this.CreateMeeting();
            } else {
              ElMessage({
                showClose: true,
                message: '此时间段已经有其他会议！',
                // type: 'info',
                type: 'warning',
              });
            }
          });
        }
      },

      //分页
      handleSizeChange: function (size) {
        this.pageable.pageSize = size;
        this.pageable.total = this.outUserList.length;
      },
      handleCurrentChange: function (currentPage) {
        this.pageable.currentPage = currentPage;
      },
      //获取签到时间
      subDelete(data, deleteMinutes) {
        var _d = new Date(data);

        _d = new Date(_d.valueOf() - deleteMinutes * 60 * 1000); // 当前时间加上1分钟
        var _d_year111 = _d.getFullYear(); //年
        var _d_month111 = _d.getMonth() + 1; //月
        _d_month111 = _d_month111 < 10 ? '0' + _d_month111 : _d_month111;
        var _d_day111 = _d.getDate(); //日
        _d_day111 = _d_day111 < 10 ? '0' + _d_day111 : _d_day111;
        var _d_hours111 = _d.getHours();
        var _d_minutes111 = _d.getMinutes();
        var _d_seconds111 = _d.getSeconds();
        if (_d_hours111 < 10) _d_hours111 = '0' + _d_hours111;
        if (_d_minutes111 < 10) _d_minutes111 = '0' + _d_minutes111;
        if (_d_seconds111 < 10) _d_seconds111 = '0' + _d_seconds111;

        // var _data = _d_year111 + "-" + _d_month111.toString() + "-" + _d_day111 + " " + _d_hours111 + ":" + _d_minutes111 +
        // 	":" + _d_seconds111;
        var _data =
          _d_year111 +
          '-' +
          _d_month111.toString() +
          '-' +
          _d_day111 +
          ' ' +
          _d_hours111 +
          ':' +
          _d_minutes111;
        // console.log('_data', _data);
        return _data;
      },

      //获取当前时间
      getCurrentTime() {
        let currentTime = new Date(),
          year = currentTime.getFullYear(),
          month =
            currentTime.getMonth() + 1 < 10
              ? '0' + (currentTime.getMonth() + 1)
              : currentTime.getMonth() + 1,
          day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
        this.Meetingdata.startdate = year + '-' + month + '-' + day;
        // this.Meetingdata.startdate = '2022' + '-' + '07' + '-' + '07';
      },
      //限制只能选择今天之后
      disabledDateFun(time) {
        // 默认只能选择今天以及今天之后的日期
        // return time.getTime() < new Date().getTime() - 2 * 8.64e7; //8.64e7就是一天的时间戳 24*60*60*1000
        return time.getTime() < new Date().getTime() - 1 * 8.64e7; //8.64e7就是一天的时间戳 24*60*60*1000
        // return '';
      },
      setNowTimes() {
        let myDate = new Date();
        let wk = myDate.getDay();
        let yy = String(myDate.getFullYear());
        let mm = myDate.getMonth() + 1;
        let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate());
        let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours());
        let min = String(
          myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
        );
        let sec = String(
          myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
        );
        let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        let week = weeks[wk];
        let nowDate = yy + '-' + mm + '-' + dd;
        let nowTime = hou + ':' + min + ':' + sec;
        let nowWeek = week;
        // this.Meetingdata.startTime = hou + ':' + min;
        // console.log(this.Meetingdata.startTime);
        // console.log(nowDate);
        // console.log(nowTime);
        // console.log(nowWeek);
        return nowDate + nowTime;
      },
    },
  };
</script>
<style>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    margin-bottom: 10px;
  }

  .el-upload-list__item-thumbnail {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    -o-object-fit: contain;
    object-fit: contain;
    position: relative;
    z-index: 1;
    background-color: var(--el-color-white);
  }

  .text-center {
    text-align: center;
  }
</style>

<style>
  .infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
  }

  .infinite-list .infinite-list-item + .list-item {
    margin-top: 10px;
  }
</style>
