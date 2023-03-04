<template>
  <!--   <el-card class="box-card">
       <template #header>
      <div class="card-header" style="background-color: antiquewhite;">
        <span>会议签到详情</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <el-row>
      <el-col :span="24">
        <div style="height: 50px; background-color: antiquewhite;"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content ep-bg-purple" />34
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content ep-bg-purple" />34
      </el-col>
    </el-row>
  </el-card> -->

  <!-- 
  <div class="header-box " style="background-color: aqua;">
    <div class="justify-content-between"><span>123</span></div>
  </div>
  <div class="content-box" style="background-color: seagreen;">
    <el-row :gutter="20">
      <el-col :span="10">
        <div style="background-color: blue;" />
      </el-col>
      <el-col :span="10">
        <div style="background-color: navajowhite;" />
      </el-col>
    </el-row>
  </div>
  <div class="footer-box" style="background-color: saddlebrown;">
    <el-button type="primary" :icon="Search" @click="search">结束会议</el-button>
    <el-button type="primary" :icon="Search" @click="search">结束会议</el-button>
  </div> -->
  <!-- 会议盒子 -->
  <el-row>
    <el-col :span="24">
      <el-card :body-style="{ padding: '0px' }">
        <el-row>
          <el-col :span="24">
            <div class="meeting-list" style="color: rgb(102, 102, 102)">
              <!--              <img
                class="meeting-pc"
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                alt=""
              /> -->
              <div class="item">
                <div style="padding: 14px">
                  <!-- <span>林照杰的会议</span> -->
                  <span>{{ meeting.name }}</span>
                  <div class="bottom">
                    <time class="time">会议时间：{{ meeting.meetingTime }}</time>
                    <!-- <time class="time">会议时间：2022-6-10 12:00-13:00 {{ currentDate }}</time> -->
                    <!-- <el-button text class="button">进行中</el-button> -->
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>

  <!-- 统计 -->
  <el-row>
    <el-col :span="8">
      <div class="layui-col-xs6">
        <div class="panel layui-bg-number">
          <div class="panel-body">
            <div class="panel-title">
              <!-- <span class="label pull-right layui-bg-blue"></span> -->
              <!-- <h5>签到统计</h5> -->
            </div>
            <div class="panel-content">
              <h1 class="no-margins">{{ OKNumber + NONumber }}</h1>
              <small>参与人数</small>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="layui-col-xs6">
        <div class="panel layui-bg-number">
          <div class="panel-body">
            <div class="panel-title">
              <span class="label pull-right layui-bg-blue">实时</span>
              <!-- <h5>签到统计</h5> -->
            </div>
            <div class="panel-content">
              <h1 class="no-margins" style="color: green">{{ OKNumber }}</h1>
              <small>已签到</small>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="layui-col-xs6">
        <div class="panel layui-bg-number">
          <div class="panel-body">
            <div class="panel-title">
              <span class="label pull-right layui-bg-blue">实时</span>
              <!-- <h5>签到统计</h5> -->
            </div>
            <div class="panel-content">
              <h1 class="no-margins" style="color: red">{{ NONumber }}</h1>
              <small>未签到</small>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24">
      <!-- width: 500px -->
      <div id="customerChart" style="height: 220px"> </div>
      <!--      <Echarts
        ref="chart"
        :index="2"
        :title="EchartsTitle"
        headerIcon="icon-chart-histogram"
        :style="{
          height: '300px',
        }"
        :options="options"
      /> -->
    </el-col>
  </el-row>
  <!--视图 -->

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>会议签到详情</span>
        <!-- <span>当前会议室：新会议室-001</span> -->
        <!-- <el-button class="button" text>14:32</el-button> -->
      </div>
    </template>

    <el-row style="height: " :gutter="10">
      <el-col :span="24" style="background-color: ">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <!-- <span style="margin: auto;">已完成签到：12</span> -->
          <el-tab-pane :label="OKlabel" name="first">
            <el-row>
              <el-col :span="18">
                <el-form :model="searchOKForm" status-icon class="demo-ruleForm">
                  <el-form-item prop="">
                    <el-input
                      v-model="searchOKForm.username"
                      placeholder="请输入名字查询"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="searchOKFormSubmit()">
                  <icon-search></icon-search>搜索
                </el-button>
              </el-col>
            </el-row>
            <el-table height="500" :data="OKdata" border style="width: 100%">
              <el-table-column prop="username" label="" show-overflow-tooltip width="">
                <template #default="scope">
                  <div class="dataBody_td dataBody_group" style="box-sizing: content-box">
                    <div class="dataBody_file group_file">
                      <!-- <img :src="baseURL + scope.row.faceUrl" /> -->
                      <img :src="getUrl(scope.row)" />
                    </div>
                    <div class="group_Rcon">
                      <div class="dataBody_text">
                        <!-- <a class="rename_title" target="_blank" href="">{{ scope.row.username }}</a> -->
                        <div class="rename_title" style="box-sizing: content-box">{{
                          scope.row.username
                        }}</div>
                      </div>
                      <div class="group_count">
                        <!-- <span>2022-6-21</span><span>12:00</span> -->
                        <span>{{ getSplitTime(scope.row) }}</span>
                        <span>{{ scope.row.state === 1 ? '刷脸签到' : '管理员代签' }}</span>
                      </div>
                    </div>
                    <div class="operate">
                      <div class="operate_opt operate_top">
                        <!-- <a class="colorBlue" href="javascript:void(0);" operate="setTop">代签</a> -->
                        <div class="colorBlue" @click="updatesignByAdmin(scope.row)">取消签到</div>
                      </div>
                      <!--            <div class="operate_opt operate_more">
                              <a class="colorBlue" href="javascript:void(0);">更多</a>
                              <div class="operate_con">
                                <div class="popMoveBnt">移动到</div>
                                <div class="popEscBnt">退出</div>
                              </div>
                            </div> -->
                    </div>
                  </div>
                </template>
              </el-table-column>
              <template #empty>
                <div class="table-empty">
                  <!-- <img src="@/assets/images/notData.png" alt="notData" /> -->
                  <div>暂无数据</div>
                </div>
              </template>
            </el-table>
            <el-pagination
              v-model:currentPage="OKpageable.currentPage"
              v-model:page-size="OKpageable.pageSize"
              :page-sizes="[10, 25, 50, 100]"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="OKpageable.total"
              @size-change="OKhandleSizeChange"
              @current-change="OKhandleCurrentChange"
            >
            </el-pagination>
          </el-tab-pane>

          <el-tab-pane :label="NOlabel" name="second">
            <el-row>
              <el-col :span="18">
                <el-form :model="searchNOForm" status-icon class="demo-ruleForm">
                  <el-form-item prop="">
                    <el-input
                      v-model="searchNOForm.username"
                      placeholder="请输入名字查询"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="searchNOFormSubmit()">
                  <icon-search></icon-search>搜索
                </el-button>
              </el-col>
            </el-row>
            <el-table height="500" :data="NOdata" border style="width: 100%">
              <el-table-column prop="username" label="" show-overflow-tooltip width="">
                <template #default="scope">
                  <div class="dataBody_td dataBody_group" style="box-sizing: content-box">
                    <div class="dataBody_file group_file">
                      <!-- <img src="../../../assets/avatar.jpg" /> -->
                      <img :src="getUrl(scope.row)" />
                    </div>
                    <div class="group_Rcon">
                      <div class="dataBody_text" style="box-sizing: content-box">
                        <!-- <a class="rename_title" target="_blank" href="">{{ scope.row.username }}</a> -->
                        <div class="rename_title" style="box-sizing: content-box">{{
                          scope.row.username
                        }}</div>
                      </div>
                      <div class="group_count">
                        <!-- <span>2022-6-21</span><span>12:00</span> -->
                        <span>未签到</span>
                      </div>
                    </div>
                    <div class="operate">
                      <div class="operate_opt operate_top">
                        <!-- <a class="colorBlue" href="" operate="setTop">代签</a> -->
                        <div class="colorBlue" @click="getsignByAdmin(scope.row)">代签</div>
                      </div>
                      <!--            <div class="operate_opt operate_more">
                              <a class="colorBlue" href="javascript:void(0);">更多</a>
                              <div class="operate_con">
                                <div class="popMoveBnt">移动到</div>
                                <div class="popEscBnt">退出</div>
                              </div>
                            </div> -->
                    </div>
                  </div>
                </template>
              </el-table-column>
              <template #empty>
                <div class="table-empty">
                  <!-- <img src="@/assets/images/notData.png" alt="notData" /> -->
                  <div>暂无数据</div>
                </div>
              </template>
            </el-table>
            <el-pagination
              v-model:currentPage="NOpageable.currentPage"
              v-model:page-size="NOpageable.pageSize"
              :page-sizes="[10, 25, 50, 100]"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="NOpageable.total"
              @size-change="NOhandleSizeChange"
              @current-change="NOhandleCurrentChange"
            >
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  // import { ShoppingCartOne } from '@icon-park/vue-next';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { netConfig } from '@/config/net.config.js';
  import avatar from '../../../assets/avatar.jpg';
  import {
    searchUserMessage,
    searchUserSateOK,
    searchUserSateNO,
    deleteSignByAdmin,
    signByAdmin,
    searchAllMeeting,
    searchUserSateNOByWant,
    searchUserSateOKByWant,
    searchMeeting,
  } from '@/api/meeting.js';
  // import Echarts from '@/components/Echarts/index.vue';
  // import * as echarts from 'echarts/core';
  import * as echarts from 'echarts';
  export default {
    // components: {
    //   ShoppingCartOne,
    // },
    data() {
      return {
        EchartsTitle: '签到统计',

        myChart: '',
        // tooltip: {
        //   trigger: 'item',
        // },

        options: {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              name: '签到详情',
              type: 'pie',
              // radius: ['40%', '70%'],
              radius: '50%',
              avoidLabelOverlap: false,
              // itemStyle: {
              //   borderRadius: 10,
              //   borderColor: '#fff',
              //   borderWidth: 2,
              // },
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '14',
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                {
                  value: 5,
                  name: '已签到',
                },
                {
                  value: 8,
                  name: '未签到',
                },
              ],
            },
          ],
        },

        // series3: [
        //   {
        //     name: '签到详情',
        //     type: 'pie',
        //     // radius: ['40%', '70%'],
        //     radius: '50%',
        //     avoidLabelOverlap: false,
        //     // itemStyle: {
        //     //   borderRadius: 10,
        //     //   borderColor: '#fff',
        //     //   borderWidth: 2,
        //     // },
        //     label: {
        //       show: false,
        //       position: 'center',
        //     },
        //     emphasis: {
        //       label: {
        //         show: true,
        //         fontSize: '14',
        //       },
        //     },
        //     labelLine: {
        //       show: false,
        //     },
        //     data: [
        //       {
        //         value: 4,
        //         name: '已签到',
        //       },
        //       {
        //         value: 8,
        //         name: '未签到',
        //       },
        //     ],
        //   },
        // ],
        //
        baseURL: netConfig.baseURL,
        Delete: 'Delete',
        activeName: 'first',
        OKdata: [],
        NOdata: [],

        OKNumber: 0,
        NONumber: 0,
        OKlabel: '',
        NOlabel: '',
        meeting: {},

        //搜索参数
        searchOKForm: {
          username: '',
        },
        searchNOForm: {
          username: '',
        },
        // 未签到分页
        NOpageable: {
          // 当前页数
          currentPage: 1,
          // 每页显示个数
          pageSize: 10,
          // 总条目数
          total: 0,
        },

        // 已签到分页
        OKpageable: {
          // 当前页数
          currentPage: 1,
          // 每页显示个数
          pageSize: 10,
          // 总条目数
          total: 0,
        },
      };
    },
    mounted() {
      (this.myChart = echarts.init(document.getElementById('customerChart'))),
        // console.log(this.$route.query.id);
        (this.OKlabel = '已签到(0)');
      this.NOlabel = '未签到(0)';

      let _this = this;
      setInterval(function () {
        _this.getMeetingUserSateOK();
        _this.getMeetingUserSateNO();
        // console.log('zhix');
      }, 1000);

      this.getMeetingUserSateOK();
      this.getMeetingUserSateNO();
      this.getMeetingUser();
      this.getAllMeeting();
      // this.series3[0].data[1].value = this.NONumber;
    },
    methods: {
      int() {
        let myChart = echarts.init(document.getElementById('customerChart'));
        // 绘制图表
        // myChart.setOption({
        //   title: { text: '总用户量' },
        //   tooltip: {},
        //   xAxis: {
        //     data: ['12-3', '12-4', '12-5', '12-6', '12-7', '12-8'],
        //   },
        //   yAxis: {},
        //   series: [
        //     {
        //       name: '用户量',
        //       type: 'line',
        //       data: [5, 20, 36, 10, 10, 20],
        //     },
        //   ],
        // });
      },
      setMyEcharts() {
        this.myChart.setOption({
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              name: '签到详情',
              type: 'pie',
              radius: '50%',
              // avoidLabelOverlap: false,
              // label: {
              //   show: false,
              //   position: 'center',
              // },
              // emphasis: {
              //   label: {
              //     show: true,
              //     fontSize: '14',
              //   },
              // },
              // labelLine: {
              //   show: false,
              // },
              data: [
                {
                  value: this.OKNumber,
                  name: '已签到',
                },
                {
                  value: this.NONumber,
                  name: '未签到',
                },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        });
        // window.onresize = function () {
        //   //自适应大小
        //   this.myChart.resize();
        // };
      },
      handleClick() {
        this.setMyEcharts();
        // this.initEcharts();
        // this.options.series[0].data[0].value = 12;
        // charts.setOption(this.options);
        // var chartDom = document.getElementById('main');
        // var myChart = echarts.init(chartDom);
        // myChart.setOption(this.option);
        this.getMeetingUserSateOK();
        this.getMeetingUserSateNO();
        let meetingid = this.$route.query.id;
        // let username = null;
        let username = '';
        // searchUserSateNOByWant(meetingid, username).then((response) => {
        //   console.log('查询未签到潘', response);
        //   // this.NOdata = response.data;
        //   // this.NONumber = this.NOdata.length;
        //   // this.NOlabel = '未签到(' + this.NONumber + ')';
        // });
        // searchUserSateOKByWant(meetingid, username).then((response) => {
        //   console.log('查询已签到潘', response);
        //   // this.NOdata = response.data;
        //   // this.NONumber = this.NOdata.length;
        //   // this.NOlabel = '未签到(' + this.NONumber + ')';
        // });
      },

      /** 查询会议 */
      getAllMeeting() {
        //查询所有会议
        searchAllMeeting().then((response) => {
          // console.log('查询所有会议', response);
          // let meetingid = this.$route.query.id;
          // for (let i = 0; i < response.data.meetings.length; i++) {
          //   if (response.data.meetings[i].id == meetingid) {
          //     console.log(response.data.meetings[i]);
          //     this.meeting = response.data.meetings[i];
          //   }
          // }
        });
        searchMeeting({}).then((response) => {
          // console.log('高级查询', response);
          let meetingid = this.$route.query.id;
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].id == meetingid) {
              // console.log(response.data[i]);
              this.meeting = response.data[i];
            }
          }
        });
      },
      //修改为未签到
      updatesignByAdmin(row) {
        // console.log(row);
        let userid = row.id;
        let meetingid = this.$route.query.id;
        // ElMessageBox.confirm('？', '系统提示', {
        //   confirmButtonText: '确认',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        // })
        //   .then(() => {})
        //   .catch(() => {});

        ElMessageBox.confirm('是否修改为未签到?', '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            deleteSignByAdmin(userid, meetingid).then((response) => {
              // console.log(response);
              ElMessage({
                type: 'success',
                message: '修改成功',
              });
            });
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            });
          });
        // signByAdmin(userid, meetingid).then((response) => {
        //   console.log(response);
        // });
      },
      getsignByAdmin(row) {
        // console.log(row);
        let userid = row.id;
        let meetingid = this.$route.query.id;
        // ElMessageBox.confirm('？', '系统提示', {
        //   confirmButtonText: '确认',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        // })
        //   .then(() => {})
        //   .catch(() => {});

        ElMessageBox.confirm('是否代签?', '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            signByAdmin(userid, meetingid).then((response) => {
              // console.log(response);
              ElMessage({
                type: 'success',
                message: '代签成功',
              });
            });
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            });
          });
        // signByAdmin(userid, meetingid).then((response) => {
        //   console.log(response);
        // });
      },
      getUrl(row) {
        let url = this.baseURL + row.faceUrl;
        // console.log('url', url);
        return url;
      },
      toTime(val) {
        return String(val < 10 ? '0' + val : val);
      },
      getSplitTime(row) {
        if (row.startTime == null) {
          return '';
        }

        let time =
          row.startTime[0] +
          '-' +
          row.startTime[1] +
          '-' +
          row.startTime[2] +
          ' ' +
          this.toTime(row.startTime[3]) +
          ':' +
          this.toTime(row.startTime[4]) +
          ':' +
          this.toTime(row.startTime[5]);
        // console.log('time', time);
        return time;
      },
      getMeetingUser() {
        let id = this.$route.query.id;
        searchUserMessage(id).then((response) => {
          // console.log('查询会议的全部用户', response);
        });
      },
      getMeetingUserSateOK() {
        // console.log(this.$route.query.id);
        let id = this.$route.query.id;
        // let id = 65;
        searchUserSateOK(id).then((response) => {
          // console.log('OK', response);
          // this.OKlabel = '';
          // console.log('已签到', response);
          // this.OKdata = response.data;
          this.OKNumber = response.data.length;
          // this.series3[0].data[0].value = response.data.length;
          this.OKlabel = '已签到(' + this.OKNumber + ')';
          this.setMyEcharts();
        });

        let meetingid = this.$route.query.id;
        let username = this.searchOKForm.username;
        searchUserSateOKByWant(meetingid, username).then((response) => {
          // console.log('模糊查询已签到', response);
          this.OKdata = response.data;
          this.OKpageable.total = this.OKdata.length;
          // this.OKNumber = this.OKdata.length;
          // this.OKlabel = '未签到(' + this.OKNumber + ')';
        });
      },
      getMeetingUserSateNO() {
        // console.log(this.$route.query.id);
        let id = this.$route.query.id;
        searchUserSateNO(id).then((response) => {
          // console.log('No');
          // this.NOlabel = '';
          // console.log('未签到', response);
          // this.NOdata = response.data;
          // this.NONumber = this.NOdata.length;
          // this.NOlabel = '未签到(' + this.NONumber + ')';
          this.NONumber = response.data.length;
          // this.series3[0].data[1].value = response.data.length;
          // console.log('ss', this.series3[0].data[1].value);
          this.NOlabel = '未签到(' + this.NONumber + ')';
          this.setMyEcharts();
        });

        let meetingid = this.$route.query.id;
        let username = this.searchNOForm.username;
        searchUserSateNOByWant(meetingid, username).then((response) => {
          // console.log('模糊查询未签到', response);
          this.NOdata = response.data;
          this.NOpageable.total = this.NOdata.length;
          // this.NONumber = this.NOdata.length;
          // this.NOlabel = '未签到(' + this.NONumber + ')';
        });
      },
      searchOKFormSubmit() {
        this.getMeetingUserSateOK();
      },

      searchNOFormSubmit() {
        this.getMeetingUserSateNO();
      },
      //未签到分页
      NOhandleSizeChange: function (size) {
        this.NOpageable.pageSize = size;
        // this.getMyMeeting();
        this.searchNOFormSubmit();
      },

      NOhandleCurrentChange: function (currentPage) {
        this.NOpageable.currentPage = currentPage;
        // this.getMyMeeting();
        this.searchNOFormSubmit();
      },
      //已签到分页
      OKhandleSizeChange: function (size) {
        this.OKpageable.pageSize = size;
        // this.getMyMeeting();
        this.searchOKFormSubmit();
      },

      OKhandleCurrentChange: function (currentPage) {
        this.OKpageable.currentPage = currentPage;
        // this.getMyMeeting();
        this.searchOKFormSubmit();
      },
    },
  };
</script>

<style>
  /*  .el-table td.el-table__cell div {
    box-sizing: content-box;
  } */

  /*  */
  .dataBody_td {
    position: relative;
    float: none;
    min-height: 54px;
    padding: 9px 30px;
    font-size: 12px;
    color: #646873;
    border-bottom: solid 1px #f2f2f2;
    box-sizing: border-box;
  }

  .dataBody_group {
    padding: 14px 30px;
    float: none;
    box-sizing: content-box;
  }

  .dataBody_td {
    border-top: 1px solid #f2f2f2;
    border-bottom: 0 none;
  }

  .dataBody_group .group_file {
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
  }

  .dataBody_group .group_file {
    height: 44px;
    float: left;
    margin-right: 14px;
  }

  .dataBody_file {
    left: 0;
    margin-top: 0;
  }

  .dataBody_file {
    position: relative;
    float: left;
    height: 30px;
    top: 3px;
    margin-right: 14px;
    z-index: 3;
  }

  .dataBody_group .group_file img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }

  .dataBody_file img {
    width: 30px;
    height: 30px;
    display: block;
    border-radius: 3px;
  }

  img {
    border: 0;
  }

  /*  */
  .dataBody_group .group_Rcon {
    /* float: left; */
    /* padding-left: 58px; */
    margin-left: 0;
  }

  .dataBody_group .group_Rcon {
    margin-left: 58px;
  }

  .dataBody_group .dataBody_text {
    position: relative;
    z-index: 2;
  }

  .dataBody_group .dataBody_text {
    margin-top: 2px;
  }

  /*  */
  .dataBody_group .dataBody_text .rename_title {
    display: block;
    max-width: 100%;
    width: 100%;
    padding-bottom: 20px;
  }

  .dataBody_group .dataBody_text .rename_title {
    margin-top: 2px;
    height: 20px;
    line-height: 20px;
    /* max-width: calc(100% - 375px); */
  }

  .dataBody_text .rename_title {
    /* max-width: calc(100% - 260px); */
    display: inline-block;
    vertical-align: middle;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #181e33;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  a {
    text-decoration: none;
  }

  .dataBody_group .group_count {
    font-size: 12px;
    color: #a8a8b3;
    line-height: 16px;
    margin-top: 4px;
  }

  .dataBody_group .group_count {
    margin-top: -16px;
  }

  .dataBody_group .group_count span {
    margin-right: 5px;
  }

  /* hover */

  .dataBody_td:hover {
    background: #f7fafc;
  }

  .operate {
    /* display: none; */
    height: 36px;
    line-height: 36px;
    position: absolute;
    /*    right: 200px;
    top: 50%; */
    right: 85px;
    top: 50%;
    margin-top: -19px;
    font-size: 14px;
  }

  .operate {
    z-index: 3;
  }

  .operate_opt {
    margin-right: 24px;
    float: left;
  }

  .colorBlue {
    cursor: pointer;
    color: #3a8bff;
  }

  a {
    text-decoration: none;
  }

  .dataBody_td:hover .operate {
    display: block;
  }

  .el-table td.el-table__cell div {
    box-sizing: content-box;
  }
</style>

<style>
  .time {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 0;
    min-height: auto;
  }

  .image {
    width: 100%;
    height: 100px;
    display: block;
  }
</style>

<style>
  .layuimini-qiuck-module {
    text-align: center;
    margin-top: 10px;
  }

  .layui-col-space10 > * {
    padding: 5px;
  }

  .layui-col-xs3 {
    width: 25%;
  }

  /*  */
  a {
    color: #333;
    text-decoration: none;
  }

  .layuimini-qiuck-module a i {
    display: inline-block;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 2px;
    font-size: 30px;
    background-color: #f8f8f8;
    color: #333;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
  }

  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .layuimini-qiuck-module a cite {
    position: relative;
    top: 2px;
    display: block;
    color: #666;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
  }

  /*  */
  .layui-col-space10 > * {
    padding: 5px;
  }

  .layui-col-xs6 {
    /* width: 50%; */
    margin: 10px;
  }

  .layui-bg-number {
    background-color: #f8f8f8;
  }

  .panel {
    /* background-color: #fff; */
    border: 1px solid transparent;
    border-radius: 3px;
    -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  }

  .panel-body {
    padding: 10px;
    /* background-color: #2F4056 !important; */
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  }

  .panel-title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 12px;
    color: inherit;
  }

  .label {
    display: inline;
    padding: 0.2em 0.6em 0.3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25em;
    margin-top: 0.3em;
  }

  .pull-right {
    float: right;
  }

  .layui-bg-blue {
    background-color: #1e9fff !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
  }
</style>

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
  }

  .header-box {
    width: 100%;
    height: 50px;
    text-align: center;
  }

  .content-box {
    width: 100%;
    height: 400px;
    text-align: center;
  }

  footer-box {
    width: 100%;
    height: 50px;
    text-align: center;
  }

  .justify-content-between {
    -webkit-box-pack: justify !important;
    -ms-flex-pack: justify !important;
    justify-content: space-between !important;
  }
</style>
