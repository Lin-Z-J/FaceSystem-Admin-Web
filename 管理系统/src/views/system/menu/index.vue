<template>
	<!--  -->
	<el-form ref="queryForm" :inline="true">
		<el-form-item label="菜单名称:" prop="menuName">
			<el-input placeholder="请输入菜单名称" clearable />
		</el-form-item>
		<!-- 		<el-form-item label="状态:" prop="status">
			<el-select placeholder="菜单状态" clearable>
				<el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name"
					:value="item.key" />
			</el-select>
		</el-form-item> -->
		<el-form-item>
			<el-button type="primary" size="mini" @click="handleQuery"><icon-search></icon-search>搜索</el-button>
			<el-button :icon="Delete" size="mini" @click="resetQuery"><icon-delete-themes></icon-delete-themes>重置</el-button>
		</el-form-item>
	</el-form>
	<!--  -->
	<div class="table-header">
		<div class="header-button-lf">
			<el-button type="primary" plain :icon="CirclePlus" size="mini" @click="handleAdd()">新增</el-button>
			<el-button type="info" plain :icon="Switch" size="mini" @click="toggleExpandAll">展开/折叠</el-button>
			<!-- 			<el-button type="primary" :icon="CirclePlus" @click="handleAdd()">新增用户
			</el-button>
							<el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户
			</el-button>
			<el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据
			</el-button>
			<el-button type="danger" :icon="Delete" plain :disabled="!isSelected" @click="batchDelete">
				批量删除用户
			</el-button> -->
		</div>
		<!-- 			<div class="header-button-ri">
			<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
		</div> -->
	</div>
	<!-- 	<el-row :gutter="10" class="mb8">
		<el-col :span="1.5">
			<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd()">新增</el-button>
		</el-col>
		<el-col :span="1.5">
			<el-button type="info" plain icon="el-icon-sort" size="mini" @click="toggleExpandAll">展开/折叠</el-button>
		</el-col>
		<right-toolbar @queryTable="getList"></right-toolbar>
	</el-row> -->



	<!-- 表格 -->
	<div>
		<el-table :data="menuList" style="width: 100%" border lazy :load="load" row-key="menuId"
			:default-expand-all="isExpandAll" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
			<!-- <el-table-column type="selection" reserve-selection width="80" /> -->
			<el-table-column :show-overflow-tooltip="true" label="菜单名称" width="125px" prop="menuName" />
			<el-table-column prop="icon" label="图标" align="center" width="60px">
			</el-table-column>
			<el-table-column prop="orderNum" align="center" label="排序">
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="componentpath" label="路由地址" />
			<el-table-column label="操作" fixed="right" width="320" v-slot="scope">
				<!-- 				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看
				</el-button> -->
				<el-button type="primary" link :icon="EditPen" @click="handleUpdate('编辑', scope.row)">
					编辑</el-button>
				<!-- <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码 -->
				<!-- </el-button> -->
				<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除
				</el-button>
				<!-- <span v-if="!BUTTONS.view && !BUTTONS.edit && !BUTTONS.reset && !BUTTONS.delete">--</span> -->
			</el-table-column>
		</el-table>
	</div>

	<!-- 添加或修改菜单对话框 -->
	<el-dialog v-model="open" title="添加菜单" width="680px">
		<el-form ref="form" :model="form" :rules="rules" label-width="100px">
			<el-row>
				<el-col :span="24">
					<el-form-item label="上级菜单">
						<!-- <treeselect :options="options" :show-count="true" placeholder="菜单?" /> -->
						<el-tree-select v-model="value" :data="data" check-strictly />

					</el-form-item>
				</el-col>

				<el-col :span="24">
					<el-form-item label="菜单类型" prop="menuType">
						<el-radio-group v-model="form.menuType" size="mini" style="width: 178px">
							<el-radio-button label="M">目录</el-radio-button>
							<el-radio-button label="C">菜单</el-radio-button>
							<el-radio-button label="F">按钮</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="24" v-if="form.menuType != 'F'">
					<el-form-item label="菜单图标" prop="icon">
						<el-popover placement="right" width="400" trigger="click">
							<el-button slot="reference">click 激活</el-button>
						</el-popover>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="菜单名称" prop="menuName">
						<el-input v-model="form.menuName" placeholder="请输入菜单名称" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="显示排序" prop="orderNum">
						<el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
					</el-form-item>
				</el-col>
				<el-col :span="8" v-if="form.menuType != 'F'">

					<el-form-item v-if="form.menuType != 'F'" label="外链菜单" prop="iframe">
						<el-radio-group v-model="form.iframe" size="mini">
							<el-radio-button label="0">是</el-radio-button>
							<el-radio-button label="1">否</el-radio-button>
						</el-radio-group>
					</el-form-item>



					<!-- 					<el-form-item>
						<span slot="label">
							<el-tooltip content="选择是外链则路由地址需要以`http(s)://`开头" placement="top">
								<i class="el-icon-question"></i>
							</el-tooltip>
							是否外链
						</span>
						<el-radio-group v-model="form.isFrame">
							<el-radio label="0">是</el-radio>
							<el-radio label="1">否</el-radio>
						</el-radio-group>
					</el-form-item> -->
				</el-col>
				<el-col :span="8" v-if="form.menuType == 'C'">
					<el-form-item label="菜单缓存" prop="isCache">
						<el-radio-group v-model="form.isCache" size="mini">
							<el-radio-button label="0">是</el-radio-button>
							<el-radio-button label="1">否</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="8" v-if="form.menuType != 'F'">
					<el-form-item label="菜单可见" prop="visible">
						<el-radio-group v-model="form.visible" size="mini">
							<el-radio-button label="0">是</el-radio-button>
							<el-radio-button label="1">否</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>


				<el-col :span="12" v-if="form.menuType != 'F'">
					<el-form-item v-if="form.menuType != 'F'" label="路由地址" prop="path">
						<el-input v-model="form.path" placeholder="路由地址" style="width: 178px;" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType == 'C'">
					<el-form-item label="组件名称" prop="componentName">
						<el-input v-model="form.componentName" style="width: 178px;" placeholder="匹配组件内Name字段" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType == 'C'">
					<el-form-item label="组件路径" prop="component">
						<el-input v-model="form.component" style="width: 178px;" placeholder="组件路径" />
					</el-form-item>
				</el-col>



			</el-row>
		</el-form>
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
		Switch
	} from "@element-plus/icons-vue"
	// import the component
	// import the styles
	// import Treeselect from 'vue3-treeselect'
	// import 'vue3-treeselect/dist/vue3-treeselect.css'
	export default {
		// components: {
		// 	Treeselect
		// },
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
				Switch: 'Switch',
				value: null,
				// define options
				data: [{
					value: '1',
					label: '系统管理',
					children: [{
						value: '11',
						label: '用户管理',
					}, {
						value: '12',
						label: '角色管理',
					}],
				}, {
					value: 'b',
					label: 'b',
				}, {
					value: 'c',
					label: 'c',
				}],
				value: '',
				// 是否显示弹出层
				open: false,
				// 表单参数
				form: {},

				enabledTypeOptions: [{
						key: 'true',
						display_name: '激活'
					},
					{
						key: 'false',
						display_name: '锁定'
					}
				],
			}
		},
		methods: {
			/** 新增按钮操作 */
			handleAdd(row) {
				this.open = true;

				// this.reset();
				// this.getTreeselect();
				// if (row != null && row.menuId) {
				//   this.form.parentId = row.menuId;
				// } else {
				//   this.form.parentId = 0;
				// }
				// this.open = true;
				// this.title = "添加菜单";
			},
			/** 修改按钮操作 */
			handleUpdate(title, row) {
				this.open = true;
				console.log(row)
				// this.reset();
				// this.getTreeselect();
				// getMenu(row.menuId).then(response => {
				//   this.form = response.data;
				//   this.open = true;
				//   this.title = "修改菜单";
				// });
			},
		},
		setup() {
			var menuList = [{
				menuId: '1',
				menuName: '系统管理',
				icon: '图标1',
				orderNum: '1000',
				componentpath: 'system',
				children: [{
						menuId: '11',
						menuName: '用户管理',
						icon: '',
						orderNum: '1001',
						componentpath: 'user',
					},
					{
						menuId: '12',
						menuName: '角色管理',
						icon: '',
						orderNum: '1002',
						componentpath: 'role'
					
					},
					{
						menuId: '13',
						menuName: '菜单管理',
						icon: '',
						orderNum: '1003',
						componentpath: 'menu'

					},
				]
			}, 
			{
				menuId: '21',
				menuName: '会议管理',
				icon: '',
				orderNum: '2001',
				componentpath: 'meeting'
			
			},]
			return {
				menuList
			}
		}
	}
</script>

<style>
	{
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.table-search {
		display: flex;
		margin-bottom: 10px;
	}

	.table-search .el-form {
		max-width: 1260px;
	}

	.table-search .search-operation {
		margin-left: 15px;
		white-space: nowrap;
	}

	.table-header .header-button-ri {
		float: right;
	}



	.el-pagination {
		display: flex;
		justify-content: flex-end;
		margin: 23px 0 10px;
	}
</style>

<style>
	.table-header .header-button-lf .el-button {
		margin-bottom: 20px;
	}
</style>
