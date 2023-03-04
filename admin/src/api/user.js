import request from '@/utils/request.js';
import {
  setting
} from '@/config/setting';
const {
  tokenName
} = setting;
export const login = async (data) => {
  return request({
    // url: '/login',
    url: '/loRe/login',
    method: 'post',
    data,
  });
};

export const logout = () => {
  return request({
    url: '/loRe/logout',
    method: 'get',
  });
};
//验证新用户
export const preinsertUser = async (email) => {
  return request({
    url: '/user/preinsertUser',
    method: 'get',
    params: {email}
  });
};
export const register = (data,departmentid) => {
  return request({
    url: '/user/insertUser',
    method: 'post',
    data,
    params: {
      departmentid
    }
  });
};
// ==================================
// export const getUserInfo = (accessToken) => {
//   return request({
//     url: '/userInfo',
//     method: 'get',
//     data: {
//       [tokenName]: accessToken,
//     },
//   });
// };

//用户信息info
export const searchOneUser = () => {
  return request({
    url: '/user/searchOneUser',
    method: 'get',
  });
};

export const updatePassword = (data) => {
  return request({
    url: '/user/updatePassword',
    method: 'post',
    data
  });
};
//

export const updateUser = (data) => {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  });
};
// 用户头像上传
export const uploadHead = (data) => {
  return request({
    url: '/user/uploadHead',
    method: 'post',
    data,
  });
};
//人脸表单上传
export const uploadFace1 = (data) => {
  return request({
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    url: '/user/uploadFace1',
    method: 'post',
    data,
  });
};


// 用户人脸上传-base46
export const uploadFace2 = (data) => {
  return request({
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    url: '/user/uploadFace2',
    method: 'post',
    data,
  });
};


// 用户注册人脸上传-base46
export const uploadFaceEmail = (data) => {
  return request({
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    url: '/user/uploadFaceEmail',
    method: 'post',
    data,
  });
};





// ==========================
// 查询用户列表
export function listUser(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}



// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/user/' + parseStrEmpty(userId),
    method: 'get'
  })
}

// 修改用户
// export function updateUser(data) {
//   return request({
//     url: '/system/user',
//     method: 'put',
//     data: data
//   })
// }

// 删除用户
export function delUser(userId) {
  return request({
    url: '/system/user/' + userId,
    method: 'delete'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data: data
  })
}
