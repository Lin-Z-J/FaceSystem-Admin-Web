<template>
  <!--  -->
  <el-form ref="queryForm" :inline="true">
    <el-form-item label="部门名称:" prop="departmentName">
      <el-input placeholder="请输入部门名称" v-model="searchParam.departmentName" clearable />
    </el-form-item>
    <el-form-item label="地址:" prop="addr">
      <el-input placeholder="请输入地址" v-model="searchParam.addr" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="OnSearchSubmit">
        <icon-search></icon-search>搜索
      </el-button>
      <!--      <el-button :icon="Delete" size="mini" @click="resetQuery">
        <icon-delete-themes></icon-delete-themes>重置
      </el-button> -->
    </el-form-item>
  </el-form>
  <!--  -->
  <div class="table-header">
    <div class="header-button-lf">
      <el-button type="primary" plain @click="handleAdd1()"><icon-plus></icon-plus>新增</el-button>
      <!-- <el-button type="info" plain size="mini" @click="toggleExpandAll">展开/折叠</el-button> -->
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
    <el-table
      height="565"
      :data="
        departmentsList.slice(
          (this.pageable.currentPage - 1) * this.pageable.pageSize,
          this.pageable.currentPage * this.pageable.pageSize
        )
      "
      style="width: 100%"
      border
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- <el-table-column type="selection" reserve-selection width="80" /> -->
      <el-table-column :show-overflow-tooltip="true" label="部门名称" width="" prop="partname" />
      <!-- <el-table-column prop="icon" label="图标" align="center" width="60px"> </el-table-column> -->
      <!-- <el-table-column prop="orderNum" align="center" label="排序"> </el-table-column> -->
      <el-table-column :show-overflow-tooltip="true" prop="addr" label="地址" />
      <el-table-column label="操作" fixed="right" width="320" v-slot="scope">
        <el-button type="primary" link @click="handleAddDepartment(scope.row)">
          <icon-plus></icon-plus>新增
        </el-button>
        <el-button type="primary" link @click="handleUpdateDepartment(scope.row)">
          <icon-pencil></icon-pencil>编辑
        </el-button>
        <el-button type="primary" link @click="deleteDepartment(scope.row)">
          <icon-delete-five></icon-delete-five>删除
        </el-button>
        <!-- <span v-if="!BUTTONS.view && !BUTTONS.edit && !BUTTONS.reset && !BUTTONS.delete">--</span> -->
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="pageable.currentPage"
      v-model:page-size="pageable.pageSize"
      :page-sizes="[10, 25, 50, 100]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageable.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>

  <!-- 添加对话框 -->
  <el-dialog v-model="addOpen1" title="新增部门" width="680px">
    <el-form ref="addform1" :model="addForm1" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <!--          <el-form-item label="上级部门">
            <treeselect :options="options" :show-count="true" placeholder="菜单?" />
            <el-tree-select v-model="value" :data="data" check-strictly />
          </el-form-item> -->
          <el-form-item label="上级部门">
            <el-tree-select
              v-model="addDepartmentname"
              :data="departmentsDataOptions"
              default-expand-all
              @node-click="ADDhandleNodeClick"
              @check="currentChecked"
            />
          </el-form-item>
        </el-col>

        <!--        <el-col :span="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="form.menuType" size="mini" style="width: 178px">
              <el-radio-button label="M">目录</el-radio-button>
              <el-radio-button label="C">菜单</el-radio-button>
              <el-radio-button label="F">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
        <!--        <el-col :span="24" v-if="form.menuType != 'F'">
          <el-form-item label="菜单图标" prop="icon">
            <el-popover placement="right" width="400" trigger="click">
              <el-button slot="reference">click 激活</el-button>
            </el-popover>
          </el-form-item>
        </el-col> -->

        <el-col :span="12">
          <el-form-item label="部门名称" prop="partname">
            <el-input v-model="addForm1.partname" placeholder="请输入部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地址" prop="addr">
            <el-input v-model="addForm1.addr" placeholder="请输入地址" />
          </el-form-item>
        </el-col>
        <!--        <el-col :span="12">
          <el-form-item label="显示排序" prop="orderNum">
            <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
          </el-form-item>
        </el-col> -->
        <!--        <el-col :span="8" v-if="form.menuType != 'F'">
          <el-form-item v-if="form.menuType != 'F'" label="外链菜单" prop="iframe">
            <el-radio-group v-model="form.iframe" size="mini">
              <el-radio-button label="0">是</el-radio-button>
              <el-radio-button label="1">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
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
        </el-col> -->

        <!--        <el-col :span="12" v-if="form.menuType != 'F'">
          <el-form-item v-if="form.menuType != 'F'" label="路由地址" prop="path">
            <el-input v-model="form.path" placeholder="路由地址" style="width: 178px" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.menuType == 'C'">
          <el-form-item label="组件名称" prop="componentName">
            <el-input
              v-model="form.componentName"
              style="width: 178px"
              placeholder="匹配组件内Name字段"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.menuType == 'C'">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="form.component" style="width: 178px" placeholder="组件路径" />
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addOpen1 = false">取消</el-button>
        <el-button type="primary" @click="submitAddDepartment1('addform1')">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 添加对话框2 -->
  <el-dialog v-model="addDepartmentOpen" title="新增部门" width="680px">
    <el-form ref="addform2" :model="addaddDepartmentOpenForm" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级部门">
            <!--            <el-tree-select
              v-model="Updatepartname"
              :data="departmentsDataOptions"
              default-expand-all
              @node-click="handleNodeClick"
              @check="currentChecked"
            /> -->
            <el-input v-model="addDepartmentname2" :disabled="true"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门名称" prop="partname">
            <el-input v-model="addaddDepartmentOpenForm.partname" placeholder="请输入部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地址" prop="addr">
            <el-input v-model="addForm1.addr" placeholder="请输入地址" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDepartmentOpen = false">取消</el-button>
        <el-button type="primary" @click="submitAddDepartment2('addform2')">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 修改对话框 -->
  <el-dialog v-model="UpdateOpen" title="修改部门" width="680px">
    <el-form ref="form" :model="UpdateForm" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级部门">
            <el-tree-select
              v-model="UpdateFormDepartment"
              :data="departmentsDataOptions"
              default-expand-all
              @node-click="handleNodeClick"
              @check="currentChecked"
            />
            <!-- <el-input v-model="UpdateFormDepartment" :disabled="true"> </el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门名称" prop="menuName">
            <el-input v-model="UpdateForm.partname" placeholder="请输入部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地址" prop="menuName">
            <el-input v-model="UpdateForm.addr" placeholder="请输入地址" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="UpdateOpen = false">取消</el-button>
        <el-button type="primary" @click="submitUpdateDepartment()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
  // import the component
  // import the styles
  // import Treeselect from 'vue3-treeselect'
  // import 'vue3-treeselect/dist/vue3-treeselect.css'

  import {
    insertUserDepartment,
    deleteUserDepartment,
    searchDeptAndUserByWant,
    searchDeptAndUser,
    addDeptByAdmin,
    updateDept,
    deleteDeptByAdmin,
  } from '@/api/department.js';
  export default {
    // components: {
    // 	Treeselect
    // },
    data() {
      return {
        searchParam: {
          departmentName: '',
          addr: '',
        },
        // 分页
        pageable: {
          // 当前页数
          currentPage: 1,
          // 每页显示个数
          pageSize: 10,
          // 总条目数
          total: 0,
        },
        value: null,
        departmentsList: [],
        departmentsDataOptions: [],
        // Updatepartname: '',
        addDepartmentname: '',
        addDepartmentname2: '',
        addDepartmentid: '',
        //修改的部门
        UpdateFormDepartment: '',
        // 是否显示弹出层
        addOpen1: false,
        addDepartmentOpen: false,
        UpdateOpen: false,
        // 表单参数
        addForm1: {
          partname: '',
          addr: '',
          addDepartmentname: '',
        },
        addaddDepartmentOpenForm: {},
        UpdateForm: {},
        enabledTypeOptions: [
          {
            key: 'true',
            display_name: '激活',
          },
          {
            key: 'false',
            display_name: '锁定',
          },
        ],
        rules: {
          partname: [
            {
              required: true,
              message: '请输入部门名称',
              trigger: 'blur',
            },
          ],
        },
      };
    },
    mounted() {
      this.OnSearchSubmit();
    },
    methods: {
      getTreeData1(obj, arrT) {
        obj.forEach((item, index) => {
          let obj = {
            id: item.id,
            partname: item.partname,
            addr: item.addr,
            introduce: item.introduce,
            parentid: item.parentid,
            // departments: [],
            users: item.users,
            children: [],
          };
          arrT.push(obj);
          //对其children再次执行getTreeData()函数
          if (item.departments) this.getTreeData1(item.departments, obj.children);
        });
      },
      getTreeData2(obj, arrT) {
        obj.forEach((item, index) => {
          let obj = {
            value: item.id,
            label: item.partname,
            children: [],
          };
          arrT.push(obj);
          //对其children再次执行getTreeData()函数
          if (item.departments) this.getTreeData2(item.departments, obj.children);
        });
      },
      ADDhandleNodeClick(node) {
        // console.log('data', data);
        // console.log('node.value', node.value);
        // console.log('node.label', node.label);
        // console.log('partname', this.partname);
        this.addDepartmentname = node.label;
        this.addDepartmentid = node.value;
      },
      OnSearchSubmit() {
        let data = {
          // id: 32
          // introduce: null,
          // parentid: null,
          addr: this.searchParam.addr,
          partname: this.searchParam.departmentName,
        };
        searchDeptAndUserByWant(data).then((response) => {
          this.departmentsList = [];
          this.departmentsDataOptions = [];
          // console.log('模糊查询部门用户', response);
          this.getTreeData1(response.data, this.departmentsList);
          this.getTreeData2(response.data, this.departmentsDataOptions);
          this.pageable.total = this.departmentsList.length;
        });
      },
      toggleExpandAll() {},
      //新增1
      handleAdd1() {
        this.addOpen1 = true;
      },
      submitAddDepartment1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ElMessageBox.confirm('是否确定修改?', '系统提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(() => {
                this.addForm1.parentid = this.addDepartmentid;

                let add = {
                  partname: this.addForm1.partname,
                  addr: this.addForm1.addr,
                  parentid: this.addDepartmentid,
                };

                // console.log('新增部门数据', this.addForm1);
                addDeptByAdmin(add).then((response) => {
                  this.addDepartmentname = '';
                  this.addDepartmentid = '';
                  this.OnSearchSubmit();
                  // console.log('新增部门成功', response);
                  ElMessage({
                    showClose: true,
                    message: '新增成功',
                    type: 'success',
                  });
                  this.addOpen1 = false;
                });
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: '已取消',
                });
              });
          } else {
            ElMessage({
              showClose: true,
              message: '请检查输入是否正确！',
              type: 'error',
            });

            return false;
          }
        });
      },
      /** 新增2按钮操作 */
      handleAddDepartment(row) {
        // console.log('新增父部门数据数据', row);
        this.addDepartmentOpen = true;
        this.addaddDepartmentOpenForm.parentid = row.id;
        this.addDepartmentname2 = row.partname;
      },
      submitAddDepartment2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ElMessageBox.confirm('是否确定修改?', '系统提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(() => {
                // console.log('新增部门数据2', this.addaddDepartmentOpenForm);
                addDeptByAdmin(this.addaddDepartmentOpenForm).then((response) => {
                  this.addDepartmentname2 = '';
                  this.addaddDepartmentOpenForm = {};
                  this.OnSearchSubmit();
                  // console.log('新增部门成功2', response);
                  ElMessage({
                    showClose: true,
                    message: '新增成功',
                    type: 'success',
                  });

                  this.addDepartmentOpen = false;
                });
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: '已取消',
                });
              });
          } else {
            ElMessage({
              showClose: true,
              message: '请检查输入是否正确！',
              type: 'error',
            });

            return false;
          }
        });
      },
      /** 修改按钮操作 */
      handleUpdateDepartment(row) {
        this.UpdateOpen = true;
        // console.log('修改的数据', row);
        this.UpdateForm = row;
        // 修改的父部门怎
        // this.UpdateFormDepartment=this.UpdateForm.partname
      },
      submitUpdateDepartment() {
        // console.log('提交修改的数据', this.UpdateForm);
        let UpdateData = {
          addr: this.UpdateForm.addr,
          id: this.UpdateForm.id,
          introduce: this.UpdateForm.introduce,
          parentid: this.UpdateForm.parentid,
          partname: this.UpdateForm.partname,
          users: this.UpdateForm.users,
        };
        updateDept(this.UpdateForm).then((response) => {
          this.UpdateFormDepartment = '';
          this.OnSearchSubmit();
          // console.log(response);
          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
          });
        });
        this.UpdateOpen = false;
      },
      //删除
      deleteDepartment(row) {
        let departmentid = row.id;
        // console.log('row', row);
        ElMessageBox.confirm('是否确定删除?', '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            deleteDeptByAdmin(departmentid).then((response) => {
              this.OnSearchSubmit();
              // console.log('删除成功', response);
              ElMessage({
                showClose: true,
                message: '删除成功',
                type: 'success',
              });
            });
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            });
          });
      },
      //分页
      handleSizeChange: function (size) {
        this.pageable.pageSize = size;
      },
      handleCurrentChange: function (currentPage) {
        this.pageable.currentPage = currentPage;
      },
    },
  };
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
