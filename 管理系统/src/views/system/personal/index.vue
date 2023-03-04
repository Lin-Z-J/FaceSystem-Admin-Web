<template>
  <div>
    <faceInput></faceInput>
  </div>

  <el-row :gutter="20">
    <el-col :span="24" :xs="24"> </el-col>

    <el-col :span="24" :xs="24">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
            <!-- <el-button class="button" text>Operation button</el-button> -->
          </div>
        </template>
        <div>
          <div class="text-center">
            <!-- <userAvatar  /> -->
            <userAvatar :user="user" />
            <el-row>
              <el-col :span="24"> 头像 </el-col>
            </el-row>
          </div>
          <el-divider></el-divider>

          <el-row>
            <el-form ref="userForm" :rules="rules" :model="user" label-width="80px">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="邮箱" prop="email">
                    <!-- <span>{{ user.email }}</span> -->

                    <el-input v-model="user.email" :disabled="true"> </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="用户名称" prop="username">
                    <el-input v-model="user.username" placeholder="请输入用户名称" maxlength="30" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="user.nickname" placeholder="请输入用户昵称" maxlength="30" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="user.phone" placeholder="请输入手机号" maxlength="30" />
                  </el-form-item>
                </el-col>
              </el-row>

              <!--              <el-row>
                <el-col :span="24">
                  <el-form-item label="所属角色" prop="roleGroup">
                    <el-input v-model="user.roleGroup" placeholder="管理员" maxlength="50"  />
                  </el-form-item>
                </el-col>
              </el-row> -->

              <el-row>
                <el-col :span="24">
                  <el-form-item label="用户性别">
                    <el-select v-model="user.sex" placeholder="男">
                      <el-option label="男" value="男"></el-option>
                      <el-option label="女" value="女"></el-option>
                    </el-select>
                  </el-form-item>
                  <!--                <el-form-item label="用户性别" prop="userName">
                    <el-input v-model="user.sex" placeholder="" maxlength="30" />
                  </el-form-item> -->
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="所属角色">
                    <!-- <el-input v-model="form.createTime" placeholder="2022-06-09 17:25:28" maxlength="50" /> -->
                    <span>{{ user.power }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="所属部门">
                    <!-- <el-input v-model="form.createTime" placeholder="2022-06-09 17:25:28" maxlength="50" /> -->
                    <span>
                      {{ p }}
                    </span>
                    <!-- <div v-for="item in user.partnames">{{ item }}</div> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <!--              <el-row>
                <el-col :span="24">
                  <el-form-item label="部门">
                    <span>{{ user.department }}</span>
                  </el-form-item>
                </el-col>
              </el-row> -->

              <el-form-item>
                <el-button type="primary" @click="submitUpdateUserProfile('userForm')"
                  >保存</el-button
                >
                <!-- <el-button>Cancel</el-button> -->
              </el-form-item>
            </el-form>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24" :xs="24">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>修改密码</span>
          </div>
        </template>
        <el-form ref="resetPwdForm" :model="resetPwdForm" label-width="80px">
          <el-form-item label="旧密码" prop="oldPassword" :rules="validateoldPassword">
            <el-input
              v-model="resetPwdForm.oldPassword"
              placeholder="请输入旧密码"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword" :rules="validatenewPassword">
            <el-input
              v-model="resetPwdForm.newPassword"
              placeholder="请输入新密码"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword" :rules="validateconfirmPassword">
            <el-input
              v-model="resetPwdForm.confirmPassword"
              placeholder="请确认密码"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetPwd('resetPwdForm')">保存</el-button>
            <!-- <el-button type="danger"  @click="close">关闭</el-button> -->
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import faceInput from './faceInput.vue';
  import { updatePassword, updateUser, searchOneUser } from '@/api/user';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import userAvatar from './userAvatar.vue';
  export default {
    data() {
      var validoldPassword = (rule, value, callback) => {
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
          if (this.registerForm.password !== '') {
            // this.$refs.dynamicValidateForm.validateField('password');
          }
          callback();
        }
      };

      var validnewPassword = (rule, value, callback) => {
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
          if (this.registerForm.password !== '') {
            // this.$refs.dynamicValidateForm.validateField('password');
          }
          callback();
        }
      };
      var validconfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetPwdForm.newPassword) {
          callback(new Error('确认密码与新密码输入不一致!'));
        } else {
          callback();
        }
      };
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
        // const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        // if (reg.test(value)) {
        //   callback();
        // } else {
        //   return callback(new Error('请输入正确的手机号'));
        // }
      };
      return {
        validateoldPassword: [
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

            validator: validoldPassword,
            trigger: ['blur', 'change'],
          },
        ],

        validatenewPassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            // type: 'password',

            // message: '请输入正确的密码',
            validator: validnewPassword,
            trigger: ['blur', 'change'],
          },
        ],
        validateconfirmPassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur',
          },
          {
            // type: 'password',
            //第1钟
            // pattern:/^0?1(3|4|5|7|8)\d{9}$/,
            // message: '请输入正确的密码',

            validator: validconfirmPassword,
            trigger: ['blur', 'change'],
          },
        ],
        p: '',
        user: {
          phone: '',
        },
        Updateuser: {
          nickname: '',
          phone: '',
          sex: '',
          username: '',
        },

        roleGroup: {},
        postGroup: {},
        activeTab: 'resetPwd',
        //
        resetPwdForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
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
        },
      };
    },
    components: {
      userAvatar,
      faceInput,
    },
    mounted() {
      let _this = this;
      // setInterval(function () {
      //   _this.getUser();
      // }, 1000);
      this.getUser();
    },
    methods: {
      getUser() {
        searchOneUser().then((response) => {
          const { data } = response;
          this.user = data[0];
          this.p = this.user.partnames[0];
        });
      },
      //修改用户信息
      submitUpdateUserProfile(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            (this.Updateuser.username = this.user.username),
              (this.Updateuser.nickname = this.user.nickname),
              (this.Updateuser.sex = this.user.sex),
              (this.Updateuser.phone = this.user.phone),
              ElMessageBox.confirm('是否修改个人信息?', '系统提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
              })
                .then(() => {
                  updateUser(this.Updateuser).then((response) => {
                    ElMessage({
                      showClose: true,
                      message: '保存成功',
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
      // 修改密码
      resetPwd(formName) {
        let PwdFormData = {
          oldpassword: this.resetPwdForm.oldPassword,
          newpassword: this.resetPwdForm.newPassword,
        };
        // console.log(this.resetPwdForm);
        // console.log(PwdFormData);

        this.$refs[formName].validate((valid) => {
          // console.log('this.registerForm', this.registerForm);
          // console.log(valid);
          if (valid) {
            ElMessageBox.confirm('是否提交修改密码?', '系统提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(() => {
                updatePassword(PwdFormData).then((response) => {
                  // console.log(response);
                  if (response.code == 500) {
                    ElMessage({
                      showClose: true,
                      message: '请检查您的旧密码',
                      type: 'error',
                    });
                  } else {
                    ElMessage({
                      showClose: true,
                      message: '修改成功,下次登录请使用新密码',
                      type: 'success',
                    });
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

        // this.$refs["resetPwdForm"].validate(valid => {
        //   if (valid) {
        //     updateUserPwd(this.user.oldPassword, this.user.newPassword).then(response => {
        //       this.$modal.msgSuccess("修改成功");
        //     });
        //   }
        // });
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
    /* width: 480px; */
    margin-bottom: 10px;
  }

  /*  */

  .text-center {
    text-align: center;
  }
</style>
