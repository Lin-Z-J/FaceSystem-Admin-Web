<template>
  <el-card class="box-card" style="box-shadow: none">
    <template #header>
      <div class="card-header">
        <span>参会人员列表</span>
        <el-button class="button" type="primary" @click="handleUserAdd()" text
          >添加人员管理</el-button
        >
      </div>
    </template>
    <!--  -->
    <el-table
      height="400"
      :data="meetingUserList"
      :border="true"
      @selection-change="selectionChange"
      :row-key="getRowKeys"
    >
      <el-table-column
        prop="username"
        label="用户名称"
        show-overflow-tooltip
        width=""
      ></el-table-column>
      <el-table-column prop="sex" label="性别" show-overflow-tooltip width="" v-slot="scope">
        {{ scope.row.sex == 1 ? '男' : '女' }}
      </el-table-column>
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip width=""></el-table-column>
      <el-table-column prop="note" label="备注" show-overflow-tooltip width=""></el-table-column>
      <template #empty>
        <div class="table-empty">
          <div>暂无数据</div>
        </div>
      </template>
    </el-table>

    <!-- 对话框的结构 -->
    <el-dialog v-model="UserAddopen" title="添加用户" width="700px">
      <div style="text-align: center">
        <el-transfer
          v-model="rightValue"
          style="text-align: left; display: inline-block"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :titles="['未选用户', '已选用户']"
          :button-texts="['', '']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}',
          }"
          :data="data"
          @change="handleChange"
        >
          <template #default="{ option }">
            <span>{{ option.key }} - {{ option.label }}</span>
          </template>
          <template #left-footer>
            <el-button class="transfer-footer" size="small">操作</el-button>
          </template>
          <template #right-footer>
            <el-button class="transfer-footer" size="small">操作</el-button>
          </template>
        </el-transfer>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">保存已选用户</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>

  <el-card class="box-card" style="box-shadow: none">
    <el-descriptions class="margin-top" title="会议室介绍" :column="3" :size="size" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <icon-me />
            可容纳人数
          </div>
        </template>
        10人
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <icon-push-door />
            门牌号
          </div>
        </template>
        203
      </el-descriptions-item>
      <!-- 			<el-descriptions-item>
				<template #label>
					<div class="cell-item">
						<el-icon :style="iconStyle">
							<tickets />
						</el-icon>
						备注
					</div>
				</template>
				<el-tag size="small">无</el-tag>
			</el-descriptions-item> -->
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <icon-local />
            地址
          </div>
        </template>
        新大楼A栋
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          // room: '',
          // theme: '',
          // date: '',
          // endTdate: '',
          // startTime: '',
          // endTime: '',
          // applicant: '',
          // content: ''
        },
        //
        searchUserParam: {},
        // 是否显示弹出层
        UserAddopen: false,

        //会议用户列表
        meetingUserList: [],
        //用户列表
        userList: [
          {
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
        //
        data: [],
        rightValue: [1],
      };
    },
    mounted() {
      for (let i = 15; i <= 30; i++) {
        this.data.push({
          key: i,
          label: `用户${i}`,
          // disabled: i % 4 === 0,
        });
      }
    },
    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
        //右边框有的值
        console.log(this.rightValue);
      },
      // 表单重置
      resetLoginForm() {
        this.$refs.form.resetField();
      },
      /** 新增按钮操作 */
      handleUserAdd() {
        this.UserAddopen = true;
      },
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
    margin: 0;
    padding: 0;
  }

  .el-card {
    box-shadow: none;
  }
</style>
