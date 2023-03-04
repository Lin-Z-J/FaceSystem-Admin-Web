import request from '@/utils/request.js';

// 

export const searchFreeRoom = (data) => {
  return request({
    url: '/room/searchFreeRoom',
    method: 'post',
    data
  });
};

export const searchRoomByWant = (data) => {
  return request({
    url: '/room/searchRoomByWant',
    method: 'post',
    data
  });
};
//查找参加会议的用户
export const searchRoom = () => {
  return request({
    url: '/room/searchRoom',
    method: 'get',
  });
};


export const addMeetingRoom = (data) => {
  return request({
    url: '/room/addMeetingRoom',
    method: 'post',
    data
  });
};
export const updateRoom = (data) => {
  return request({
    url: '/room/updateRoom',
    method: 'post',
    data
  });
};

export const deleteRoom = (roomid) => {
  return request({
    url: '/room/deleteRoom',
    method: 'get',
    params: {
      roomid
    }
  });
};
