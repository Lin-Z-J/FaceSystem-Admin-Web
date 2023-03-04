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



  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>会议签到详情</span>
        <!-- <el-button class="button" text>Operation button</el-button> -->
      </div>
    </template>


    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image" />

          <div style="padding: 14px">
            <span>林照杰的会议</span>
            <div class="bottom">
              <time class="time">会议时间：2022-6-10 12:00-13:00 {{ currentDate }}</time>
              <el-button text class="button">进行中</el-button>
            </div>
          </div>

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
                <span class="label pull-right layui-bg-blue">实时</span>
                <!-- <h5>签到统计</h5> -->
              </div>
              <div class="panel-content">
                <h1 class="no-margins">12</h1>
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
                <h1 class="no-margins">12</h1>
                <small>签到数</small>
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
                <h1 class="no-margins">12</h1>
                <small>未签到</small>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>


    <!-- 菜单管理 -->
    <el-row>
      <el-col :span="8">
        <div class="layui-col-xs3 layuimini-qiuck-module">
          <a href="javascript:;" layuimini-content-href="page/menu.html" data-title="菜单管理"
            data-icon="fa fa-window-maximize">
            <icon-lock theme="outline" size="30" fill="#999" />
            <cite>修改会议</cite>
          </a>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="layui-col-xs3 layuimini-qiuck-module">
          <a href="javascript:;" layuimini-content-href="page/menu.html" data-title="导出签到记录"
            data-icon="fa fa-window-maximize">
            <icon-lock theme="outline" size="30" fill="#999" />
            <cite>导出签到记录</cite>
          </a>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="layui-col-xs3 layuimini-qiuck-module">
          <a href="javascript:;" layuimini-content-href="page/menu.html" data-title="菜单管理"
            data-icon="fa fa-window-maximize">
            <icon-lock theme="outline" size="30" fill="#999" />
            <cite>签到统计</cite>
          </a>
        </div>
      </el-col>
    </el-row>




    <!--视图 -->

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>会议签到详情</span>
          <span>当前会议室：新会议室-001</span>
          <el-button class="button" text>14:32</el-button>
        </div>
      </template>


      <el-row style="height: 550px;" :gutter="10">




        <el-col :span="5" style="background-color: ;">

          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <!-- <span style="margin: auto;">已完成签到：12</span> -->
            <el-tab-pane label="已签到(12)" name="first">
              <div class="dataBody_td dataBody_group">
                <div class="dataBody_file group_file">
                  <img src="../../../assets/avatar.jpg">
                </div>
                <div class="group_Rcon">

                  <div class="dataBody_text"><a class="rename_title" target="_blank"
                      href="/pc/topic/topiclist/index?bbsid=schoolid23194">林照杰</a></div>
                  <div class="group_count">
                    <span>2022-6-21</span><span>12:00</span>

                  </div>
                </div>
                <div class="operate">
                  <div class="operate_opt operate_top">

                    <a class="colorBlue" href="javascript:void(0);" operate="setTop">代签</a>
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

            </el-tab-pane>
            <el-tab-pane label="未签到(6)" name="second">
              <div class="dataBody_td dataBody_group">
                <div class="dataBody_file group_file">
                  <img src="../../../assets/avatar.jpg">
                </div>
                <div class="group_Rcon">

                  <div class="dataBody_text"><a class="rename_title" target="_blank"
                      href="/pc/topic/topiclist/index?bbsid=schoolid23194">林照杰</a></div>
                  <div class="group_count">
                    <span>2022-6-21</span><span>12:00</span>

                  </div>
                </div>
                <div class="operate">
                  <div class="operate_opt operate_top">

                    <a class="colorBlue" href="javascript:void(0);" operate="setTop">代签</a>
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
            </el-tab-pane>
          </el-tabs>
        </el-col>

        <!-- 人脸抓拍 -->
        <el-col :span="19" style="background-color: #999;">
          <!-- 拍照 -->
          <div class="camera_outer">
            <div style="height: 500px;">


              <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay
                style="margin: auto;padding: 50px;"></video>
              <canvas style="display: none" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
              <div v-if="imgSrc" class="img_bg_camera" style="margin: auto;padding: 50px;">
                <p>效果预览</p>
                <img :src="imgSrc" alt class="tx_img" />
              </div>
            </div>
            <div class="bottom">
              <el-button @click="getCompetence()" type="primary">打开摄像头</el-button>
              <el-button @click="stopNavigator()" type="warning">关闭摄像头</el-button>
              <el-button @click="setImage()" type="success">拍照</el-button>
            </div>
          </div>
        </el-col>



      </el-row>
    </el-card>

  </el-card>



</template>

<script>
  import {
    ShoppingCartOne
  } from "@icon-park/vue-next"
  export default {
    components: {
      ShoppingCartOne,
    },
    data() {
      return {
        Delete: 'Delete',
        activeName: 'first'
      }
    }
  }
</script>


<style>
  /*  */
  .dataBody_td {
    position: relative;
    float: none;
    min-height: 54px;
    padding: 9px 30px;
    font-size: 12px;
    color: #646873;
    border-bottom: solid 1px #F2F2F2;
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
    color: #181E33;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  a {
    text-decoration: none;
  }



  .dataBody_group .group_count {
    font-size: 12px;
    color: #A8A8B3;
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
    background: #F7FAFC;
  }



  .operate {
    display: none;
    height: 36px;
    line-height: 36px;
    position: absolute;
    right: 200px;
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
    color: #3A8BFF;
  }

  a {
    text-decoration: none;
  }

  .dataBody_td:hover .operate {
    display: block;
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

  .layui-col-space10>* {
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
    background-color: #F8F8F8;
    color: #333;
    transition: all .3s;
    -webkit-transition: all .3s;
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
  .layui-col-space10>* {
    padding: 5px;
  }

  .layui-col-xs6 {
    /* width: 50%; */
    margin: 10px;
  }

  .layui-bg-number {
    background-color: #F8F8F8;
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
    background-color: #1E9FFF !important;
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
