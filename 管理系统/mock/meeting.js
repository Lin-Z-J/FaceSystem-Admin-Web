const data = [{
    meetingId: 1,
    meetingRoomName: "新会议室-001",
    address: '新大楼A栋',
    houseNumber: '203',
    date: '2022-06-16 12:00～13:00',
    theme: '软件204林照杰预定的会议',
    name: '林照杰',
    status: '已结束',
    Approvalstatus: '已审批',
  },


]

export default [
  
  {
    url: '/meeting/searchUserMeeting',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: data
      };
    },
  },
  {
    url: '/meeting/searchMeetingByPage',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
      };
    },
  },
  {
    url: '/meeting/deleteMeeting',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
      };
    },
  },
  {
    url: '/meeting/UpdateMeeting',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      };
    },
  },
  {
    url: '/meeting/createMeeting',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      };
    },
  },
  

];
