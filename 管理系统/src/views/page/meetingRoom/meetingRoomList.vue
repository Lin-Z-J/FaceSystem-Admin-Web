<template>
  <div class="table-box">
    <!--  -->
    <div class="table-search">
      <!-- form -->
      <el-form :inline="true" :model="searchParam" class="demo-form-inline">
        <el-form-item label="会议室名称">
          <el-input v-model="searchParam.roomName" placeholder="会议室名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="会议室地址">
          <el-input placeholder="会议室地址" v-model="searchParam.roomAddr" clearable></el-input>
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
      <div class="header-button-lf">
        <el-button type="primary" @click="handleAdd()">
          <icon-plus></icon-plus>新增会议室
        </el-button>
        <!-- 				<el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户
				</el-button>
				<el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据
				</el-button>
				<el-button type="danger" :icon="Delete" plain :disabled="!isSelected" @click="batchDelete">
					批量删除用户
				</el-button> -->
      </div>
      <!-- 			<div class="header-button-ri">
				<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
			</div> -->
    </div>

    <!--  -->
    <el-table
      height="560"
      :data="
        meetingRoomList.slice(
          (this.pageable.currentPage - 1) * this.pageable.pageSize,
          this.pageable.currentPage * this.pageable.pageSize
        )
      "
      :border="true"
      style="width: 100%"
    >
      <!-- <el-table-column type="selection" width="" /> -->
      <el-table-column prop="roomName" label="会议室名称" width="150"></el-table-column>
      <el-table-column
        prop="roomAddr"
        label="会议室地址"
        show-overflow-tooltip
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="peoples"
        label="可容纳人数"
        show-overflow-tooltip
        width="120"
      ></el-table-column>
      <!--      <el-table-column prop="meetingRoomstatus" label="会议室状态" width="180" v-slot="scope">
        <el-switch
          :value="scope.row.meetroomState"
          :active-text="scope.row.meetroomState === 1 ? '启用' : '禁用'"
          :active-value="1"
          :inactive-value="0"
          @change="changeStatus($event, scope.row)"
          disabled
        />
      </el-table-column> -->

      <el-table-column label="操作" width="200" v-slot="scope">
        <!-- <el-button type="primary" link @click="handleUpdate('查看', scope.row)">查看</el-button> -->
        <el-button type="primary" link @click="handleUpdateMeetingRoom('修改', scope.row)">
          <icon-pencil></icon-pencil>修改
        </el-button>
        <!--        <el-button type="primary" link @click="deleteAccount(scope.row)">
          <icon-close-one></icon-close-one>关闭
        </el-button> -->
        <!-- <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button> -->
        <el-button type="primary" link @click="deleteAccount(scope.row)">
          <icon-delete-five></icon-delete-five>删除
        </el-button>
        <!-- <span v-if="!BUTTONS.view && !BUTTONS.edit && !BUTTONS.reset && !BUTTONS.delete">--</span> -->
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
    <el-dialog v-model="addOpen" title="添加会议室" width="680px">
      <el-form ref="addform" :rules="rules" :model="addForm" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议室名称" prop="roomName">
              <el-input v-model="addForm.roomName" placeholder="请输入会议室名称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="会议室地址" prop="roomAddr">
              <el-input v-model="addForm.roomAddr" placeholder="会议室地址" maxlength="11" />
            </el-form-item>
          </el-col>
          <!--          <el-col :span="24">
            <el-form-item label="门牌号" prop="phonenumber">
              <el-input v-model="form.phonenumber" placeholder="请输入门牌号" maxlength="11" />
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="可容纳人数" prop="peoples">
              <el-input-number
                v-model="addForm.peoples"
                placeholder="请输入"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addOpen = false">取消</el-button>
          <el-button type="primary" @click="submitAddMeetingRoom('addform')">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 对话框的结构 -->
    <el-dialog v-model="open" title="修改会议室" width="680px">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议室名称" prop="roomName">
              <el-input v-model="form.roomName" placeholder="请输入会议室名称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="会议室地址" prop="roomAddr">
              <el-input v-model="form.roomAddr" placeholder="会议室地址" maxlength="11" />
            </el-form-item>
          </el-col>
          <!--          <el-col :span="24">
            <el-form-item label="门牌号" prop="phonenumber">
              <el-input v-model="form.phonenumber" placeholder="请输入门牌号" maxlength="11" />
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="可容纳人数" prop="peoples">
              <el-input-number
                v-model="form.peoples"
                placeholder="请输入"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <!--          <el-col :span="24">
            <el-form-item label="会议室状态" prop="status">
              <el-radio-group v-model="form.status" size="mini">
                <el-radio-button label="0">正常</el-radio-button>
                <el-radio-button label="1">停用</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <!--          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="submitUpdateMeetingRoom('form')">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
  import { ref, onMounted, reactive, toRefs } from 'vue';
  import {
    searchRoom,
    searchRoomByWant,
    addMeetingRoom,
    updateRoom,
    deleteRoom,
  } from '@/api/meetingRoom.js';

  // import UserDrawer from "./components/UserDrawer.vue";
  export default {
    // components: {
    // 	UserDrawer
    // },
    data() {
      var validNumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入可容纳人数'));
        }
        // console.log('value:' + value);
        if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      };
      return {
        searchParam: {
          id: '',
          roomAddr: '',
          roomName: '',
        },
        searchShow: true,
        // meetingRoomList: [{
        //     name: '默认会议室',
        //     address: '新大楼A栋',
        //     peopleNumber: '10',
        //     meetingRoomstatus: 1,
        //     houseNumber: 203
        //   }

        // ],
        stripe: true, //是否为斑马纹 table
        // tableData: [],
        // currentPage: 1,
        // pagesize: 10,
        // total: 0,
        meetingRoomList: [],

        // 分页
        pageable: {
          // 当前页数
          currentPage: 1,
          // 每页显示个数
          pageSize: 10,
          // 总条目数
          total: 0,
        },
        //
        addOpen: false,
        // 是否显示弹出层
        open: false,
        // 表单参数
        addForm: {
          roomName: '',
          roomAddr: '',
          peoples: '',
        },
        form: {},
        formInline: {},
        rules: {
          roomName: [
            {
              required: true,
              message: '请输入会议室名称',
              trigger: 'blur',
            },
            // {
            //   validator: validUsername,
            //   trigger: ['blur', 'change'],
            // },
          ],
          roomAddr: [
            {
              required: true,
              message: '请输入会议室地址',
              trigger: 'blur',
            },
            // {
            //   validator: validUsername,
            //   trigger: ['blur', 'change'],
            // },
          ],

          peoples: [
            {
              required: true,
              message: '请输入可容纳人数',
              trigger: 'blur',
            },
            {
              // type: 'password',
              //第1钟
              // pattern:/^0?1(3|4|5|7|8)\d{9}$/,
              // message: '请输入正确的密码',

              validator: validNumber,
              trigger: ['blur', 'change'],
            },
          ],
        },
      };
    },
    mounted() {
      this.OnSearchSubmit();
    },
    methods: {
      OnSearchSubmit() {
        searchRoomByWant(this.searchParam).then((response) => {
          // console.log(this.searchQueryMeetingForm);
          this.meetingRoomList = response.data;
          this.pageable.total = this.meetingRoomList.length;
          // console.log('查询会议室', response);
        });
      },
      // getRoom() {
      //   searchRoomByWant().then((response) => {
      //     // console.log(this.searchQueryMeetingForm);
      //     this.meetingRoomList = response.data;
      //     this.pageable.total = this.meetingRoomList.length;
      //     console.log(response);
      //   });
      // },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRange = [];
        this.resetForm('queryForm');
        this.handleQuery();
      },
      //新增
      handleAdd() {
        this.addOpen = true;
      },
      submitAddMeetingRoom(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ElMessageBox.confirm('是否确定提交?', '系统提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(() => {
                // console.log('新增会议室数据', this.addForm);
                addMeetingRoom(this.addForm).then((response) => {
                  this.OnSearchSubmit();
                  // console.log('新增会议室成功', response);
                  ElMessage({
                    showClose: true,
                    message: '新增成功',
                    type: 'success',
                  });
                  this.addOpen = false;
                });
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
              message: '请检查输入是否正确！',
              type: 'error',
            });

            return false;
          }
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
      },
      /** 修改按钮操作 */
      handleUpdateMeetingRoom(title, row) {
        this.open = true;
        // console.log(title);
        // console.log(row);
        this.form = row;
      },
      submitUpdateMeetingRoom(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ElMessageBox.confirm('是否确定修改?', '系统提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(() => {
                // console.log('提交修改的数据', this.form);
                updateRoom(this.form).then((response) => {
                  this.OnSearchSubmit();
                  // console.log(response);
                  ElMessage({
                    showClose: true,
                    message: '修改成功',
                    type: 'success',
                  });
                });
                this.open = false;
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
              message: '请检查输入是否正确！',
              type: 'error',
            });

            return false;
          }
        });
      },
      //取消对话框
      cancelSubmitUpdateMeetingRoom() {
        this.open = false;
      },
      deleteAccount(row) {
        let roomid = row.id;
        // console.log('row', row);
        ElMessageBox.confirm('是否确定删除?', '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            deleteRoom(roomid).then((response) => {
              this.OnSearchSubmit();
              // console.log('删除会议室成功', response);
              ElMessage({
                showClose: true,
                message: '删除成功',
                type: 'success',
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
      handleSizeChange(size) {
        this.pageable.pageSize = size;
      },
      handleCurrentChange(currentPage) {
        this.pageable.currentPage = currentPage;
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
