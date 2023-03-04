<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>快速查询会议室</span>
        <!-- <el-button class="button" text>Operation button</el-button> -->
        <!-- <el-button type="primary" :icon="CirclePlus" @click="handleAdd()">快速创建会议</el-button> -->
      </div>
    </template>
    <div class="table-search">
      <el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
        <el-form-item label="会议室地址" prop="address">
          <el-select v-model="searchParam.room" placeholder="新大楼A栋">
            <el-option label="新大楼A栋" value="shanghai"></el-option>
            <el-option label="新大楼B栋" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议室" prop="room">
          <el-select v-model="searchParam.room" placeholder="新会议室-01">
            <el-option label="新会议室-01" value="shanghai"></el-option>
            <el-option label="新会议室-02" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门牌号" prop="room">
          <el-input v-model="searchParam.room" placeholder="请输入门牌号" maxlength="30" />
        </el-form-item>
        <!-- 			<div class="more-item" >
					<el-form-item label="日期 :" prop="date">
						<el-date-picker v-model="searchParam.startdate" type="date" placeholder="起始日期" />
					</el-form-item>
				</div> -->

        <!-- 				<div class="more-item" v-show="searchShow">
					<el-form-item label="日期 :" prop="date">
						<el-date-picker v-model="searchParam.startdate" type="date" placeholder="起始日期" />
					</el-form-item>
				</div> -->
        <!-- 				<el-form-item label="时间:" prop="">
					<el-time-select v-model="searchParam.startTime" :max-time="searchParam.endTime" class="mr-4" placeholder="起始时间"
						start="08:30" step="00:15" end="18:30" />至
					<el-time-select v-model="searchParam.endTime" :min-time="searchParam.startTime" placeholder="结束时间" start="08:30"
						step="00:15" end="18:30" />
				</el-form-item> -->
      </el-form>
      <div class="search-operation">
        <el-button type="primary" :icon="Search" @click="search">查询</el-button>
        <el-button :icon="Delete" @click="reset">重置</el-button>
      </div>
    </div>
  </el-card>

  <!--  -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>会议室列表</span>
        <el-button class="button">刷新</el-button>
      </div>
    </template>
    <div style="margin: 10px" v-for="i in 2">
      <el-card shadow="hover">
        <el-row :gutter="20">
          <el-col :span="8">
            <!-- <el-card class="card"> -->
            <a href="" vclick-ignore="true">
              <div class="hd"><img src="" alt="" /> </div>
              <div class="bd">
                <div class="info">
                  <h2><span>新会议室-01</span></h2>
                  <div class="date"> 会议室地址：<span>新大楼A栋</span></div>
                  <div class="date"> 门牌号：<span>203</span></div>
                  <div class="date"> 容纳人数：<span>10人</span></div>
                </div>
                <div class="more">
                  <div class="tips">预定</div>
                </div>
              </div>
            </a>
            <!-- </el-card> -->
          </el-col>
          <el-col :span="16">
            <!-- <span>当天会议室使用详情</span> -->
            <el-form-item label="日期 :" prop="date">
              <el-date-picker v-model="searchParam.startdate" type="date" placeholder="日期" />
              <el-button type="primary" :icon="Search" @click="search"
                >查询会议室当天使用详情</el-button
              >
            </el-form-item>
            <el-table :data="tableData" height="145" border style="width: 100%">
              <el-table-column prop="date" label="会议时间" width="180"> </el-table-column>
              <el-table-column prop="name" label="预定人" width="180"> </el-table-column>
              <el-table-column prop="theme" label="主题"> </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-empty description="暂无数据"></el-empty>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            date: '12:00～13:00',
            name: '潘康华',
            theme: '疫情防控',
          },
          {
            date: '13:00～14:00',
            name: '潘康华',
            theme: '产品研发',
          },
          {
            date: '14:00～15:00',
            name: '潘康华',
            theme: '疫情防控',
          },
          {
            date: '16:00～17:00',
            name: '潘康华',
            theme: '疫情防控',
          },
          {
            date: '18:00～19:00',
            name: '潘康华',
            theme: '疫情防控',
          },
        ],
        searchParam: {
          username: '',
          gender: '',
          idCard: '',
          email: '',
          createTime: '',
        },
      };
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
    margin-bottom: 10px;
    /* width: 480px; */
  }
</style>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    /* width: 480px; */
  }

  .card {
    width: 330px;
    margin-right: 40px;
    margin-bottom: 40px;
    border-radius: 3px;
    overflow: hidden;
    transition: box-shadow 0.2s;
    vertical-align: top;
    font-size: 12px;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: inherit;
  }

  a {
    color: #666;
    outline: 0;
    text-decoration: none;
    text-underline-position: under;
  }

  .hd {
    overflow: hidden;
  }

  img {
    border: 0 none;
    width: auto\9;
    height: auto;
    max-width: 100%;
    vertical-align: top;
    -ms-interpolation-mode: bicubic;
  }

  .bd {
    vertical-align: top;
    font-size: 12px;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    /* padding: 20px 28px; */
  }

  h2 {
    font-size: 14px;
    color: #333;
  }

  .date {
    font-size: 12px;
    color: #999;
    margin-top: 8px;
  }

  .tips {
    width: 60px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #ccc;
    color: #fff;
    border-radius: 99px;
  }
</style>
