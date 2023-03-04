import request from '@/utils/request.js';

// 导出会议参会情况
export const downloadUserModel = () => {
  return request({
    url: '/meeting/downloadUserModel',
    method: 'get',
  });
};



// 导出会议参会情况
export const download = (meetingid) => {
  return request({
    url: '/meeting/download',
    method: 'get',
    params: {
      meetingid
    }
  });
};



//代签
export const signByAdmin = (userid,meetingid) => {
  return request({
    url: '/meeting/signByAdmin',
    method: 'get',
    params: {
      userid,
      meetingid
    }
  });
};
//改未签
export const deleteSignByAdmin = (userid,meetingid) => {
  return request({
    url: '/meeting/deleteSignByAdmin',
    method: 'get',
    params: {
      userid,
      meetingid
    }
  });
};
//查询

//模糊查找会议中已签到的用户

export const searchUserSateOKByWant= (meetingid,username) => {
  return request({
    url: '/meeting/searchUserSateOKByWant',
    method: 'get',
    params: {
      meetingid,
      username
    }
  });
};
// 模糊查找会议中未签到的用户

export const searchUserSateNOByWant = (meetingid,username) => {
  return request({
    url: '/meeting/searchUserSateNOByWant',
    method: 'get',
    params: {
      meetingid,
      username
    }
  });
};
//查找参加会议用户的签到状态
export const searchUserSateOK = (meetingid) => {
  return request({
    url: '/meeting/searchUserSateOK',
    method: 'get',
    params: {
      meetingid
    }
  });
};

//查找参加会议用户的未签到状态
export const searchUserSateNO = (meetingid) => {
  return request({
    url: '/meeting/searchUserSateNO',
    method: 'get',
    params: {
      meetingid
    }
  });
};

//查找参加会议的用户
export const searchUserMessage = (meetingid) => {
  return request({
    url: '/meeting/searchUserMessage',
    method: 'get',
    params: {
      meetingid
    }
  });
};


// 高级查询会议
export const searchMeeting = (data) => {
  return request({
    url: '/meeting/searchMeeting',
    method: 'post',
    data
  });
};
// 模糊查找用户信息、创建或参加的全部会议
export const searchUserMeetingByWant = (data) => {
  return request({
    url: '/meeting/searchUserMeetingByWant',
    method: 'post',
    data
  });
};

// 查找用户信息、创建或参加的全部会议
export const searchUserMeeting = () => {
  return request({
    url: '/meeting/searchUserMeeting',
    method: 'get',
  });
};

// 分页查询用户创建或参加的全部会议
export const searchAllMeeting = () => {
  return request({
    url: '/meeting/searchAllMeeting',
    method: 'get',
  });
};

// 分页查询用户创建或参加的全部会议
export const searchMeetingByPage = (page, row) => {
  return request({
    url: '/meeting/searchMeetingByPage',
    method: 'get',
    params: {
      page,
      row
    }
  });
};

//查询单个会议的全部信息
export const searchSingleMeeting = (meetingid) => {
  return request({
    url: '/meeting/searchSingleMeeting',
    method: 'get',
    params: {
      meetingid
    }
  });
};

//查询单个会议的主持人信息
export const searchHost= (meetingid) => {
  return request({
    url: '/meeting/searchHost',
    method: 'get',
    params: {
      meetingid
    }
  });
};


//插入用户
export const insertUserMeeting = (data) => {
  return request({
    url: '/user/insertUserMeeting',
    method: 'post',
    data
  });
};



// 插入会议室
export const insertRoomMeeting = (data) => {
  return request({
    url: '/room/insertRoomMeeting',
    method: 'post',
    data
  });
};

export const updateRoomMeeting = (room_name,meetingid) => {
  return request({
    url: '/room/updateRoomMeeting',
    method: 'get',
    params: {
      room_name,
      meetingid
    }
  });
};



export const createMeeting = (data) => {
  return request({
    url: '/meeting/createMeeting',
    method: 'post',
    data,
  });
};

export const UpdateMeeting = (data) => {
  return request({
    url: '/meeting/updateMeeting',
    method: 'post',
    data
  });
};
export const deleteMeeting = (meetingid) => {
  return request({
    url: '/meeting/deleteMeeting',
    method: 'get',
    params: {
      meetingid
    }
  });
};
