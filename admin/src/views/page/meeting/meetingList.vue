<template>
  <div class="table-box">
    <!--  -->
    <div class="table-search">
      <!-- form -->
      <el-form :inline="true" :model="searchQueryMeetingForm" class="demo-form-inline">
        <el-form-item label="主持人">
          <el-input v-model="searchQueryMeetingForm.host" placeholder="主持人" clearable></el-input>
        </el-form-item>
        <el-form-item label="会议主题">
          <el-input
            v-model="searchQueryMeetingForm.meetingname"
            placeholder="会议主题"
            clearable
          ></el-input>
        </el-form-item>
        <!--        <el-form-item label="会议室">
          <el-select v-model="MeetingRoom.roomName" placeholder="请选择会议室">
            <el-option
              v-for="item in MeetingRoomoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="会议室">
          <el-select
            v-model="MeetingRoom.roomName"
            :multiple="multiple"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            allow-create
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="OnSearchSubmit">
            <icon-search></icon-search>查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--  -->
    <div class="table-header">
      <!-- 			<div class="header-button-lf">
				<el-button type="primary" :icon="CirclePlus" @click="handleAdd()">新增用户
				</el-button>
				<el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户
				</el-button>
				<el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据
				</el-button>
				<el-button type="danger" :icon="Delete" plain :disabled="!isSelected" @click="batchDelete">
					批量删除用户
				</el-button>
			</div> -->
      <!-- 			<div class="header-button-ri">
				<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
			</div> -->
    </div>

    <el-table
      height="600"
      :data="
        meetingList.slice(
          (this.pageable.currentPage - 1) * this.pageable.pageSize,
          this.pageable.currentPage * this.pageable.pageSize
        )
      "
      border
      style="width: 100%"
    >
      <el-table-column label="会议号" width="50">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-link type="primary">{{ scope.row.id }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="会议时间" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span style="margin-left: 10px">{{ scope.row.meetingTime }}</span>
          </div>
        </template>
      </el-table-column>

      <!--      <el-table-column label="会议开始时间" width="250">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="会议结束时间" width="250">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="会议室" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.roomName }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="会议主题" width="200" show-overflow-tooltip>
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-link type="primary">{{ scope.row.name }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="主持人" width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.host }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="会议介绍" min-width="250">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-link type="primary">{{ scope.row.introduce }}</el-link>
          </div>
        </template>
      </el-table-column>
      <!--      <el-table-column label="会议创建时间" width="250">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column> -->

      <!--      <el-table-column label="会议状态" width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.status }}</span>
          </div>
        </template>
      </el-table-column> -->

      <el-table-column label="操作" width="225" fixed="right">
        <template #default="scope">
          <!--          <el-tooltip content="查看会议信息" placement="top" effect="light">
            <el-button size="small" @click="ViewSubmit(scope.row)">
              <icon-eyes></icon-eyes>
            </el-button>
          </el-tooltip> -->
          <el-tooltip content="会议信息修改" placement="top" effect="light">
            <el-button size="small" @click="UpdateSubmit(scope.row)">
              <icon-pencil></icon-pencil>
            </el-button>
          </el-tooltip>
          <el-tooltip content="导出会议记录" placement="top" effect="light">
            <el-button size="small" @click="exportMeeting(scope.row)">
              <icon-download></icon-download>
            </el-button>
          </el-tooltip>
          <el-tooltip content="会议签到详情" placement="top" effect="light">
            <el-button size="small" @click="meetingSignIn(scope.row)">
              <icon-file-text></icon-file-text>
            </el-button>
          </el-tooltip>
          <el-tooltip content="取消会议" placement="top" effect="light">
            <el-button size="small" @click="cancelMeeting(scope.row)">
              <icon-delete-five></icon-delete-five>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>

      <template #empty>
        <div class="table-empty">
          <!-- <img src="@/assets/images/notData.png" alt="notData" /> -->
          <div>暂无数据</div>
        </div>
      </template>
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

    <!-- 对话框的结构 -->
    <el-dialog v-model="open" title="修改会议信息" width="1200px">
      <el-row :gutter="10">
        <el-col :span="12">
          <!--  -->
          <el-card class="box-card" style="box-shadow: none; height: 510px">
            <template #header>
              <div class="card-header">
                <span>会议说明</span>
              </div>
            </template>
            <el-form ref="form" :model="updateMeetingdata" label-width="90px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="会议室">
                    <el-select v-model="updateMeetingRoom.roomName" placeholder="请选择会议室">
                      <!-- <el-option label="新会议室-001" value="新会议室-001"></el-option>
                  <el-option label="新会议室-002" value="新会议室-002"></el-option> -->
                      <el-option
                        v-for="item in MeetingRoomoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="会议主题">
                    <el-input
                      v-model="updateMeetingdata.theme"
                      placeholder="请输入会议主题"
                      maxlength="30"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 单个日期 -->
              <el-form-item label="会议日期">
                <el-col :span="8">
                  <el-date-picker
                    v-model="updateMeetingdata.startdate"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    type="date"
                    :disabled-date="disabledDateFun"
                    placeholder="日期"
                  />
                </el-col>
              </el-form-item>

              <el-form-item label="会议时间">
                <el-col :span="9">
                  <el-time-select
                    v-model="updateMeetingdata.startTime"
                    :max-time="updateMeetingdata.endTime"
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
                    v-model="updateMeetingdata.endTime"
                    :min-time="updateMeetingdata.startTime"
                    format="HH:mm"
                    value-format="HH:mm"
                    placeholder="结束时间"
                    start="00:00"
                    step="00:15"
                    end="24:00"
                  />
                </el-col>
              </el-form-item>
              <!-- 
          <el-form-item label="会议时间" required>
                       <el-col :span="8">
              <el-form-item>
                <el-date-picker
                  v-model="updateMeetingdata.startdate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  type="date"
                  :disabled-date="disabledDateFun"
                  placeholder="日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item>
                <el-time-select
                  v-model="updateMeetingdata.startTime"
                  :max-time="updateMeetingdata.endTime"
                  format="HH:mm"
                  value-format="HH:mm"
                  class="mr-4"
                  placeholder="起始时间"
                  start="00:00"
                  step="00:15"
                  end="24:00"
                />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">-</el-col>

                       <el-col :span="5">
              <el-form-item>
                <el-date-picker
                  v-model="updateMeetingdata.endTdate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  type="date"
                  :disabled-date="disabledDateFun"
                  placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item>
                <el-time-select
                  v-model="updateMeetingdata.endTime"
                  :min-time="updateMeetingdata.startTime"
                  format="HH:mm"
                  value-format="HH:mm"
                  placeholder="结束时间"
                  start="00:00"
                  step="00:15"
                  end="24:00"
                />
              </el-form-item>
            </el-col>
          </el-form-item> -->
              <el-row>
                <el-col :span="12">
                  <el-form-item label="可签到时段">
                    <!-- <el-input v-model="Meetingdata.host" placeholder="请输入你的昵称" maxlength="30" /> -->
                    <!-- <span>{{ user.username }}</span> -->
                    <!-- <el-input v-model="user.username" :disabled="true"> </el-input> -->
                    <el-radio-group v-model="radio">
                      <!--            <el-radio :label="0">与会议时间相同</el-radio>
                      <el-radio :label="30">会议前半小时到会议结束</el-radio>
                      <el-radio :label="60">会议前一小时到会议结束</el-radio> -->
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
                    <!--              <el-input
                v-model="updateMeetingdata.host"
                placeholder="请输入你的昵称"
                maxlength="30"
              /> -->
                    <el-input v-model="updateMeetingdata.host" :disabled="true"> </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="会议内容">
                    <el-input
                      type="textarea"
                      autosize
                      v-model="updateMeetingdata.content"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <!-- <el-button type="primary" @click="submitCreateMeeting()">预定</el-button> -->
                <!-- <el-button>Cancel</el-button> -->
              </el-form-item>
            </el-form>
          </el-card>
          <!--  -->
        </el-col>

        <el-col :span="12">
          <el-card class="box-card" style="box-shadow: none; height: 510px">
            <template #header>
              <div class="card-header">
                <span>参会人员列表</span>
                <el-button class="button" type="primary" @click="handleUserAdd()" text
                  >参会人员管理</el-button
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
            <el-dialog v-model="UserAddopen" title="修改参会人员" width="1000px">
              <el-row>
                <!--部门数据-->
                <el-col :span="9">
                  <!-- 部门 -->
                  <!--              <div class="head-container">
                    <el-input
                      v-model="deptName"
                      placeholder="请输入部门名称"
                      clearable
                      size="small"
                      prefix-icon="el-icon-search"
                      style="margin-bottom: 20px"
                    />
                  </div> -->
                  <div style="border: 1px solid; padding: 1.5rem; margin: 0.5px">
                    <ul class="infinite-list" style="overflow: auto">
                      <div class="head-container">
                        <el-tree
                          :data="deptOptions"
                          :props="defaultProps"
                          :expand-on-click-node="false"
                          :filter-node-method="filterNode"
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
          <!--  -->
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelSubmitUpdateMeeting()">取消</el-button>
          <el-button type="primary" @click="submitUpdateMeeting()">确定修改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
  import { ref, onMounted, reactive, toRefs } from 'vue';
  import { Timer } from '@element-plus/icons-vue';
  import { netConfig } from '@/config/net.config.js';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import {
    searchUserMeeting,
    searchMeetingByPage,
    download,
    searchUserMessage,
    UpdateMeeting,
    deleteMeeting,
    searchSingleMeeting,
    searchAllMeeting,
    insertUserMeeting,
    searchMeeting,
    searchHost,
    updateRoomMeeting,
  } from '@/api/meeting.js';
  import { searchAllUser } from '@/api/system/user.js';
  import { searchOneUser } from '@/api/user';
  import { searchRoom, searchFreeRoom } from '@/api/meetingRoom.js';
  import {
    insertUserDepartment,
    deleteUserDepartment,
    searchDeptAndUserByWant,
    searchDeptAndUser,
  } from '@/api/department.js';
  export default {
    components: {
      Timer,
      // meetingDetails,
    },
    data() {
      return {
        //远程搜索会议室
        //不多选
        multiple: false,
        options: [],
        loading: false,
        //签到时间radio
        radio: 0,
        // 是否显示弹出层
        open: false,
        searchShow: true,
        stripe: true, //是否为斑马纹 table
        //
        meetingList: [],

        // 修改的信息
        //会议修改数据表单
        updateMeetingdata: {
          // 主持人
          host: '',
          room: '',
          theme: '主题',
          data: '',
          startdate: '',
          endTdate: '',
          startTime: '',
          endTime: '',
          content: '',
        },
        //修改会议室的数据
        updateMeetingRoom: {
          roomName: '',
        },
        oldMeetingTime: '',
        //一个会议的信息 提交修改
        OneMeetingdata: {
          // id: 1,
          // createtime: '',
          // name: '',
          // link: '',
          // introduce: '',
          // updatetime: '',
          // starttime: '2022-6-22 10:00',
          // endtime: '2022-6-22 11:00',
          // sign_number: 2,
          // user_number: 1,
          // file_url: '',
        },

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

        // 分页
        pageable: {
          // 当前页数
          currentPage: 1,
          // 每页显示个数
          pageSize: 10,
          // 总条目数
          total: 0,
        },

        //查询会议参数
        searchQueryMeetingForm: {
          host: '',
          meetingname: '',
          meetingroom: '',
        },
        //用户模块内容
        // 是否显示弹出层
        UserAddopen: false,
        //自己的信息
        user: {},
        //全部用户数据
        UserList: [],
        UserListDataOption: [],
        //用户数据未去重
        UserListDataOptionFuben: [],

        //已选参会用户
        meetingUserList: [],
        //提交的参会人员id
        rightValue: [],
        //部门
        deptOptions: [
          {
            label: '广东轻工职业技术学院',
            children: [
              {
                label: '信息技术学院',
                children: [
                  {
                    label: '软件204',
                    children: [],
                  },
                  {
                    label: '软件203',
                  },
                  {
                    label: '软件202',
                  },
                  {
                    label: '软件201',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
    mounted() {
      // this.getAllUser();
      this.getuserinfo();
      this.OnSearchSubmit();
      this.getRoom();
      this.searchDepartmentAll();
    },

    methods: {
      //远程搜索方法
      remoteMethod(query) {
        //如果参数不为空
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.MeetingRoomoptions.filter((item) => {
              //toLowerCase将字符串转换为小写。
              //indexOf查找字符串 "welcome":
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      },
      //分页
      handleSizeChange: function (size) {
        this.pageable.pageSize = size;
        // this.getMyMeeting();
        this.OnSearchSubmit();
      },

      handleCurrentChange: function (currentPage) {
        this.pageable.currentPage = currentPage;
        // this.getMyMeeting();
        this.OnSearchSubmit();
      },
      //高级查询会议
      OnSearchSubmit() {
        this.searchQueryMeetingForm.meetingroom = this.MeetingRoom.roomName;
        searchMeeting(this.searchQueryMeetingForm).then((response) => {
          // console.log(this.searchQueryMeetingForm);
          // console.log('高级查询', response);
          this.meetingList = response.data;
          this.pageable.total = this.meetingList.length;
        });
        searchUserMeeting().then((response) => {
          // console.log('查询用户的会议', response);
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
      //获得会议室
      getRoom() {
        searchRoom().then((response) => {
          // console.log(this.searchQueryMeetingForm);
          // this.meetingRoomList = response.data;
          // this.pageable.total = this.meetingRoomList.length;
          // console.log(response);
          // this.MeetingRoom = response.data[0];
          for (let i = 0; i < response.data.length; i++) {
            this.MeetingRoomoptions.push({
              // value: response.data[i].id,
              value: response.data[i].roomName,
              label: response.data[i].roomName,
            });
          }
        });
      },

      //根据查询所有用户
      //去重
      fn2(arr) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.key) && res.set(arr.key, arr.key));
      },
      getUserData(obj, a) {
        obj.forEach((item, index) => {
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
        //       //选项去掉主持人
        //       // if (Option[i].id != this.user.id) {
        //       //   this.UserListDataOptionFuben.push({
        //       //     key: Option[i].id,
        //       //     label: Option[i].username,
        //       //     // disabled: i % 4 === 0,
        //       //   });
        //       // }
        //       //选项去掉主持人
        //       if (Option[i].username != this.updateMeetingdata.host) {
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
      },

      //查询所有用户
      getuserinfo() {
        //查询自己
        searchOneUser().then((response) => {
          // console.log('查询自己',response)
          const { data } = response;
          this.user = data[0];
          // console.log('查询自己id', this.user.id);
        });
        searchAllUser().then((response) => {
          this.UserListDataOption = [];
          // console.log('查询所有用户', response);
          this.UserList = response.data;
        });
      },
      getAllUser() {
        //查询所有用户
        searchAllUser().then((response) => {
          this.UserListDataOption = [];
          // console.log('查询所有用户', response);
          this.UserList = response.data;
          for (let i = 0; i < response.data.length; i++) {
            //选项去掉主持人

            // if (response.data[i].username == this.updateMeetingdata.host) {
            //   console.log('this.updateMeetingdata.host', this.updateMeetingdata.host);
            //   // return
            // } else {
            //   this.UserListDataOption.push({
            //     key: response.data[i].id,
            //     label: response.data[i].username,
            //     // disabled: i % 4 === 0,
            //   });
            // }
            //选项去掉主持人
            if (response.data[i].username != this.updateMeetingdata.host) {
              this.UserListDataOption.push({
                key: response.data[i].id,
                label: response.data[i].username,
                // disabled: i % 4 === 0,
              });
            }
          }
        });
      },
      /** 参会人员管理 */
      handleUserAdd() {
        this.getAllUser();
        this.UserAddopen = true;
        let id = this.OneMeetingdata.id;
        //不需要操作，已经修改按钮操作

        //根据会议ID查询会议的用户信息
        // searchUserMessage(id).then((response) => {
        //   console.log('根据会议ID查询会议的用户信息', response);
        //   //先清空在赋值显示列表
        //   this.meetingUserList = [];
        //   for (let i = 0; i < this.UserList.length; i++) {
        //     // console.log(this.UserList[i].id);
        //     let x = this.UserList[i].id;
        //     //显示列表去掉自己
        //     if (x != this.user.id) {
        //       for (let j = 0; j < response.data.length; j++) {
        //         let y = response.data[j].userId;
        //         if (x == y) {
        //           // console.log(x);
        //           this.meetingUserList.push(this.UserList[i]);
        //         }
        //       }
        //     }
        //   }
        //   console.log('参会人员', this.meetingUserList);
        //   //把参会人员遍历放进this.rightValue
        //   this.rightValue = [];
        //   for (let i = 0; i < this.meetingUserList.length; i++) {
        //     this.rightValue.push(this.meetingUserList[i].id);
        //   }
        // });
      },
      handleChange(value, direction, movedKeys) {
        // console.log(value, direction, movedKeys);
        //右边框有的值
        // console.log(this.rightValue);
      },
      //保存已选用户
      SaveSelectedUser() {
        this.UserAddopen = false;
        //清空但是要加上主持人
        this.meetingUserList = [];
        // this.meetingUserList.push()
        for (let i = 0; i < this.UserList.length; i++) {
          // console.log(this.UserList[i].id);
          let x = this.UserList[i].username;
          // console.log('x', x);
          //显示列表加上主持人
          if (x == this.updateMeetingdata.host) {
            this.meetingUserList.push(this.UserList[i]);
          }
        }
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
        // console.log('保存已选用户', this.meetingUserList);
        // console.log('rightValue', this.rightValue);
      },

      /** 点击会议信息修改 */
      UpdateSubmit(row) {
        this.getuserinfo();
        this.open = true;
        let id = row.id;
        this.OneMeetingdata = row;
        // let json= JSON.stringify(row); //可以将json对象转换成json对符串
        // this.OneMeetingdata = JSON.parse(json); //可以将json字符串转换成json对象
        // console.log('会议信息修改赋值', this.OneMeetingdata);
        //给表单赋值
        // 2022-07-05 01:00～03:00
        const strArr1 = row.meetingTime.split(' ', 2);
        // console.log('strArr1', strArr1);
        const t = String(strArr1[1]);
        // console.log('t', t);
        // console.log(t.split('//~'));
        let time = t.split('-', 2);
        // console.log('time', time);

        this.updateMeetingdata.host = row.host;
        this.updateMeetingdata.theme = row.name;
        this.updateMeetingdata.content = row.introduce;

        this.updateMeetingdata.startdate = strArr1[0];
        this.updateMeetingdata.startTime = time[0];
        this.updateMeetingdata.endTime = time[1];

        this.oldMeetingTime = strArr1[0] + ' ' + time[0] + '-' + time[1];
        this.radio = this.getRadio(strArr1[0] + ' ' + time[0], row.signTime);

        //给表单赋值
        // const strArr1 = row.startTime.split(' ', 2);
        // // console.log(strArr1);
        // const strArr2 = row.endTime.split(' ', 2);
        // // console.log(strArr2);
        // this.updateMeetingdata.startdate = strArr1[0];
        // this.updateMeetingdata.startTime = strArr1[1];
        // this.updateMeetingdata.endTdate = strArr2[0];
        // this.updateMeetingdata.endTime = strArr2[1];
        searchHost(id).then((response) => {
          // console.log('根据ID查询会议的主持人', response);
        });
        // console.log(id);
        // 根据ID查询会议的基本信息;
        // searchSingleMeeting(id).then((response) => {
        //   console.log('根据ID查询会议的基本信息', response);
        // });

        //根据会议ID查询会议的用户信息
        searchUserMessage(id).then((response) => {
          // console.log('根据会议ID查询会议的用户信息', response);
          //先清空在赋值显示列表
          this.meetingUserList = [];
          for (let i = 0; i < this.UserList.length; i++) {
            // console.log(this.UserList[i].id);
            let x = this.UserList[i].id;
            //显示列表去掉自己
            // if (x != this.user.id) {
            //   for (let j = 0; j < response.data.length; j++) {
            //     let y = response.data[j].userId;
            //     if (x == y) {
            //       // console.log(x);
            //       this.meetingUserList.push(this.UserList[i]);
            //     }
            //   }
            // }
            for (let j = 0; j < response.data.length; j++) {
              let y = response.data[j].userId;
              if (x == y) {
                // console.log(x);
                this.meetingUserList.push(this.UserList[i]);
              }
            }
          }
          // console.log('参会人员', this.meetingUserList);
          //把参会人员遍历放进this.rightValue
          this.rightValue = [];
          // this.rightValue.push({
          //   id: 28,
          //   disabled: true,
          // });
          for (let i = 0; i < this.meetingUserList.length; i++) {
            //已选用户列表去掉自己
            if (this.meetingUserList[i].id != this.user.id) {
              this.rightValue.push(this.meetingUserList[i].id);
            }
          }
        });
        //会议室赋值
        this.updateMeetingRoom.roomName = row.roomName;
      },

      async UpdateMeetingFunction() {
        (this.OneMeetingdata.signTime = this.subDelete(
          this.updateMeetingdata.startdate + ' ' + this.updateMeetingdata.startTime,
          this.radio
        )),
          (this.OneMeetingdata.host = this.updateMeetingdata.host),
          (this.OneMeetingdata.introduce = this.updateMeetingdata.content),
          // (this.OneMeetingdata.introduce =
          //   this.updateMeetingdata.content === ''
          //     ? this.OneMeetingdata.introduce
          //     : this.updateMeetingdata.content),
          (this.OneMeetingdata.name = this.updateMeetingdata.theme),
          (this.OneMeetingdata.meetingTime =
            this.updateMeetingdata.startdate +
            ' ' +
            this.updateMeetingdata.startTime +
            '-' +
            this.updateMeetingdata.endTime),
          // (this.OneMeetingdata.endTime =
          //   this.updateMeetingdata.endTdate + ' ' + this.updateMeetingdata.endTime),
          // console.log('修改成功的数据', this.OneMeetingdata);
        await UpdateMeeting(this.OneMeetingdata).then((response) => {
          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
          });
          this.open = false;
        });
        let userList = {
          type: '修改',
          idList: this.rightValue,
          meetingid: this.OneMeetingdata.id,
        };
        // console.log('插入的用户', this.rightValue);
        //过滤主持人
        let hostID = null;
        for (let i = 0; i < this.UserList.length; i++) {
          // console.log(this.UserList[i].id);
          let x = this.UserList[i].username;
          // console.log('x', x);
          //显示列表加上主持人
          if (x == this.updateMeetingdata.host) {
            hostID = this.UserList[i].id;
          }
        }
        for (let i = 0; i < this.rightValue.length; i++) {
          if (hostID == this.rightValue[i]) {
            this.rightValue.splice(i, 1);
          }
        }

        //插入用户
        await insertUserMeeting(userList).then((response) => {
          // console.log('修改用户成功', response);
        });
        // //插入修改会议室
        // let RoomAndMeeting = {
        //   // room_name: '实训楼B505',
        //   room_name: this.updateMeetingRoom.roomName,
        //   meetingid: this.OneMeetingdata.id,
        // };
        // await updateRoomMeeting(RoomAndMeeting).then((response) => {
        //   console.log('修改会议室成功', response);
        // });

        //修改会议室
        let room_name = this.updateMeetingRoom.roomName;
        let meetingid = this.OneMeetingdata.id;
        await updateRoomMeeting(room_name, meetingid).then((response) => {
          // console.log('修改会议室成功', response);
        });

        this.open = false;
        //刷新获取会议信息
        await this.OnSearchSubmit();
      },
      // 提交会议信息修改
      submitUpdateMeeting() {
        //检查会议主题
        if (this.updateMeetingdata.theme == '') {
          ElMessage({
            showClose: true,
            message: '请输入会议主题',
            type: 'warning',
          });
        } else if (
          this.updateMeetingdata.startdate == '' ||
          this.updateMeetingdata.startTime == '' ||
          this.updateMeetingdata.endTime == ''
        ) {
          ElMessage({
            showClose: true,
            message: '请选择会议时间',
            type: 'warning',
          });
        } else {
          //查询会议室是否空闲
          let searchFreeRoomQuery = {
            roomName: this.updateMeetingRoom.roomName,
            meetingTime:
              this.updateMeetingdata.startdate +
              ' ' +
              this.updateMeetingdata.startTime +
              '-' +
              this.updateMeetingdata.endTime,
            oldMeetingTime: this.oldMeetingTime,
          };
          // console.log('查询会议室是否空闲参数', searchFreeRoomQuery);
          searchFreeRoom(searchFreeRoomQuery).then((response) => {
            // console.log('查询会议室是否空闲', response);
            if (response.code == 200) {
              ElMessageBox.confirm('是否确定修改?', '系统提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
              })
                .then(() => {
                  this.UpdateMeetingFunction();
                })
                .catch(() => {
                  ElMessage({
                    type: 'info',
                    message: '已取消',
                  });
                });
            } else {
              ElMessage({
                showClose: true,
                message: '此时间段已经有其他会议！',
                // type: 'info',
                type: 'warning',
              });
            }
          });

          // this.UpdateMeetingFunction();
        }
      },

      //取消对话框
      cancelSubmitUpdateMeeting() {
        this.open = false;
      },

      // 取消会议
      cancelMeeting(row) {
        // deleteMeeting
        let id = row.id;
        ElMessageBox.confirm('是否取消会议?', '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            deleteMeeting(id).then((response) => {
              ElMessage({
                showClose: true,
                message: '会议取消成功',
                type: 'success',
              });
              //刷新获取会议信息
              this.OnSearchSubmit();
            });
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            });
          });
      },

      // 参会人员人脸信息录入

      //导出会议数据
      exportMeeting(row) {
        let meetingid = row.id;

        ElMessageBox.confirm('是否导出会议记录?', '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            if (meetingid) {
              window.open(
                netConfig.baseURL + '/meeting/downloadMeetingData?meetingid=' + meetingid,
                '_self'
              );
              ElMessage({
                showClose: true,
                message: '导出成功',
                type: 'success',
              });
            }
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            });
          });
      },

      //会议签到
      meetingSignIn(row) {
        let id = row.id;
        // this.$router.push({ name: "会议签到", path: `/meetingSignIn`, query: { id: id } });
        let routeUrl = this.$router.resolve({
          path: '/meetingSignIn',
          query: {
            id: id,
          },
        });
        window.open(routeUrl.href, '_blank');
      },
      // 参会人员管理
      meetingPersonnel(row) {
        let id = row.MeetingId;
        this.$router.push({
          name: '参会人员管理',
          path: `/meetingPersonnel`,
          query: {
            id: id,
          },
        });
      },
      //获取getRadio
      getRadio(meetingstataTime, signTime) {
        // console.log('会议开始时间', meetingstataTime);
        // console.log('签到时间', signTime);
        if (this.subDelete(meetingstataTime, 0) == signTime) {
          return 0;
        }
        if (this.subDelete(meetingstataTime, 30) == signTime) {
          return 30;
        }
        if (this.subDelete(meetingstataTime, 60) == signTime) {
          return 60;
        }
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
      },
      //限制只能选择今天之后
      disabledDateFun(time) {
        // 默认只能选择今天以及今天之后的日期
        return time.getTime() < new Date().getTime() - 1 * 8.64e7; //8.64e7就是一天的时间戳 24*60*60*1000
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
        // console.log(nowDate);
        // console.log(nowTime);
        // console.log(nowWeek);
        return nowDate + nowTime;
      },
    },
  };
</script>

<style>
  .table-box {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .table-box .table-search {
    display: flex;
    margin-bottom: 10px;
  }

  .table-box .table-search .el-form {
    max-width: 1260px;
  }

  .table-box .table-search .search-operation {
    margin-left: 15px;
    white-space: nowrap;
  }

  .table-box .table-header .header-button-ri {
    float: right;
  }

  .table-box .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin: 23px 0 10px;
  }
</style>

<style>
  .table-box .table-header .header-button-lf .el-button {
    margin-bottom: 20px;
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
