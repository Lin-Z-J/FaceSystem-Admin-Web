<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="我参与的" name="first"><first></first></el-tab-pane>
    <!-- <el-tab-pane label="我管理的" name="second"><second></second></el-tab-pane> -->
    <!-- <el-tab-pane label="审批状态" name="third">审批状态</el-tab-pane> -->
    <!-- <el-tab-pane label="审批状态" name="fourth">Task</el-tab-pane> -->
  </el-tabs>
</template>
<script>
  import first from '../Mymeeting/first.vue';
  // import second from '../Mymeeting/second.vue'
  export default {
    data() {
      return {
        activeName: 'third',
      };
    },
    components: {
      first,
      // second
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab.props.name)
        // console.log("当前activeName=", this.activeName)
        // console.log("当前name=",tab.props.name)
        sessionStorage.setItem('current_name', tab.props.name);
      },
    },
    created() {
      // console.log("获取缓存前，activeName=", this.activeName)
      if (sessionStorage.getItem('current_name') == null) {
        this.activeName = 'first';
      } else {
        this.activeName = sessionStorage.getItem('current_name');
      }
      // console.log("获取缓存后，activeName=", this.activeName)
    },
  };
</script>
