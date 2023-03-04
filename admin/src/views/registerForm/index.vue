<template>
  <div class="login-wrapper">
    <el-header class="header">
      <!-- <Logo class="logo" /> -->
      <div class="logo"></div>
      <LangChange class="lang" color="#fff" />
    </el-header>
    <div class="login-container">
      <!--      <div class="login-left hidden-sm-and-down">
        <div class="login-left-wrap">
          <img class="img" src="@/assets/login.png" alt="login-bg" />
          <h2 class="desc">{{ t('login.desc') }}</h2>
          <p class="tip">{{ t('login.tip') }}</p>
        </div>
      </div> -->
      <div class="login-form" :class="{ 'is-mobile': isMobile }">
        <div class="form-warp">
          <h3 class="title">人脸识别会议签到系统</h3>
          <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
            <el-step title="填写注册信息" />
            <el-step title="上传人脸信息" />
            <el-step title="注册完成" />
          </el-steps>
          <!-- //这是我的组件，先根据条件隐藏起来，当条件符合就显示出来 -->
          <RegisterForm v-show="active == 1" @RegisterChanged="updateRegister" />

          <div v-show="active == 2" style="margin: 50px">
            <el-row>
              <el-col
                :span="10"
                style="
                  margin: auto;
                  display: -webkit-box;
                  display: -webkit-flex;
                  display: -ms-flexbox;
                  display: flex;
                  -webkit-box-pack: center;
                  -ms-flex-pack: center;
                  -webkit-justify-content: center;
                  justify-content: center;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
                  -webkit-align-items: center;
                  align-items: center;
                  height: 100%;
                "
              >
                <!-- <Face v-on:titleChanged="updateTitle"></Face> -->
                <Face
                  v-show="active == 2"
                  @FaceChanged="updateFace"
                  :active="active"
                  ref="myFace"
                ></Face>
              </el-col>
            </el-row>
          </div>

          <div v-show="active == 3">
            <el-row>
              <el-col>
                <el-result icon="success" title="恭喜你! 注册完成" :sub-title="title">
                  <template #extra>
                    <el-button type="primary" @click="Backlogin">立即返回登录</el-button>
                  </template>
                </el-result>
              </el-col>
            </el-row>
          </div>
          <!-- <el-button @click="prev">上一步</el-button>
          <el-button style="margin-top: 12px" @click="next">下一步</el-button> -->
        </div>
      </div>
      <!--  底部  -->
      <div class="el-login-footer">
        <span>Copyright © 2022 Meeting.</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import RegisterForm from './comp/RegisterForm.vue';
  import Face from './comp/Face.vue';
  // import LangChange from '@/components/LangChange/index.vue';
  import { useI18n } from 'vue-i18n';
  import { preinsertUser, register, uploadFaceEmail } from '@/api/user.js';
  import { insertUserDepartment } from '@/api/department.js';
  export default {
    data() {
      return {
        active: 1,
        // 倒计时
        count: '',
        timer: null,
        title: '5s 后跳转登录界面',
        user: {},
        uploadFaceEmail: {},
      };
    },
    components: {
      RegisterForm,
      // LangChange,
      Face,
    },
    mounted() {},
    methods: {
      Backlogin() {
        clearInterval(this.timer); //删除定时器
        this.$router.push('/login');
      },
      countDown() {
        const TIME_COUNT = 5;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (this.count > 1 && this.count <= TIME_COUNT) {
              //限制倒计时区间
              this.count--;

              this.title = +this.count + 's 后跳转登录界面';
              // console.log(this.count);
            } else {
              clearInterval(this.timer); //删除定时器
              this.timer = null;
              //跳转的页面写在此处
              this.$router.push('/login');
            }
          }, 1000);
        }
      },
      //下一步
      updateRegister(e) {
        // console.log('注册表单的数据', e);
        this.user = e;
        //声明这个函数
        this.active = 2;
        this.$refs.myFace.OpenCompetence('打开摄像头');
      },
      //上传人脸
      updateFace(e) {
        // this.active = 3;
        // //触发倒计时
        // this.countDown();
        // let userid = 70;
        // let department = '广东轻工职业技术学院_信息技术学院_软件204';
        // insertUserDepartment(userid, department).then((response) => {});

        // console.log('修改人脸的值', e);
        let imgSrc = e;

        let userData = {
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
        };
        let departmentid = this.user.departmentid;
        //
        // console.log('部门id departmentid', departmentid);
        register(userData, departmentid).then((response) => {
          // console.log(response);
          let id = response.data.id;
          let username = response.data.username;
          let email = response.data.email;
          // console.log('id', id);
          // console.log(username);
          // console.log(imgSrc);
          // this.uploadFaceEmail = response.data;
          //注册部门
          // let userid = response.data.id;
          // let department = this.user.partname;
          // insertUserDepartment(userid, department).then((response) => {});

          uploadFaceEmail({
            base46Str: imgSrc,
            id: id,
            username: username,
            email: email,
          }).then((response) => {
            this.active = 3;
            //触发倒计时
            this.countDown();
            ElMessage({
              showClose: true,
              message: '注册成功',
              type: 'success',
            });
          });
        });
        //
      },

      //上一步
      prev() {
        this.active--;
      },
      next() {
        this.active++;
      },
    },
    setup() {
      const store = useStore();
      const { t } = useI18n();
      // const activeName = ref('first');
      const isMobile = computed(() => {
        return store.getters['setting/isMobile'];
      });
      return {
        // activeName,
        isMobile,
      };
    },
  };
</script>
<style lang="scss" scoped>
  .title {
    margin: 20px;
    text-align: center;
    color: #707070;
  }

  .login-wrapper {
    position: relative;

    .header {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      color: #fff;
      background: transparent;

      .logo {
        justify-content: start;

        :deep(.logo-title) {
          color: #fff !important;
        }
      }

      .lang:hover {
        background: transparent;
      }
    }

    .login-container {
      // display: flex;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background-color: $dark-bg-color;
      background-image: url('../../assets/bj.jpg');
      background-size: cover;

      .login-left {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 50vw;
        height: 100%;
        background-image: url('@/assets/login-bg-dark.svg');
        background-repeat: no-repeat;
        background-position: 100%;
        background-size: auto 100%;

        &-wrap {
          height: 80vh;
          margin: auto;

          .img {
            width: 280px;
            margin-top: 10vh;
          }

          .title,
          .desc {
            max-width: 500px;
            font-weight: bold;
            color: #fff;
            letter-spacing: 1.2px;
          }

          .desc {
            font-size: 28px;
          }

          .tip {
            color: #fff;
          }
        }
      }

      .login-form {
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // width: 50vw;
        // height: 100vh;

        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 100%;

        .form-warp {
          width: 400px;
          padding: 1rem 3rem 0 3rem;
          margin: auto;
          background-color: #fff;
          border-radius: 8px;
        }

        &.is-mobile {
          width: 100%;

          .form-warp {
            width: 100%;
            margin: 0 15px;
          }
        }
      }
    }
  }

  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }
</style>

<style scoped lang="scss">
  .text-center {
    text-align: center;
  }

  .user-info-head {
    position: relative;
    display: inline-block;
    height: 120px;
    // background: url('../../../../assets/images/404.png');
  }

  // .user-info-head:hover:after {
  //   content: '更换人脸';
  //   position: absolute;
  //   left: 0;
  //   right: 0;
  //   top: 0;
  //   bottom: 0;
  //   color: #eee;
  //   background: rgba(0, 0, 0, 0.5);
  //   font-size: 24px;
  //   font-style: normal;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  //   cursor: pointer;
  //   line-height: 110px;
  //   border-radius: 50%;
  // }

  .avatar-upload-preview {
    position: absolute;
    top: 50%;
    -webkit-transform: translate(50%, -50%);
    transform: translate(50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 4px #ccc;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;
  }

  .img-lg {
    width: 120px;
    height: 120px;
  }

  .img-circle {
    border-radius: 50%;
  }
</style>
