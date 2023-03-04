const data = [
  // {
  //   path: '/errorPage',
  //   name: 'ErrorPage',
  //   component: '',
  //   hidden: true,
  //   meta: {
  //     title: '首页',
  //     icon: 'home',
  //     // 解析：默认false，如果设置为true，那么它会固定在tags-view中。
  //     // affix: true,
  //     // affix:false,
  //     // 缓存组件
  //     // noKeepAlive: true,
  //     // noKeepAlive:false,
  //   },
  //   children: [
  //     {
  //       path: '/404Page',
  //       name: '404Page',
  //      component: '',
  //       meta: {
  //        title: '首页',
  //        icon: 'home',
  //        // affix: true,
  //        // affix:false,
  //        // noKeepAlive: true,
  //       },
  //     },
  //     {
  //       path: '/401Page',
  //       name: '401Page',
  //       component: '',
  //       meta: {
  //         title: '首页',
  //         icon: 'home',
  //         // affix: true,
  //         // noKeepAlive: true,
  //       },
  //     },
  //   ],
  // },
  {
    // path: '/comp',
    // component: '',
    name: 'Comp',
    // hidden: true,
    meta: {
      title: '组件',
      icon: ''
    },
    children: [{
      path: '/iconPark',
      name: 'IconPark',
       // hidden: true,
      // component: '',
      meta: {
        title: '图标',
      },
    },
        {
          path: '/element',
          name: 'ElementComp',
          // hidden: true,
          meta: {
            title: 'element',
            icon: 'icon-code',
          },
        },
   
   ],
  },
  
  // {
  //     path: '/comp',
  //     component: Layout,
  //     name: 'Comp',
  //     // hidden: true,
  //     // meta: { title: global.t('route.components'), icon: 'icon-code' },
  //     children: [
  //       {
  //         path: '/element',
  //         name: 'ElementComp',
  //         // component: () => import('@/views/element/index.vue'),
  //         meta: {
  //           // title: global.t('route.eleComponents'),
  //           icon: 'icon-code',
  //         },
  //       },

  //     ],
  //   },
  {
  	name: '会议管理',
  	path: '/meeting',
    meta: {
      title: '会议管理',
      icon: 'icon-setting-two'
    },
  	children: [
      
      {
  		name: '会议列表',
  		path:'/meeting/meetingList',
  		meta: {
  			title: '会议列表',
  			  icon: 'icon-notepad'
  		},
  	},
    // {
    // 	name: '会议列表1',
    // 	path:'/meeting/meetingList1',
    // 	meta: {
    // 		title: '会议列表1',
    // 		  icon: 'icon-notepad'
    // 	},
    // },
    ]
  },
  {
    name: '会议室管理',
    path: '/meetingRoom',
    meta: {
      title: '会议室管理',
      icon: 'icon-setting-two'
    },
    children: [{
      name: '会议室列表',
      path: "/meetingRoom/meetingRoomList",

      meta: {
        title: '会议室列表',
       icon: 'icon-city'
      },
    }]
  },
  {
    name: '系统管理',
    path: '/system',
    meta: {
      title: '系统管理',
      icon: 'icon-setting-two'
    },
    children: [{
        name: '用户管理',
        path: "/user",
        // hidden: true,
        meta: {
          title: '用户管理',
          icon: 'icon-people-search'
        },
      },
      {
        name: '角色管理',
        path: "/role",
        meta: {
          title: '角色管理',
          icon: 'icon-data-user'
        },
      },
      {
        name: '菜单管理',
        path: "/menu",
        meta: {
          title: '菜单管理',
          icon: 'icon-notebook-one'
        },
      },
    ]
  },
];
export default [{
  url: '/user/searchUserMenu',
  type: 'get',
  response() {
    return {
      code: 200,
      msg: '路由success',
      data: data
    };
  },
}, ];
