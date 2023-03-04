import request from '@/utils/request.js';

//
export const searchDepartmentUsersByWant = (partname) => {
  return request({
    url: '/department/searchDepartmentUsersByWant',
    method: 'get',
    params: {
      partname
    }
  });
};

// 查找全部部门下的全部用户
export const searchDepartmentUsers = () => {
  return request({
    url: '/department/searchDepartmentUsers',
    method: 'get',
  });
};


export const insertUserDepartment = (userid, department) => {
  return request({
    url: '/department/insertUserDepartment',
    method: 'get',
    params: {
      userid,
      department
    }
  });
};
//删除用户部门
export const deleteUserDepartment = (userid, department) => {
  return request({
    url: '/department/deleteUserDepartment',
    method: 'get',
    params: {
      userid,
      department
    }
  });
};
// 新
// 管理员-创建部门
export const addDeptByAdmin = (data) => {
  return request({
    url: '/department/addDeptByAdmin',
    method: 'post',
    data
  });
};

// 管理员-修改部门信息
export const updateDept = (data) => {
  return request({
    url: '/department/updateDept',
    method: 'post',
    data
  });
};

// 管理员-删除部门
export const deleteDeptByAdmin = (departmentid) => {
  return request({
    url: '/department/deleteDeptByAdmin',
    method: 'get',
    params: {
      departmentid
    }
  });
};
//模糊查找部门下的全部用户
export const searchDeptAndUser = () => {
  return request({
    url: '/department/searchDeptAndUser',
    method: 'get',
  });
};

//
export const searchDeptAndUserByWant = (data) => {
  return request({
    url: '/department/searchDeptAndUserByWant',
    method: 'post',
    data
  });
};
