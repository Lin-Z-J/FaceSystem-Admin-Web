<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown" :style="{ color }">
      <!--<el-avatar class="user-avatar" :src="avatar"></el-avatar>-->
      <!-- <img class="user-avatar" src="../../../assets/avatar.jpg" alt="" /> -->
      <img class="user-avatar" :src="avatar" alt="" />
      <div class="user-name">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout" divided>{{ t('navbar.logOut') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
  export default {
    name: 'Avatar',
  };
</script>

<script setup>
  // import store from "@/store";
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { ElMessageBox } from 'element-plus';
  import { setting } from '@/config/setting';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  const { title, recordRoute } = setting;
  const { t } = useI18n();
  const store = useStore();

  // const avatar = ref('https://i.gtimg.cn/club/item/face/img/2/15922_100.gif');
  // const avatar = ref("../../../assets/avatar.jpg");
  const avatar = store.getters.avatar;
  // const username = ref('admin');
  const username = store.getters.username;

  const router = useRouter();

  defineProps({
    color: {
      type: String,
      default: '#666',
    },
  });

  const handleCommand = (command) => {
    switch (command) {
      case 'logout':
        handleLogout();
        break;
      case '个人中心':
        // window.open('https://github.com/hu-snail/vue3-admin-element-template', '_self');
        router.push('/personal');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    ElMessageBox.confirm(`${t('confirm.msg')}${title}？`, t('confirm.title'), {
      confirmButtonText: t('btn.confirm'),
      cancelButtonText: t('btn.cancel'),
      dangerouslyUseHTMLString: true,
      type: 'warning',
    })
      .then(async () => {
        await store.dispatch('user/logout');
        if (recordRoute) {
          const { fullPath } = router.currentRoute._value;
          // console.log(fullPath);
          //退出记住路由
          router.push({ path: `/login?redirect=${fullPath}` });
          router.go(0);
        } else {
          router.push('/login');
          router.go(0);
        }
      })
      .catch(() => {});
  };
</script>

<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: $base-avatar-dropdown-height;
    padding: $base-padding-10;
    .user-avatar {
      width: $base-avatar-widht;
      height: $base-avatar-height;
      cursor: pointer;
      border-radius: $base-border-radius-circle;
    }

    .user-name {
      position: relative;
      margin-left: $base-margin-5;
      margin-left: $base-margin-5;
      cursor: pointer;
    }
  }
</style>
