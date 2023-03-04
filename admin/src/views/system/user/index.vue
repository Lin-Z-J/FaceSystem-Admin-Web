<template>
  <div class="table-box">
    <!-- 搜索表单 -->
    <div class="table-search">
      <el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
        <el-form-item label="用户名称 :">
          <el-input v-model="searchParam.username" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <!--        <el-form-item label="性别 :">
          <el-select v-model="searchParam.gender" placeholder="请选择" clearable>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item> -->
        <!--        <el-form-item label="用户昵称 :">
          <el-input v-model="searchParam.idCard" placeholder="请输入" clearable></el-input>
        </el-form-item> -->
        <el-form-item label="邮箱 :">
          <el-input v-model="searchParam.email" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <!--        <el-form-item label="状态:" prop="status">
          <el-select placeholder="用户状态" clearable>
            <el-option
              v-for="item in enabledTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item> -->
        <!--        <div class="more-item" v-show="searchShow">
          <el-form-item label="创建时间 :">
            <el-date-picker
              v-model="searchParam.createTime"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
        </div> -->
      </el-form>
      <div class="search-operation">
        <el-button type="primary" @click="searchUserAll()">
          <icon-search></icon-search>搜索
        </el-button>
        <!-- <el-button @click="reset"> <icon-delete-themes></icon-delete-themes>重置 </el-button> -->
        <!--        <el-button type="primary" link class="search-isOpen" @click="searchShow = !searchShow">
          {{ searchShow ? '合并' : '展开' }}
          <el-icon class="el-icon--right">
            <component :is="searchShow ? ArrowUp : ArrowDown"></component>
          </el-icon>
        </el-button> -->
      </div>
    </div>

    <!-- 搜索表头 -->
    <div class="table-header">
      <div class="header-button-lf">
        <el-button type="primary" @click="handleAddUser()">
          <icon-plus></icon-plus>新增用户
        </el-button>
        <el-button type="primary" plain @click="handleImportAdd">批量导入用户 </el-button>
        <!-- <el-button type="primary" plain @click="downloadFile">导出用户数据 </el-button> -->
        <!--        <el-button type="danger" plain :disabled="!isSelected" @click="batchDelete">
          批量删除用户
        </el-button> -->
      </div>
      <!-- 			<div class="header-button-ri">
				<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
			</div> -->
    </div>

    <!-- 数据表格 -->
    <el-table
      height="565"
      :data="
        userList.slice(
          (this.pageable.currentPage - 1) * this.pageable.pageSize,
          this.pageable.currentPage * this.pageable.pageSize
        )
      "
      :border="true"
    >
      <!-- <el-table-column type="selection" reserve-selection width="50" /> -->
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column
        prop="power"
        label="用户角色"
        show-overflow-tooltip
        align="center"
        width="90"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="用户名称"
        show-overflow-tooltip
        align="center"
        width="90"
      ></el-table-column>
      <el-table-column
        prop="nickname"
        label="用户昵称"
        show-overflow-tooltip
        align="center"
        width="90"
      ></el-table-column>
      <el-table-column prop="faceUrl" label="人脸照片" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <!--         <el-icon>
              <timer />
            </el-icon> -->
            <!-- <span style="margin-left: 10px">{{ scope.row.faceurl }}</span> -->
            <!-- <img :src="URL + scope.row.faceUrl" class="el-upload-list__item-thumbnail" /> -->
            <img :src="toURL(scope.row)" class="el-upload-list__item-thumbnail" />
            <!-- <el-image :src="toURL(scope.row)" /> -->
            <!-- <el-image :src="require(toURL(scope.row))" /> -->
          </div>
        </template>
      </el-table-column>
      <!--      <el-table-column
        prop="faceUrl"
        label="人脸链接"
        show-overflow-tooltip
        width="120"
      ></el-table-column> -->
      <el-table-column
        prop="partnames"
        label="部门"
        show-overflow-tooltip
        align="center"
        width="90"
      ></el-table-column>
      <el-table-column prop="sex" label="性别" show-overflow-tooltip align="center" width="50">
        <!-- {{ scope.row.gender == 1 ? '男' : '女' }} -->
      </el-table-column>
      <el-table-column prop="age" label="年龄" show-overflow-tooltip align="center" width="50">
        <!-- {{ scope.row.age == 1 ? '男' : '女' }} -->
      </el-table-column>

      <!--      <el-table-column prop="head" label="头像" show-overflow-tooltip v-slot="scope">{{
        scope.row.age
      }}</el-table-column> -->
      <el-table-column prop="phone" label="手机号" show-overflow-tooltip align="center" width="150">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        show-overflow-tooltip
        align="center"
        min-width="200"
      >
      </el-table-column>
      <!-- <el-table-column prop="address" label="居住地址" show-overflow-tooltip></el-table-column> -->
      <!--      <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip width="200"></el-table-column>
      <el-table-column prop="status" label="用户状态" width="180" v-slot="scope">
        <el-switch :value="scope.row.status" :active-text="scope.row.status === 1 ? '启用' : '禁用'" :active-value="1"
          :inactive-value="0" @change="changeStatus($event, scope.row)" />
      </el-table-column> -->

      <el-table-column label="操作" width="400" v-slot="scope" align="center" fixed="right">
        <!-- <el-button type="primary" link @click="handleUpdate('查看', scope.row)">查看</el-button> -->
        <el-button type="primary" link @click="handleUpdateUser('编辑', scope.row)">
          <icon-pencil></icon-pencil>编辑
        </el-button>
        <el-button type="danger" @click="resetFace(scope.row)">重置人脸</el-button>
        <el-button type="primary" link @click="resetPass(scope.row)">重置密码</el-button>
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
    <el-dialog v-model="open" title="修改用户">
      <el-form ref="form" :rules="rules" :model="UpdateForm" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="用户人脸">
              <!-- <img :src="URL + UpdateForm.faceUrl" class="el-upload-list__item-thumbnail" /> -->

              <img :src="UpdatefaceUrl" class="el-upload-list__item-thumbnail" />
              <el-upload
                ref="upload"
                action="#"
                :limit="1"
                :on-progress="handleFileUploadProgress"
                :on-success="handleFileSuccess"
                :on-change="onChange"
              >
                <el-button type="primary" style="margin-left: 20px">修改人脸</el-button>
              </el-upload>
              <!--              <el-button
                type="danger"
                style="margin-left: 20px; margin-bottom: 10px"
                @click="resetFace()"
                >重置人脸</el-button
              > -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="username">
              <el-input v-model="UpdateForm.username" placeholder="请输入用户名" maxlength="30" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="角色" prop="username">
              <el-select v-model="UpdateForm.power" placeholder="请选择角色">
                <el-option label="管理员" value="管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="UpdateForm.phone" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="UpdateForm.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickname">
              <el-input v-model="UpdateForm.nickname" placeholder="请输入用户昵称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别" prop="sex">
              <el-select v-model="UpdateForm.sex" placeholder="用户性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
              <el-input
                v-model="form.password"
                placeholder="请输入用户密码"
                type="password"
                maxlength="20"
                show-password
              />
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="归属部门">
              <el-tree-select
                v-model="UpdateDepartmentname"
                :data="departmentsData"
                default-expand-all
                @node-click="handleNodeClick"
                @check="currentChecked"
              />
            </el-form-item>
          </el-col>
          <!--          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status" size="mini">
                <el-radio-button label="0">正常</el-radio-button>
                <el-radio-button label="1">停用</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="UpdateForm.age" placeholder="请输入年龄" maxlength="2" />
            </el-form-item>
          </el-col>
        </el-row>
        <!--        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" placeholder="请输入年龄" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row> -->
        <!--        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelSubmitUpdateMeeting()">取消</el-button>
          <el-button type="primary" @click="UpdateSubmit('form')">确定修改</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 新增用户对话框的结构 -->
    <el-dialog v-model="AddUseropen" title="新增用户">
      <el-form ref="Addform" :rules="rules" :model="AddUserFrom" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="用户人脸" prop="ADDfaceUrl">
              <!-- <img :src="URL + UpdateForm.faceUrl" class="el-upload-list__item-thumbnail" /> -->

              <img :src="AddUserFrom.ADDfaceUrl" class="el-upload-list__item-thumbnail" />
              <el-upload
                ref="upload"
                action="#"
                :limit="1"
                :on-progress="handleFileUploadProgress"
                :on-success="handleFileSuccess"
                :on-change="onAddChange"
              >
                <el-button type="primary" style="margin-left: 20px">上传人脸</el-button>
              </el-upload>
              <el-input v-show="false" v-model="AddUserFrom.ADDfaceUrl" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="username">
              <el-input v-model="AddUserFrom.username" placeholder="请输入用户名" maxlength="30" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="角色" prop="power">
              <el-select v-model="AddUserFrom.power" placeholder="请选择角色">
                <el-option label="管理员" value="管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="AddUserFrom.phone" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="AddUserFrom.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickname">
              <el-input
                v-model="AddUserFrom.nickname"
                placeholder="请输入用户昵称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别" prop="sex">
              <el-select v-model="AddUserFrom.sex" placeholder="用户性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="password">
              <el-input
                v-model="AddUserFrom.password"
                placeholder="请输入用户密码"
                type="password"
                maxlength="20"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="addDepartmentname">
              <el-tree-select
                v-model="AddUserFrom.addDepartmentname"
                :data="departmentsData"
                default-expand-all
                @node-click="addhandleNodeClick"
                @check="currentChecked"
              />
            </el-form-item>
          </el-col>
          <!--          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status" size="mini">
                <el-radio-button label="0">正常</el-radio-button>
                <el-radio-button label="1">停用</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="AddUserFrom.age" placeholder="请输入年龄" maxlength="2" />
            </el-form-item>
          </el-col>
        </el-row>
        <!--        <el-row>
           <el-col :span="12">
             <el-form-item label="年龄" prop="age">
               <el-input v-model="form.age" placeholder="请输入年龄" maxlength="50" />
             </el-form-item>
           </el-col>
         </el-row> -->
        <!--        <el-row>
           <el-col :span="24">
             <el-form-item label="备注">
               <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
         </el-row> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelSubmitAddUser()">取消</el-button>
          <el-button type="primary" @click="SubmitAddUser('Addform')">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 重置密码对话框的结构 -->
    <el-dialog v-model="resetPassopen" title="重置密码">
      <el-form ref="resetPassfrom" :rules="rules" :model="resetPassFrom" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="重置密码" prop="newpassword">
              <el-input
                v-model="resetPassFrom.newpassword"
                placeholder="请输入重置密码"
                type="password"
                maxlength="20"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!--          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
              <el-input
                v-model="form.password"
                placeholder="请输入密码"
                type="password"
                maxlength="20"
                show-password
              />
            </el-form-item>
          </el-col> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelSubmitResetPass()">取消</el-button>
          <el-button type="primary" @click="SubmitResetPass('resetPassfrom')">确定修改</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog title="用户导入" v-model="uploadOpen" width="400px" append-to-body>
      <!--      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      > -->
      <el-upload
        ref="upload"
        action="#"
        :limit="1"
        accept=".xlsx, .xls"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :on-change="onExcelChange"
        :auto-upload="false"
        :file-list="fileList"
        drag
      >
        <!-- <i class="el-icon-upload"></i> -->
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

        <template #tip>
          <div class="el-upload__tip text-center">
            仅允许导入xls、xlsx格式文件。
            <el-link
              type="primary"
              :underline="false"
              style="font-size: 12px; vertical-align: baseline"
              @click="importTemplate"
              >下载模板</el-link
            >
          </div>
        </template>

        <!--        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate"
            >下载模板</el-link
          >
        </div> -->
      </el-upload>
      <!--      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div> -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="uploadOpen = false">取消</el-button>
          <el-button type="primary" @click="submitFileForm()">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
  import { ref, onMounted, reactive, toRefs } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { netConfig } from '@/config/net.config.js';
  import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/accessToken';
  // import {  } from '@/api/system';
  // import UserDrawer from "./components/UserDrawer.vue";
  import {
    searchAllUser,
    powerinsertUser,
    powerupdateUser,
    powerupdatePassword,
    searchUser,
    searchAllUserByWant,
    deleteUserByAdmin,
    insertUser,
    insertUsers2,
    updateUserByAdmin,
    reSetFace,
  } from '@/api/system/user.js';
  import { preinsertUser, register, uploadFaceEmail } from '@/api/user.js';
  import {
    insertUserDepartment,
    deleteUserDepartment,
    searchDeptAndUserByWant,
    searchDeptAndUser,
  } from '@/api/department.js';
  export default {
    // components: {
    // 	UserDrawer
    // },
    data() {
      var validUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          // 用户名包含5-12位的数字或字母
          // let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,20}$/;
          let reg = /^[\w\u4E00-\u9FA5]{2,10}$/;
          if (!reg.test(value)) {
            callback(new Error('用户名只能包含2-10位的汉字/数字/字母和下划线'));
          } else {
            callback();
          }
          // if (this.registerForm.username !== '') {
          //   // this.$refs.dynamicValidateForm.validateField('password');
          // }
          callback();
        }
      };
      var validPassword = (rule, value, callback) => {
        // console.log(rule)
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,16}$/;
          if (!reg.test(value)) {
            callback(new Error('密码必须是由4-20位字母+数字组合'));
          } else {
            callback();
          }
          // if (this.registerForm.password !== '') {
          // }
          callback();
        }
      };
      // 手机号码验证
      var validPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('该项不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      var validNumber = (rule, value, callback) => {
        // console.log('value:' + value);
        if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      };
      var validPartname = (rule, value, callback) => {
        // console.log('请选择归属部门', value);
        if (value === '') {
          callback(new Error('请选择归属部门'));
        }
        // else if (value !== this.Code) {
        //   callback(new Error('验证码错误!'));
        // }
        else {
          callback();
        }
      };
      var validSex = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择用户性别'));
        }
        // else if (value !== this.Code) {
        //   callback(new Error('验证码错误!'));
        // }
        else {
          callback();
        }
      };
      var validPower = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择角色'));
        }
        // else if (value !== this.Code) {
        //   callback(new Error('验证码错误!'));
        // }
        else {
          callback();
        }
      };

      var validADDfaceUrl = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请上传人脸'));
        }
        // else if (value !== this.Code) {
        //   callback(new Error('验证码错误!'));
        // }
        else {
          callback();
        }
      };
      return {
        fileList: [],
        fileExcel: '',
        // 用户导入参数
        upload: {
          // 是否显示弹出层（用户导入）
          open: false,
          // 弹出层标题（用户导入）
          title: '',
          // 是否禁用上传
          isUploading: false,
          // 是否更新已经存在的用户数据
          updateSupport: 0,
          // 设置上传的请求头部
          headers: {
            token: getAccessToken(),
          },
          // 上传的地址
          url: netConfig.baseURL + '',
        },
        URL: netConfig.baseURL,
        // 分页
        pageable: {
          // 当前页数
          currentPage: 1,
          // 每页显示个数
          pageSize: 10,
          // 总条目数
          total: 0,
        },
        searchParam: {
          username: '',
          gender: '',
          idCard: '',
          email: '',
          createTime: '',
        },
        searchShow: true,
        userList: [],

        // 是否显示弹出层
        open: false,
        AddUseropen: false,
        resetPassopen: false,
        uploadOpen: false,
        // 修改表单参数
        UpdateForm: {},
        //修改人脸的数据
        UpdatefaceUrl: '',
        UpdatefaceBase46: '',
        //上传人脸的数据
        ADDfaceUrl: '',

        //新增用户表单
        AddUserFrom: {
          username: '',
          power: '',
          phone: '',
          email: '',
          nickname: '',
          sex: '',
          age: '',
          password: '',
          addDepartmentname: '',
          ADDfaceUrl: '',
        },
        resetPassFrom: {
          email: '',
          newpassword: '',
        },
        //新增部门的名字
        addDepartmentname: '',
        addDepartmentid: '',
        //修改部门的名字
        UpdateDepartmentname: '',
        UpdateDepartmentid: '',
        departmentsData: [],
        //表单规则项
        rules: {
          username: [
            {
              required: true,
              message: '请输入用户名称',
              trigger: 'blur',
            },
            {
              // type: 'email',
              // message: '请输入正确的用户名',
              validator: validUsername,
              trigger: ['blur', 'change'],
            },
          ],

          email: [
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: '请输入正确的邮箱',
              trigger: ['blur', 'change'],
            },
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur',
            },
            {
              // type: 'password',
              //第1钟
              // pattern:/^0?1(3|4|5|7|8)\d{9}$/,
              // message: '请输入正确的密码',

              validator: validPassword,
              trigger: ['blur', 'change'],
            },
          ],
          nickname: [
            // { required: true, message: '请输入用户昵称', trigger: ['blur', 'change'] },
          ],
          power: [
            {
              required: true,
              message: '请选择角色',
              trigger: 'blur',
            },
            {
              // type: 'password',

              // message: '请输入正确的密码',
              validator: validPower,
              trigger: ['blur', 'change'],
            },
          ],

          phone: [
            {
              required: true,
              message: '请输入手机号码',
              trigger: 'blur',
            },
            {
              // type: 'password',
              //第1钟
              // pattern:/^0?1(3|4|5|7|8)\d{9}$/,
              // message: '请输入正确的密码',

              validator: validPhone,
              trigger: ['blur', 'change'],
            },
          ],
          sex: [
            {
              required: true,
              message: '请选择用户性别',
              trigger: 'blur',
            },
            {
              // type: 'password',

              // message: '请输入正确的密码',
              validator: validSex,
              trigger: ['blur', 'change'],
            },
          ],

          age: [
            {
              required: true,
              message: '请输入年龄',
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
          newpassword: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur',
            },
            {
              // type: 'password',
              //第1钟
              // pattern:/^0?1(3|4|5|7|8)\d{9}$/,
              // message: '请输入正确的密码',

              validator: validPassword,
              trigger: ['blur', 'change'],
            },
          ],
          addDepartmentname: [
            {
              required: true,
              message: '请选择归属部门',
              trigger: 'blur',
            },
            {
              // type: 'password',

              // message: '请输入正确的密码',
              validator: validPartname,
              trigger: ['blur', 'change'],
            },
          ],
          ADDfaceUrl: [
            {
              required: true,
              message: '请上传人脸',
              trigger: 'blur',
              // trigger: ['blur', 'change'],
            },
            {
              // type: 'password',

              // message: '请输入正确的密码',
              validator: validADDfaceUrl,
              trigger: ['blur', 'change'],
            },
          ],
        },
      };
    },
    mounted() {
      this.searchUserAll();
      this.searchDepartmentAll();
    },
    methods: {
      //部门
      // handleNodeClick(data, node) {
      //   console.log('data', data);
      //   console.log('node', node);
      //   console.log('partname', this.partname);
      // },
      toURL(row) {
        return this.URL + row.faceUrl;
      },
      getTreeData(obj, arrT) {
        obj.forEach((item, index) => {
          let obj = {
            // id: item.id,
            // partname: item.partname,
            // addr: item.addr,
            // introduce: item.introduce,
            // parentid: item.parentid,
            // users: item.users,
            value: item.id,
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
          this.departmentsData = [];
          // console.log('模糊查询部门用户', response);
          this.getTreeData(response.data, this.departmentsData);
          // this.pageable.total = this.departmentsList.length;
        });
      },
      addhandleNodeClick(node) {
        // console.log('data', data);
        // console.log('node.value', node.value);
        // console.log('node.label', node.label);
        // console.log('partname', this.partname);
        this.addDepartmentname = node.label;
        this.addDepartmentid = node.value;
      },
      handleNodeClick(node) {
        // console.log('data', data);
        // console.log('node.value', node.value);
        // console.log('node.label', node.label);
        // console.log('partname', this.partname);
        this.UpdateDepartmentname = node.label;
        this.UpdateDepartmentid = node.value;
      },
      // 选中的部门节点
      currentChecked(nodeObj, SelectedObj) {
        // console.log('currentNodeKey', this.currentNodeKey);
        // console.log(nodeObj);
        // console.log(SelectedObj);
        // console.log('选中节点的key数组', SelectedObj.checkedKeys); // 这是选中节点的key数组
        // console.log('这是选中节点数组', SelectedObj.checkedNodes); // 这是选中节点数组
      },

      //新增上传人脸
      onAddChange(file, fileList) {
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
        // console.log('file', file);
        // console.log('fileList', fileList);

        var that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function (e) {
          // that.fileList[0]=this.result
          // that.UpdatefaceBase46 = this.result;
          that.AddUserFrom.ADDfaceUrl = this.result;
          // console.log('result', this.result);
        };
      },
      //修改上传人员
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
        // console.log('file', file);
        // console.log('fileList', fileList);

        var that = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function (e) {
          // that.fileList[0]=this.result
          that.UpdatefaceBase46 = this.result;
          that.UpdatefaceUrl = this.result;
          // console.log('result', this.result);
        };
      },

      onExcelChange(file, fileList) {
        // console.log('file', file);
        // console.log('fileList', fileList);
        this.fileExcel = file;
        // var that = this;
        // var reader = new FileReader();
        // reader.readAsDataURL(file.raw);
        // reader.onload = function (e) {
        //   console.log('result', this.result);
        // };
      },
      //批量导入用户
      handleImportAdd() {
        this.uploadOpen = true;
      },
      importTemplate() {
        window.open(netConfig.baseURL + '/meeting/downloadUserModel', '_self');
        ElMessage({
          showClose: true,
          message: '下载成功',
          type: 'success',
        });
      },
      // // 文件上传中处理
      handleFileUploadProgress(event, file, fileList) {
        // this.upload.isUploading = true;
      },
      // // 文件上传成功处理
      handleFileSuccess(response, file, fileList) {
        //   this.upload.open = false;
        //   this.uploadOpen = false;
        //   this.upload.isUploading = false;
        //   this.$refs.upload.clearFiles();
        //   this.$alert(
        //     "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
        //       response.msg +
        //       '</div>',
        //     '导入结果',
        //     {
        //       dangerouslyUseHTMLString: true,
        //     }
        //   );
        //   this.getList();
      },
      // 提交上传文件
      submitFileForm() {
        // console.log('fileList', this.fileList);
        // this.$refs.upload.submit();
        //表格上传
        //自定义上传
        if (this.fileExcel == '') {
          ElMessage({
            showClose: true,
            message: '请先上传文件',
            type: 'warning',
          });
        } else {
          ElMessageBox.confirm('是否确定提交?', '系统提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              const form = new FormData();
              //将选取的文件插入formdata中
              form.append('Excel_user', this.fileExcel.raw);
              let meetingid = 0;
              insertUsers2(form, meetingid).then((response) => {
                this.searchUserAll();
                // console.log('批量注册用户表格上传2', response);
                this.uploadOpen = false;
                this.fileExcel = '';
                this.fileList = [];
                ElMessage({
                  showClose: true,
                  message: response.message,
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
        }
      },
      //重置密码
      resetPass(row) {
        this.resetPassopen = true;
        // console.log(row);
        // console.log(row.email);
        this.resetPassFrom.email = row.email;
      },
      SubmitResetPass(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ElMessageBox.confirm('是否确定修改?', '系统提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(() => {
                let u = {
                  email: this.resetPassFrom.email,
                  newpassword: this.resetPassFrom.newpassword,
                };
                powerupdatePassword(u).then((response) => {
                  // console.log(response);
                  ElMessage({
                    showClose: true,
                    message: '修改成功',
                    type: 'success',
                  });
                  this.resetPassopen = false;
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
      cancelSubmitResetPass() {
        this.resetPassopen = false;
      },

      //有查询参数 的分页 查询所有用户信息
      searchUserAll() {
        searchAllUser().then((response) => {
          // this.userList = response.data;
          // this.pageable.total = this.userList.length;
          // console.log('查询所有用户信息', response.data);
        });
        let s = {
          username: this.searchParam.username,
          email: this.searchParam.email,
        };
        // searchUser(s).then((response) => {
        //   console.log('模糊查询', response);
        //   this.userList = response.data;
        //   this.pageable.total = this.userList.length;
        // });
        this.userList = [];
        searchAllUserByWant(s).then((response) => {
          // console.log('高级模糊查询', response);
          this.userList = response.data;
          this.pageable.total = this.userList.length;
        });
      },

      /** 新增用户按钮操作 */
      handleAddUser() {
        this.AddUseropen = true;
        this.AddUserFrom = {};
        this.addDepartmentid = '';
      },

      //提交新增用户
      SubmitAddUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ElMessageBox.confirm('是否确定提交?', '系统提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(() => {
                //操作验证发送 是否注册
                // preinsertUser(this.AddUserFrom.email).then((response) => {
                //   console.log(response);
                //   if (response.code == 500) {
                //     ElMessage({
                //       showClose: true,
                //       message: '该账号已被注册',
                //       type: 'error',
                //     });
                //   } else {
                let adduser = {
                  age: this.AddUserFrom.age,
                  email: this.AddUserFrom.email,
                  phone: this.AddUserFrom.phone,
                  power: this.AddUserFrom.power,
                  sex: this.AddUserFrom.sex,
                  username: this.AddUserFrom.username,
                  password: this.AddUserFrom.password,
                  nickname: this.AddUserFrom.nickname,
                };
                // console.log('部门ID', this.addDepartmentid);
                insertUser(adduser, this.addDepartmentid).then((response) => {
                  // console.log('新增用户成功', response);
                  if (response.code == 500) {
                    ElMessage({
                      showClose: true,
                      message: '该账号已被注册',
                      type: 'error',
                    });
                  } else {
                    let id = response.data.id;
                    let username = response.data.username;
                    let email = response.data.email;
                    uploadFaceEmail({
                      base46Str: this.AddUserFrom.ADDfaceUrl,
                      id: id,
                      username: username,
                      email: email,
                    }).then((response) => {
                      this.searchUserAll();
                      ElMessage({
                        showClose: true,
                        message: '新增成功',
                        type: 'success',
                      });
                      this.AddUseropen = false;
                    });
                  }
                });
                //   }
                // });
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: '已取消',
                });
              });
            // powerinsertUser(this.user).then((response) => {
            //   console.log(response);
            //   ElMessage({
            //     showClose: true,
            //     message: '添加成功',
            //     type: 'success',
            //   });
            //   this.AddUseropen = false;

            //   insertUserDepartment(userid, this.Updatepartname).then((response) => {
            //     console.log(response);
            //   });
            // });

            // this.userList.push(this.AddUserFrom);
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
      cancelSubmitAddUser() {
        this.AddUseropen = false;
      },

      /** 修改按钮操作 */
      handleUpdateUser(title, row) {
        this.open = true;
        // console.log(title);
        // console.log('row', row);
        this.UpdateForm = row;
        this.UpdatefaceUrl = '';
        this.UpdatefaceUrl = this.URL + this.UpdateForm.faceUrl;

        //部门
        this.UpdateDepartmentname = row.partnames[0];
        this.UpdateDepartmentid = 0;
        this.UpdatefaceBase46 = '';
        // if (row.partnames[0] != null) {
        //   let part = row.partnames[0];
        //   console.log(part.split('_'));
        //   let parts = part.split('_');
        //   this.Updatepartname = parts[parts.length - 1];
        //   this.oldpartname = row.partnames;
        //   console.log('旧部门', this.oldpartname);
        // }
      },
      resetFace(row) {
        // let userid = this.UpdateForm.id;
        let userid = row.id;
        // console.log('重置用户id', userid);
        ElMessageBox.confirm('是否确定重置人脸信息?', '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            reSetFace(userid).then((response) => {
              this.searchUserAll();
              // console.log('重置成功', response);
              ElMessage({
                showClose: true,
                message: '重置成功',
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
      //提交修改用户
      UpdateSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ElMessageBox.confirm('是否确定修改?', '系统提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(() => {
                let userdata = {
                  user: this.UpdateForm,
                  departmentid: this.UpdateDepartmentid,
                  // base64Face: this.UpdatefaceUrl,
                  base64Face: this.UpdatefaceBase46,
                };
                // console.log('修改数据', userdata);
                updateUserByAdmin(userdata).then((response) => {
                  if (response.code == 500) {
                    // console.log('修改反馈', response);
                    ElMessage({
                      showClose: true,
                      message: '修改的邮箱已经注册',
                      type: 'warning',
                    });
                  } else {
                    this.searchUserAll();
                    // console.log('修改成功', response);
                    ElMessage({
                      showClose: true,
                      message: '修改成功',
                      type: 'success',
                    });

                    this.open = false;
                  }
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

        //先删除旧部门
        // for (let i = 0; i < this.oldpartname.length; i++) {
        //   deleteUserDepartment(userid, this.oldpartname[i]).then((response) => {
        //     console.log(response);
        //   });
        // }
        //再新增选择的部门

        // let department = '广东轻工职业技术学院_信息技术学院_软件202';
        // if (department != this.UpdateForm.partnames[0].split('_')) {
        // if (department != '') {
        //   console.log('不相等');
        //   insertUserDepartment(userid, this.Updatepartname).then((response) => {
        //     console.log(response);
        //   });
        // }

        // powerupdateUser(this.UpdateForm).then((response) => {
        //   console.log(response);
        //   ElMessage({
        //     showClose: true,
        //     message: '修改成功',
        //     type: 'success',
        //   });
        //   this.open = false;
        // });
      },
      //取消对话框
      cancelSubmitUpdateMeeting() {
        this.open = false;
      },
      // 取消按钮
      cancel() {
        this.open = false;
        // this.reset();
      },
      deleteAccount(row) {
        searchDeptAndUser().then((response) => {
          // console.log('查询部门用户' + partname, response);
        });
        let partname = '广东轻工职业技术';
        let data = {
          // id: 32
          // introduce: null,
          // parentid: null,
          // addr:'南海',
          // partname: '东软学院',
        };
        searchDeptAndUserByWant(data).then((response) => {
          // console.log('模糊查询部门用户', response);
        });

        // console.log('删除row', row);
        let userid = row.id;
        // console.log('删除id', userid);
        ElMessageBox.confirm('是否确定删除?', '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            deleteUserByAdmin(userid).then((response) => {
              this.searchUserAll();
              // console.log(response);
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

      //分页
      handleSizeChange: function (size) {
        this.pageable.pageSize = size;
      },
      handleCurrentChange: function (currentPage) {
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
