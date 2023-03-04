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
          <LoginForm />
          <!--          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="t('login.title')" name="first">
              <LoginForm />
            </el-tab-pane>
            <el-tab-pane :label="t('register.title')" name="second">
              <RegisterForm />
            </el-tab-pane>
          </el-tabs> -->
        </div>
      </div>
      <!--  底部  -->
      <div class="el-login-footer">
        <span>Copyright © 2022 Meeting.</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import LoginForm from 'views/login/comp/LoginForm.vue';
  import LangChange from '@/components/LangChange/index.vue';
  import { useI18n } from 'vue-i18n';

  const store = useStore();
  const { t } = useI18n();
  const activeName = ref('first');
  const isMobile = computed(() => {
    return store.getters['setting/isMobile'];
  });

  const handleClick = (val) => {
    // console.log(val);
  };

  //
  const router = useRouter();
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
      // background-image: url('@/assets/login-background.jpg');
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
