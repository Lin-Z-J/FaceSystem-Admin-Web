<template>
  <el-card class="box-card" style="box-shadow:none;">
    <template #header>
      <div class="card-header">
        <span>会议详情</span>
      </div>
    </template>
    <el-form ref="form" :model="Meetingdata" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="会议室">
            <el-select v-model="Meetingdata.room" placeholder="请选择会议室">
              <el-option label="新会议室-001" value="新会议室-001"></el-option>
              <el-option label="新会议室-002" value="新会议室-002"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="会议主题">
            <el-input v-model="Meetingdata.theme" placeholder="请输入会议主题" maxlength="30" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="会议时间" required>
        <el-col :span="5">
          <el-form-item>
            <el-date-picker v-model="Meetingdata.startdate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="date"
              :disabled-date="disabledDateFun" placeholder="日期" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-time-select v-model="Meetingdata.startTime" :max-time="Meetingdata.endTime" class="mr-4"
              placeholder="起始时间" start="08:30" step="00:15" end="18:30" />
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">-</el-col>

        <!--        <el-col :span="5">
          <el-form-item >
            <el-date-picker v-model="Meetingdata.endTdate" type="date" placeholder="结束日期" />
          </el-form-item>
        </el-col> -->
        <el-col :span="5">
          <el-form-item>
            <el-time-select v-model="Meetingdata.endTime" :min-time="Meetingdata.startTime" placeholder="结束时间"
              start="08:30" step="00:15" end="18:30" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="预订人">
            <el-input v-model="Meetingdata.applicant" placeholder="请输入用户昵称" maxlength="30" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="会议内容">
            <el-input type="textarea" v-model="Meetingdata.content"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitUpdateMeeting()">确定修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>
<script>
  import {
    UpdateMeeting
  } from "@/api/meeting";

  export default {
    data() {
      return {
        MeetingId: '',
        Meetingdata: {
          MeetingId: 1,
          room: '',
          theme: '',
          data: '',
          startdate: '',
          endTdate: '',
          startTime: '',
          endTime: '',

          applicant: '',
          content: ''

        },
        //会议用户列表
        meetingUserList: [],
        //用户列表 
        userList: [{
            username: '林照杰',
            sex: 1,
            email: '19162699379@qq.com',
          },
          {
            username: '林照杰',
            sex: 1,
            email: '19162699379@qq.com',
          },
        ],

      }
    },
    mounted() {
      // this.createMeeting()
      this.getCurrentTime();
    },
    methods: {
      /** 查询会议 */
      // getMyMeeting() {
      //   // this.loading = true;
      //   console.log(this.$route.query.id)
      //   const MeetingId = this.$route.query.id || this.MeetingId;
      //   getMyMeetingById(MeetingId).then(response => {
      //     this.MeetingList = response.data;
      //   });
      // },
      //修改会议
      submitUpdateMeeting() {
        console.log(this.$route.query.id)
        const MeetingId = this.$route.query.id || this.MeetingId;
        UpdateMeeting(this.Meetingdata).then(response => {

          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
          })
        })
      },
      //获取当前时间
      getCurrentTime() {
        let currentTime = new Date(),
          year = currentTime.getFullYear(),
          month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() +
          1,
          day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
        this.Meetingdata.startdate = year + "-" + month + "-" + day;
      },
      //限制只能选择今天之后
      disabledDateFun(time) {
        // 默认只能选择今天以及今天之后的日期
        return time.getTime() < new Date().getTime() - 1 * 8.64e7; //8.64e7就是一天的时间戳 24*60*60*1000 
      },
    }
  }
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
    margin: 0;
    padding: 0;
  }

  .el-card {
    box-shadow: none;
  }
</style>
