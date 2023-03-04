import request from '@/utils/request.js';

export const searchUserMenu = () => {
  return request({
    url: '/user/searchUserMenu',
    method: 'get',
  });
};
