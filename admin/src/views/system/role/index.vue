<template>
  <!--  -->
  <el-form :model="queryParams" ref="queryForm" :inline="true">
    <el-form-item label="角色名称" prop="roleName">
      <el-input
        v-model="queryParams.roleName"
        placeholder="请输入角色名称"
        clearable
        style="width: 240px"
        @keyup.enter.native="handleQuery"
      />
    </el-form-item>
    <el-form-item label="状态:" prop="status">
      <el-select placeholder="角色状态" clearable>
        <el-option
          v-for="item in enabledTypeOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
    </el-form-item>
    <!-- 		<el-form-item label="创建时间">
			<el-date-picker v-model="dateRange" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
				range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
		</el-form-item> -->
    <el-form-item>
      <el-button type="primary" size="mini" @click="handleQuery"
        ><icon-search></icon-search>搜索</el-button
      >
      <el-button size="mini" @click="resetQuery"
        ><icon-delete-themes></icon-delete-themes>重置</el-button
      >
    </el-form-item>
  </el-form>
  <!-- 搜索表头 -->
  <div class="table-header">
    <div class="header-button-lf">
      <el-button type="primary" @click="handleAdd()">新增角色</el-button>
    </div>
    <!-- 			<div class="header-button-ri">
  		<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
  	</div> -->
  </div>

  <!--  -->
  <el-table
    height="600"
    :data="roleList"
    :border="true"
    @selection-change="handleSelectionChange"
    :row-key="getRowKeys"
  >
    <el-table-column type="selection" align="center" />
    <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150" />
    <!-- <el-table-column label="角色级别" prop="roleSort" /> -->
    <el-table-column prop="rolestatus" label="角色状态" width="180" v-slot="scope">
      <el-switch
        :value="scope.row.rolestatus"
        :active-text="scope.row.rolestatus === 1 ? '启用' : '禁用'"
        :active-value="1"
        :inactive-value="0"
        @change="changeStatus($event, scope.row)"
      />
    </el-table-column>
    <!-- 		<el-table-column label="创建时间" align="center" prop="createTime" width="180">
			<template v-slot="scope">
				<span>{{ scope.row.createTime}}</span>
			</template>
		</el-table-column> -->
    <el-table-column label="操作" width="320" v-slot="scope">
      <el-button type="primary" link :icon="EditPen" @click="handleUpdate('编辑', scope.row)"
        >修改</el-button
      >
      <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)"
        >删除</el-button
      >
    </el-table-column>
  </el-table>

  <!-- 添加或修改角色配置对话框 -->
  <el-dialog v-model="open" title="添加角色" width="500px" append-to-body>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" />
      </el-form-item>
    </el-form>
    <el-form-item label="角色顺序" prop="roleSort">
      <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="form.status" size="mini">
        <el-radio-button label="0">正常</el-radio-button>
        <el-radio-button label="1">停用</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="菜单权限">
      <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')"
        >展开/折叠</el-checkbox
      >
      <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')"
        >全选/全不选</el-checkbox
      >
      <el-checkbox
        v-model="form.menuCheckStrictly"
        @change="handleCheckedTreeConnect($event, 'menu')"
        >父子联动
      </el-checkbox>
      <el-tree
        class="tree-border"
        :data="menuOptions"
        show-checkbox
        ref="menu"
        node-key="id"
        :check-strictly="!form.menuCheckStrictly"
        empty-text="加载中，请稍候"
        :props="defaultProps"
      ></el-tree>
    </el-form-item>

    <el-form-item label="备注">
      <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
    </el-form-item>
  </el-dialog>
</template>

<script>
  import {
    Refresh,
    CirclePlus,
    Delete,
    Search,
    EditPen,
    Download,
    Upload,
    View,
    ArrowDown,
    ArrowUp,
  } from '@element-plus/icons-vue';
  export default {
    data() {
      return {
        Refresh: 'Refresh',
        CirclePlus: 'CirclePlus',
        Delete: 'Delete',
        Search: 'Search',
        EditPen: 'EditPen',
        Download: 'Download',
        Upload: 'Upload',
        View: 'View',
        ArrowDown: 'ArrowDown',
        ArrowUp: 'ArrowUp',
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          roleName: undefined,
          roleKey: undefined,
          status: undefined,
        },
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        // 菜单列表
        menuOptions: [
          {
            id: '1',
            label: '系统管理',
            children: [
              {
                id: '11',
                label: '用户管理',
              },
              {
                id: '12',
                label: '角色管理',
              },
            ],
          },
          {
            id: 'b',
            label: 'b',
          },
          {
            id: 'c',
            label: 'c',
          },
        ],
        // 角色数据
        roleList: [
          {
            roleId: 1,
            roleName: '超级管理员',
            roleKey: '',
            roleSort: '1',
            rolestatus: 1,
            createTime: '2021-09-09 17:25:37',
          },
          {
            roleId: 2,
            roleName: '普通角色',
            roleKey: '',
            roleSort: '2',
            rolestatus: 1,
            createTime: '2021-09-09 17:25:37',
          },
        ],
      };
    },
    methods: {
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRange = [];
        // this.resetForm("queryForm");
        // this.handleQuery();
      },
      // 所有菜单节点数据
      getMenuAllCheckedKeys() {
        // 目前被选中的菜单节点
        let checkedKeys = this.$refs.menu.getCheckedKeys();
        console.log(checkedKeys);
        // 半选中的菜单节点
        // let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
        // checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
        // return checkedKeys;
      },
      // 树权限（全选/全不选）
      handleCheckedTreeNodeAll(value, type) {
        this.getMenuAllCheckedKeys();
        if (type == 'menu') {
          this.$refs.menu.setCheckedNodes(value ? this.menuOptions : []);
        } else if (type == 'dept') {
          this.$refs.dept.setCheckedNodes(value ? this.deptOptions : []);
        }
      },
      /** 修改按钮操作 */
      handleUpdate(title, row) {
        this.open = true;
        console.log('aa');
        // this.reset();
        // const roleId = row.roleId || this.ids
        // const roleMenu = this.getRoleMenuTreeselect(roleId);
        // getRole(roleId).then(response => {
        //   this.form = response.data;
        //   this.open = true;
        //   this.$nextTick(() => {
        //     roleMenu.then(res => {
        //       let checkedKeys = res.checkedKeys
        //       checkedKeys.forEach((v) => {
        //           this.$nextTick(()=>{
        //               this.$refs.menu.setChecked(v, true ,false);
        //           })
        //       })
        //     });
        //   });
        //   this.title = "修改角色";
        // });
      },
    },
  };
</script>

<style>
  .tree-border {
    margin-top: 5px;
    border: 1px solid #e5e6e7;
    background: #fff none;
    border-radius: 4px;
  }
</style>
