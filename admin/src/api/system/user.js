import request from '@/utils/request.js';
// 查询所有用户信息
export const searchAllUser = () => {
  return request({
    url: '/user/searchAllUser',
    method: 'get',
  });
};



// 模糊查询用户信息
export const searchUser = (data) => {
  return request({
    url: '/user/searchUser',
    method: 'post',
    data
  });
};
// 高级模糊查询用户信息
export const searchAllUserByWant = (data) => {
  return request({
    url: '/user/searchAllUserByWant',
    method: 'post',
    data
  });
};

// 新增用户信息
export const powerinsertUser= (data) => {
  return request({
    url: '/user/ApowerinsertUser',
    method: 'post',
    data,
    
  });
};

export const insertUsers1 = (data,meetingid) => {
  return request({
    url: '/user/insertUsers1',
    method: 'post',
    data,
    params: {
      meetingid
    }
  });
};
export const insertUsers2 = (data,meetingid) => {
  return request({
    url: '/user/insertUsers2',
    method: 'post',
    data,
    params: {
      meetingid
    }
  });
};

// 修改用户信息
export const powerupdateUser = (data) => {
  return request({
    url: '/user/powerupdateUser',
    method: 'post',
    data
  });
};
// 修改用户密码信息
export const powerupdatePassword = (data) => {
  return request({
    url: '/user/powerupdatePassword',
    method: 'post',
    data
  });
};

export const deleteUserByAdmin = (userid) => {
  return request({
    url: '/user/deleteUserByAdmin',
    method: 'get',
    params: {
      userid
    }
  });
};


// 管理员修改用户信息
export const updateUserByAdmin = (data) => {
  return request({
    url: '/user/updateUserByAdmin',
    method: 'post',
    data
  });
};
// 管理员新增用户信息
export const insertUser = (data,departmentid) => {
  return request({
    url: '/user/insertUser',
    method: 'post',
    data,
    params: {
      departmentid
    }
  });
};
//管理员-重置用户人脸
export const reSetFace = (userid) => {
  return request({
    url: '/user/reSetFace',
    method: 'post',
    params: {
      userid
    }
  });
};
