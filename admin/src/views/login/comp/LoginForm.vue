<template>
  <el-form :model="ruleForm" :rules="rules" ref="validateForm" class="login-ruleForm">
    <el-form-item prop="email">
      <el-input placeholder="邮箱" v-model="ruleForm.email">
        <template #prefix>
          <icon-user theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input @keyup.enter="handleLogin" :placeholder="t('login.password')" type="password" show-password
        v-model="ruleForm.password">
        <template #prefix>
          <icon-lock theme="outline" size="16" fill="#999" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="login-check">
        <el-checkbox v-model="checkedPwd">{{ t('login.rememberPwd') }}</el-checkbox>
        <!-- <el-button text type="primary">{{ t('login.forgotPwd') }}</el-button> -->
        <el-button text type="primary" @click="RegisterForm()">{{
          t('login.registerBtn')
        }}</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" class="login-btn" round @click="handleLogin">{{
        t('login.loginBtn')
      }}</el-button>
    </el-form-item>
    <!--    <el-divider>{{ t('login.thirdparty') }}</el-divider>
    <el-form-item>
      <div class="login-methods">
        <icon-wechat theme="outline" size="24" fill="#333" />
        <icon-alipay theme="outline" size="24" fill="#333" />
        <icon-github theme="outline" size="24" fill="#333" />
        <icon-twitter theme="outline" size="24" fill="#333" />
        <icon-google theme="outline" size="24" fill="#333" />
      </div>
    </el-form-item> -->
  </el-form>
</template>

<script>
  import {
    reactive,
    toRefs,
    ref,
    unref,
    watch
  } from 'vue';
  import {
    useStore
  } from 'vuex';
  import {
    useRouter
  } from 'vue-router';
  import {
    useI18n
  } from 'vue-i18n';
  export default {
    // data() {
    //   return {}
    // },
    // methods: {
    //   // 设置cookie
    //   setCookie(c_name, c_pwd, c_state, exdays) {
    //     const exdate = new Date()
    //     exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
    //     window.document.cookie = 'username' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString()
    //     window.document.cookie = 'password' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString()
    //     window.document.cookie = 'state' + '=' + c_state + ';path=/;expires=' + exdate.toGMTString()
    //   },
    //   // 读取cookie
    //   getCookie() {
    //     if (document.cookie.length > 0) {
    //       const arr = document.cookie.split('; ')
    //       for (let i = 0; i < arr.length; i++) {
    //         const arr2 = arr[i].split('=')
    //         console.log(arr[2])
    //         if (arr2[0] === 'username') {
    //           this.username = arr2[1]
    //         } else if (arr2[0] === 'password') {
    //           this.password = arr2[1]
    //         } else if (arr2[0] === 'state') {
    //           this.checked = Boolean(arr2[1])
    //         }
    //       }
    //     }
    //   },
    //   // 清除cookie
    //   clearCookie: function() {
    //     this.setCookie('', '', false, -1)
    //   }
    // },
    // mounted() {
    //   this.getCookie()
    // },
    setup() {
      const {
        t
      } = useI18n();
      const store = useStore();
      const router = useRouter();
      const validateForm = ref(null);
      const state = reactive({
        ruleForm: {
          // email: '2608301182@qq.com',
          // password: 'rjb17',
          email: '',
          password: '',
        },
        loading: false,
        checkedPwd: false,
        redirect: undefined,
        rules: {
          email: [{
            required: true,
            message: t('login.rules.username'),
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: t('login.rules.password'),
            trigger: 'blur'
          }],
        },
      });

      watch(
        () => router.currentRoute,
        ({
          _value
        }) => {
          const route = _value;
          state.redirect = (route.query && route.query.redirect) || '/personal';
        }, {
          immediate: true,
        }
      );
      onMounted(() => {
        // console.log("onMounted");
        getCookie()
      })

      function RegisterForm() {
        router.push('/register');
      }
      // 
      // 设置cookie
      function setCookie(c_name, c_pwd, c_state, exdays) {
        const exdate = new Date()
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
        window.document.cookie = 'email' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString()
        window.document.cookie = 'password' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString()
        window.document.cookie = 'state' + '=' + c_state + ';path=/;expires=' + exdate.toGMTString()
      }
      // 读取cookie
      function getCookie() {
        if (document.cookie.length > 0) {
          const arr = document.cookie.split('; ')
          for (let i = 0; i < arr.length; i++) {
            const arr2 = arr[i].split('=')
            console.log(arr[2])
            if (arr2[0] === 'email') {
              state.ruleForm.email = arr2[1]
            } else if (arr2[0] === 'password') {
              state.ruleForm.password = arr2[1]
            } else if (arr2[0] === 'state') {
              state.checkedPwd = Boolean(arr2[1])
            }
          }
        }
      }
      // 清除cookie
      function clearCookie() {
        setCookie('', '', false, -1)
      }

      const handleLogin = async () => {
        const form = unref(validateForm);
        if (!form) return;
        //
        // 判断复选框是否被勾选 勾选则调用配置cookie方法
        if (state.checkedPwd === true) {
          setCookie(state.ruleForm.email, state.ruleForm.password, true, 7)
        } else {
          clearCookie()
        }
        await form.validate((valid) => {
          if (valid) {
            state.valid = true;
            state.loading = true;
            store
              .dispatch('user/login', state.ruleForm)
              .then(() => {
                const routerPath =
                  state.redirect === '/404' || state.redirect === '/401' ?
                  '/personal' :
                  state.redirect;
                // console.log(routerPath);
                router.push(routerPath).catch(() => {});
                state.loading = false;
              })
              .catch(() => {
                state.loading = false;
                ElMessage({
                  showClose: true,
                  message: '邮箱或密码有误，请重新输入!',
                  type: 'error',
                });
              });
          }
        });
      };
      return {
        ...toRefs(state),
        validateForm,
        handleLogin,
        t,
        RegisterForm,
      };
    },
  };
</script>
<style lang="scss" scoped>
  .login-ruleForm {
    margin-top: 1rem;

    :deep(.el-input__prefix) {
      top: 2px;
      padding: 0 4px;
    }

    .login-methods {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .login-btn {
      width: 100%;
    }

    .login-check {
      width: 100%;
      display: flex;
      align-content: center;
      justify-content: space-between;
    }
  }
</style>
