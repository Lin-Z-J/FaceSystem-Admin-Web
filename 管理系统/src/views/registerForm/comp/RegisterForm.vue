<template>
  <el-form :model="registerForm" ref="registerForm" class="register-ruleForm">
    <!-- 用户名 -->
    <el-form-item prop="username" :rules="validateUsername">
      <el-input placeholder="请输入用户名" v-model.trim="registerForm.username">
        <template #prefix>
          <icon-user theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <!-- 归属部门 -->
    <el-form-item label="归属部门" prop="partname" :rules="validatePartname">
      <el-tree-select
        style="width: 100%"
        v-model="registerForm.partname"
        :data="departmentsData"
        default-expand-all
        @node-click="handleNodeClick"
        @check="currentChecked"
      />
    </el-form-item>
    <!--    <el-form-item prop="username" :rules="validateUsername">
      <el-input placeholder="归属部门" v-model.trim="registerForm.username">
        <template #prefix>
          <icon-user theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
      <el-tree-select
        v-model="partname"
        :data="departmentsData"
        default-expand-all
        @node-click="handleNodeClick"
        @check="currentChecked"
      />
    </el-form-item> -->
    <el-form-item prop="email" :rules="validateEmail">
      <el-input placeholder="邮箱" v-model="registerForm.email">
        <template #prefix>
          <icon-mail theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="form-code">
        <!-- //验证码 -->
        <el-form-item prop="smsCode" :rules="validateSmsCode">
          <el-input :placeholder="t('register.smsCode')" v-model="registerForm.smsCode">
            <template #prefix>
              <icon-message-privacy theme="outline" size="16" fill="#999" />
            </template>
          </el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="code-btn"
          @click="preinsertUserBtn()"
          :disabled="isDisabled"
          >{{ buttonName }}
        </el-button>
      </div>
    </el-form-item>
    <el-form-item prop="password" :rules="validatePassword">
      <el-input
        :placeholder="t('register.password')"
        type="password"
        v-model="registerForm.password"
        show-password
      >
        <template #prefix>
          <icon-lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="checkedPwd" :rules="validatecheckPassword">
      <el-input
        :placeholder="t('register.confirmPwd')"
        type="password"
        v-model="registerForm.checkedPwd"
        show-password
      >
        <template #prefix>
          <icon-lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="register-check">
        <el-form-item prop="checkText" :rules="validatecheckText">
          <el-checkbox v-model="registerForm.checkText">{{ t('register.checkText') }}</el-checkbox>
        </el-form-item>
        <el-button text type="primary" @click="loginForm()">{{ t('login.loginBtn') }}</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <!--      <el-button type="primary" class="register-btn" @click="submitRegister('registerForm')" round>
        {{ t('register.registerBtn') }}</el-button
      > -->
      <el-button type="primary" class="register-btn" @click="submitRegister('registerForm')" round
        >下一步</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { preinsertUser, register } from '@/api/user.js';
  import {
    insertUserDepartment,
    deleteUserDepartment,
    searchDeptAndUserByWant,
    searchDeptAndUser,
  } from '@/api/department.js';
  export default {
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
      var validPassword2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validSmsCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        }
        // else if (value !== this.Code) {
        //   callback(new Error('验证码错误!'));
        // }
        else {
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
      // 检验复选框
      var checkValidator = (rule, value, callback) => {
        // rule规则对象
        // value关联表单值
        // callback() 回传结果
        if (value === false) {
          callback(new Error('请勾选协议'));
        } else {
          callback();
        }
      };
      return {
        //部门
        //新增部门的名字
        addDepartmentname: '',
        addDepartmentid: '',
        departmentsData: [],

        CountDown: 60, //倒计时
        buttonName: '发送验证码', //按钮初始化文字
        isDisabled: false, //是否禁用按钮
        //后台验证码
        Code: '',

        registerForm: {
          //部门
          partname: '',
          username: '',
          email: '',
          //前台验证码
          smsCode: '',
          password: '',
          checkedPwd: '',
          checkText: false,
        },
        validateUsername: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
          {
            // type: 'email',
            // message: '请输入正确的用户名',
            validator: validUsername,
            trigger: ['blur', 'change'],
          },
        ],
        validateEmail: [
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
        validatePassword: [
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
        validatecheckPassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            // type: 'password',

            // message: '请输入正确的密码',
            validator: validPassword2,
            trigger: ['blur', 'change'],
          },
        ],
        validateSmsCode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
          {
            // type: 'password',

            // message: '请输入正确的密码',
            validator: validSmsCode,
            trigger: ['blur', 'change'],
          },
        ],
        validatePartname: [
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
        validatecheckText: [{ validator: checkValidator }],
      };
    },
    // created() {
    //   //从sessionStorage中读取倒计时相关信息
    //   if (sessionStorage.getItem('CountDownInfo')) {
    //     this.CountDown = JSON.parse(sessionStorage.getItem('CountDownInfo')).CountDown;
    //     this.isDisabled = JSON.parse(sessionStorage.getItem('CountDownInfo')).isDisabled;
    //   }
    //   //进入该页面时，若倒计时还在进行，则继续跑倒计时
    //   if (this.isDisabled) {
    //     let timerId = setInterval(() => {
    //       this.CountDown--;
    //       this.buttonName = this.CountDown + '秒后重试';
    //       if (this.CountDown <= 0) {
    //         clearInterval(timerId);
    //         this.buttonName = '重新发送';
    //         this.CountDown = 60;
    //         this.isDisabled = false;
    //       }
    //     }, 1000);
    //   }
    //   //在页面刷新时将vuex里的信息保存到localStorage里
    //   window.addEventListener('beforeunload', () => {
    //     sessionStorage.setItem(
    //       'CountDownInfo',
    //       JSON.stringify({
    //         CountDown: this.CountDown,
    //         isDisabled: this.isDisabled,
    //       })
    //     );
    //   });
    // },
    // //beforeRouteLeave为当前路由改变前触发事件，路由跳转时，保存倒计时相关信息
    // beforeRouteLeave(to, from, next) {
    //   /*
    //       to:router 即将要进入的路由对象
    //       from:router  当前导航正要离开的路由
    //       next()进行管道中的下一个钩子
    //       最后要确保调用next方法，否则钩子不会被resolved
    //     */
    //   sessionStorage.setItem(
    //     'CountDownInfo',
    //     JSON.stringify({
    //       CountDown: this.CountDown,
    //       isDisabled: this.isDisabled,
    //     })
    //   );
    //   next();
    // },
    mounted() {
      this.searchDepartmentAll();
    },
    methods: {
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
      currentChecked() {},
      handleNodeClick(node) {
        // console.log('data', data);
        // console.log('node', node.value);
        // console.log('partname', this.registerForm.partname);
        // this.registerForm.partname = node.value;

        // console.log('node.value', node.value);
        // console.log('node.label', node.label);
        // console.log('partname', this.partname);
        this.addDepartmentname = node.label;
        this.addDepartmentid = node.value;
      },

      async preinsertUserBtn() {
        this.isDisabled = true;
        let timerId = setInterval(() => {
          this.CountDown--;
          this.buttonName = this.CountDown + '秒后重试';
          if (this.CountDown <= 0) {
            clearInterval(timerId);
            this.buttonName = '重新发送';
            this.CountDown = 60;
            this.isDisabled = false;
          }
        }, 1000);

        //操作验证发送
        await preinsertUser(this.registerForm.email)
          .then((response) => {
            // console.log(response);
            if (response.code == 500) {
              // console.log(response.message);
              ElMessage({
                showClose: true,
                message: '该账号已被注册',
                type: 'error',
              });
              clearInterval(timerId);
              this.buttonName = '重新发送';
              this.CountDown = 60;
              this.isDisabled = false;
            } else {
              this.Code = response.data;
              ElMessage({
                showClose: true,
                message: '验证码发送成功',
                type: 'success',
              });
            }
          })
          .catch(() => {
            ElMessage({
              showClose: true,
              message: '验证码发送失败，请重试！',
              type: 'success',
            });
            clearInterval(timerId);
            this.buttonName = '重新发送';
            this.CountDown = 60;
            this.isDisabled = false;
          });
      },
      //注册提交
      submitRegister(formName) {
        // console.log('partname', this.partname);
        // let user = {
        //   username: '',
        //   email: '',
        //   password: '',
        //   partname: this.partname,
        // };

        // this.$emit('RegisterChanged', user); //自定义事件  传递值“子向父组件传值”

        // this.$emit('RegisterChanged', 2); //自定义事件  传递值“子向父组件传值”
        // console.log(user);

        //       let user = {
        //         username: this.registerForm.username,
        //         email: this.registerForm.email,
        //         password: this.registerForm.password,
        //       };
        //       console.log(user);
        // register(user).then((response) => {
        //   console.log(response);
        //   ElMessage({
        //     showClose: true,
        //     message: '注册成功',
        //     type: 'success',
        //   });
        // });

        this.$refs[formName].validate((valid) => {
          // console.log('this.registerForm', this.registerForm);
          // console.log(valid);
          if (valid) {
            if (this.Code == this.registerForm.smsCode) {
              let user = {
                username: this.registerForm.username,
                email: this.registerForm.email,
                password: this.registerForm.password,
                // departmentid: this.registerForm.partname,
                departmentid: this.addDepartmentid,
              };
              // console.log(user);
              this.$emit('RegisterChanged', user);
            } else {
              ElMessage({
                showClose: true,
                message: '验证码错误，请重试！',
                type: 'success',
              });
            }
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
    },

    setup() {
      const router = useRouter();

      function loginForm() {
        router.push('/login');
      }
      const { t } = useI18n();
      const state = reactive({
        form: {
          name: '',
          password: '',
        },
        checkedPwd: false,
      });
      return {
        ...toRefs(state),
        t,
        loginForm,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .register-ruleForm {
    margin-top: 1rem;

    :deep(.el-input__prefix) {
      top: 2px;
      padding: 0 4px;
    }

    .register-methods {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .register-btn {
      width: 100%;
      margin-bottom: 1rem;
    }

    // .register-check {
    //   display: flex;
    //   align-content: center;
    //   justify-content: space-between;
    // }
    .register-check {
      width: 100%;
      display: flex;
      align-content: center;
      justify-content: space-between;
    }

    .form-code {
      display: flex;
      align-content: center;
      justify-content: space-between;

      .code-btn {
        margin-left: 1rem;
      }
    }
  }
</style>
