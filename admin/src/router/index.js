import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router';
import Layout from '@/layouts/index.vue';
import i18n from '@/locales';
import {netConfig} from '@/config/net.config.js'
const {
  global
} = i18n;
export const constantRoutes = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/index',
  //   name: 'Root',
  //   // hidden: true,
  //   children: [
  //     {
  //       path: '/index',
  //       name: 'Index',
  //       component: () => import('../views/index/index.vue'),
  //       meta: {
  //         title: global.t('route.home'),
  //         icon: 'icon-home',
  //         affix: true,
  //         noKeepAlive: true,
  //       },
  //     },
  //   ],
  // },
  
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/personal',
//     name: 'Root',
//     // hidden: true,
//     children: [
// {
//       path: '/personal',
//       name: 'Index',
//       component: () => import('../views/system/personal/index.vue'),
//       meta: {
//         title: '个人中心',
//         icon: 'icon-home',
//         // affix: true,
//         // noKeepAlive: true,
//       },
//     },
//     ],
//   },
  
  {
    // path: '/personal',
    component: Layout,
    // redirect: '/personal/index',
    name: 'Root',
    // hidden: true,
    children: [{
      path: '/personal',
      name: 'Index',
      component: () => import('../views/system/personal/index.vue'),
      meta: {
        title: '个人中心',
        icon: 'icon-home',
        // affix: true,
        // noKeepAlive: true,
      },
    }, ],
  },
      // {
      //   path: '/personal',
      //   name: '个人中心',
      //   component: () => import('../views/system/personal/index.vue'),
      //   meta: {
      //     // title: global.t('route.page404'),
      //     title:'个人中心',
      //     icon: 'icon-personal-privacy',
      //     // affix: true,
      //     // noKeepAlive: false,
      //   },
      // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
    hidden: true,
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/registerForm/index.vue'),
    meta: {
      title: '注册',
    },
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true,
  },
  // {
  //   path: '/personal',
  //   name: '个人中心',
  //   component: Layout,
  //   // redirect: '/myMeeting',
  //   // hidden: true,
  //   children: [
  //     {
  //       path: '/personal',
  //       name: '个人中心',
  //       component: () => import('../views/system/personal/index.vue'),
  //       meta: {
  //         // title: global.t('route.page404'),
  //         title:'个人中心',
  //         icon: 'icon-personal-privacy',
  //         // affix: true,
  //         // noKeepAlive: false,
  //       },
  //     },
  //   ],
  // },
  {
    // path: '/createMeeting',
    // name: '预定会议',
    component: Layout,
    // redirect: '/createMeeting/index',
    hidden: true,
    children: [{
      path: '/createMeeting',
      name: '预定会议',
      component: () => import('@/views/Page/createMeeting/index.vue'),
      meta: {
        // title: global.t('route.page404'),
        title: '预定会议',
        icon: 'icon-add-picture',
        // affix: true,
        // noKeepAlive: true,
      },
    }, ],
  },
  {
    // path: '/myMeeting',
    // name: '我的会议',
    component: Layout,
    // redirect: '/myMeeting',
    // hidden: true,
    children: [{
      path: '/myMeeting',
      name: '我的会议',
      component: () => import('@/views/Page/myMeeting/index.vue'),
      meta: {
        // title: global.t('route.page404'),
        title: '我的会议',
        icon: 'icon-me',
        // affix: true,
        // noKeepAlive: false,
      },
    }, 
    {
      path: '/meetingSignIn',
      name: '会议签到',
      hidden: true,
      component: () => import('@/views/Page/meetingSignInEcharts/index.vue'),
      meta: {
        // title: global.t('route.page404'),
        title:'会议签到',
        icon: 'icon-file-date-one',
        // affix: true,
        // noKeepAlive: false,
      },
    },
    
    ],
  },

  {
    path: '/fastMeeting',
    // name: '快速预定',
    component: Layout,
    hidden: true,
    children: [{
      path: '/fastMeeting/index',
      name: '快速预定',
      component: () => import('@/views/Page/fastMeeting/index.vue'),
      meta: {
        // title: global.t('route.page404'),
        title: '快速预定',
        icon: 'icon-table-report',
        // affix: true,
        // noKeepAlive: true,
      },
    }, ],
  },


  {
    path: '/meetingDetails',
    name: '会议详情',
    component: Layout,
    redirect: '/meetingDetails',
    hidden: true,
    children: [{
      path: '/meetingDetails',
      name: '会议详情',
      component: () => import('@/views/Page/myMeeting/meetingDetails.vue'),
      meta: {
        // title: global.t('route.page404'),
        title: '会议详情',
        icon: 'icon-doc-detail',
        // affix: true,
        // noKeepAlive: false,
      },
    }, ],
  },

  // {
  //   // path: '/meetingDetails',
  //   // name: '会议详情',
  //   component: Layout,
  //   // redirect: '/meetingDetails',
  //   hidden: true,
  //   children: [  {
  //   path: '/meetingSignIn',
  //   name: '会议签到',
  //   // hidden: true,
  //   component: () => import('@/views/Page/meetingSignInEcharts/index.vue'),
  //   meta: {
  //     // title: global.t('route.page404'),
  //     title: '会议签到',
  //     icon: 'icon-file-date-one',
  //     // affix: true,
  //     // noKeepAlive: false,
  //   },
  // },],
  // },


  // {
  //   path: '/meetingSignIn',
  //   name: '会议签到',
  //   hidden: true,
  //   component: () => import('@/views/Page/meetingSignInEcharts/index.vue'),
  //   meta: {
  //     // title: global.t('route.page404'),
  //     title: '会议签到',
  //     icon: 'icon-file-date-one',
  //     // affix: true,
  //     // noKeepAlive: false,
  //   },
  // },


  // {
  //   path: '/meetingSignIn',
  //   name: '会议签到',
  //   component: Layout,
  //   redirect: '/meetingSignIn',
  //   // hidden: true,
  //   children: [
  //     {
  //       path: '/meetingSignIn',
  //       name: '会议签到',
  //       component: () => import('@/views/Page/meetingSignInEcharts/index.vue'),
  //       meta: {
  //         // title: global.t('route.page404'),
  //         title:'会议签到',
  //         icon: 'icon-file-date-one',
  //         // affix: true,
  //         // noKeepAlive: false,
  //       },
  //     },
  //   ],
  // },

  // {
  //   path: '/faceInput',
  //   name: '参会人员人脸信息录入',
  //   component: Layout,
  //   redirect: '/faceInput',
  //   hidden: true,
  //   children: [{
  //     path: '/faceInput',
  //     name: '参会人员人脸信息录入',
  //     component: () => import('@/views/Page/meetingSignInEcharts/faceInput.vue'),
  //     meta: {
  //       // title: global.t('route.page404'),
  //       title: '参会人员人脸信息录入',
  //       icon: 'icon-user-positioning',
  //       // affix: true,
  //       // noKeepAlive: false,
  //     },
  //   }, ],
  // },
  {
    path: '/meetingPersonnel',
    name: '参会人员管理',
    component: Layout,
    redirect: '/meetingPersonnel',
    hidden: true,
    children: [{
      path: '/meetingPersonnel',
      name: '参会人员管理',
      component: () => import('@/views/Page/myMeeting/meetingPersonnel.vue'),
      meta: {
        // title: global.t('route.page404'),
        title: '参会人员管理',
        icon: 'icon-id-card-h',
        // affix: true,
        // noKeepAlive: false,
      },
    }, ],
  },
  {
    // name: '会议管理',
    // path: '/meeting',
    component: Layout,
    hidden: true,
    children: [{
        name: '会议管理',
        path: '/meeting',
        component: () => import('@/views/Page/meeting/meetingList.vue'),

        meta: {
          title: '会议管理',
          icon: 'icon-notepad'
        },
      },
      // {
      // 	name: '会议列表1',
      // 	path:'/meeting/meetingList1',
      //   component: () => import('@/views/Page/meeting/meetingList.vue'),
      // 	meta: {
      // 		title: '会议列表1',
      // 		  icon: 'icon-notepad'
      // 	},
      // },
    ]
  },
  {
    // name: '会议室管理',
    // path: '/meetingRoom',
    component: Layout,
    hidden: true,
    children: [{
        name: '会议室管理',
        path: '/meetingRoom',
        component: () => import('@/views/Page/meetingRoom/meetingRoomList.vue'),
        meta: {
          title: '会议室管理',
          icon: 'icon-city'
        },
      },
      // {
      // 	name: '会议室类型',
      // 	// path: 'use',
      // 	path: '/meetingRoom/meetingRoomType',
      // 	component: () => import('@/views/Page/meetingRoom/meetingRoomType.vue'),
      // 	meta: {
      // 		title: '会议室类型',
      // 		icon: 'icon-city'
      // 	},
      // },
    ]
  },

  // {
  //   // path: '/comp',
  //   component: Layout,
  //   name: 'Comp',
  //   hidden: true,
  //   meta: {
  //     title: '组件',
  //     icon: ''
  //   },
  //   children: [{
  //       path: '/iconPark',
  //       name: 'IconPark',
  //       // hidden: true,
  //       component: () => import('@/views/icon/index.vue'),
  //       meta: {
  //         title: '图标',
  //       },
  //     },

  //   ],
  // },


  {
    component: Layout,
    hidden: true,
    children: [{
        name: '人员管理',
        path: "/user",
        component: () => import('../views/system/user/index.vue'),
        meta: {
          title: '人员管理',
          icon: 'icon-people-search'
        },
      },
    ]
  },
  {
    component: Layout,
    hidden: true,
    children: [{
        name: '部门管理',
        path: "/department",
        component: () => import('../views/Page/department/index.vue'),
        meta: {
          title: '部门管理',
          icon: 'icon-people-search',
          // permissions:['管理员']
        },
      },
    ]
  },
  
  // {
  //   name: '系统管理',
  //   path: '/system',
  //   component: Layout,
  //   meta: {
  //     title: '系统管理',
  //     icon: 'icon-setting-two'
  //   },
  //   children: [{
  //       name: '用户管理',
  //       path: "/user",
  //       component: () => import('../views/system/user/index.vue'),
  //       meta: {
  //         title: '用户管理',
  //         icon: 'icon-people-search'
  //       },
  //     },
  //     {
  //       name: '角色管理',
  //       path: "/role",
  //       component: () => import('../views/system/role/index.vue'),
  //       meta: {
  //         title: '角色管理',
  //         icon: 'icon-data-user'
  //       },
  //     },
  //     {
  //       name: '菜单管理',
  //       path: "/menu",
  //       component: () => import('../views/system/menu/index.vue'),
  //       meta: {
  //         title: '菜单管理',
  //         icon: 'icon-notebook-one'
  //       },
  //     },
  //   ]
  // },

];

export const asyncRoutes = [{
    // path: '/comp',
    component: Layout,
    // name: 'Comp',
    hidden: true,
    meta: {
      title: global.t('route.components'),
      icon: 'icon-code'
    },
    children: [{
        path: '/element',
        name: 'ElementComp',
        component: () => import('@/views/element/index.vue'),
        meta: {
          title: global.t('route.eleComponents'),
          icon: 'icon-code',
        },
      },
      {
        path: '/iconPark',
        name: 'IconPark',
        component: () => import('@/views/icon/index.vue'),
        meta: {
          title: global.t('route.icons'),
          icon: 'icon-like',
        },
      },
      {
        path: '/chart',
        name: 'Chart',
        component: () => import('@/views/echarts/index.vue'),
        meta: {
          title: global.t('route.charts'),
          icon: 'icon-chart-line',
        },
        children: [{
            path: '/line',
            name: 'Line',
            component: () => import('@/views/echarts/line.vue'),
            meta: {
              title: global.t('route.lineChart'),
            },
          },
          {
            path: '/bar',
            name: 'Bar',
            component: () => import('@/views/echarts/bar.vue'),
            meta: {
              title: global.t('route.barChart'),
            },
          },
          {
            path: '/otherChart',
            name: 'OtherChart',
            component: () => import('@/views/echarts/other.vue'),
            meta: {
              title: global.t('route.mixedChart'),
            },
          },
        ],
      },
    ],
  },
  {
    // path: '/createMeeting',
    // name: '预定会议',
    component: Layout,
    // redirect: '/createMeeting/index',
    // hidden: true,
    children: [{
      path: '/createMeeting',
      name: '预定会议',
      component: () => import('@/views/Page/createMeeting/index.vue'),
      meta: {
        // title: global.t('route.page404'),
        title: '预定会议',
        icon: 'icon-add-picture',
        // affix: true,
        // noKeepAlive: true,
      },
    }, ],
  },
  {
    // name: '会议管理',
    // path: '/meeting',
    component: Layout,
    // hidden: true,
    
    children: [{
        name: '会议管理',
        path: '/meeting',
        component: () => import('@/views/Page/meeting/meetingList.vue'),

        meta: {
          title: '会议管理',
          icon: 'icon-notepad',
          // permissions:['管理员']
        },
      },
    ]
  },
  {
    // name: '会议室管理',
    // path: '/meetingRoom',
    component: Layout,
    // hidden: true,
    children: [{
        name: '会议室管理',
        path: '/meetingRoom',
        component: () => import('@/views/Page/meetingRoom/meetingRoomList.vue'),
        meta: {
          title: '会议室管理',
          icon: 'icon-city'
        },
      },
      // {
      // 	name: '会议室类型',
      // 	// path: 'use',
      // 	path: '/meetingRoom/meetingRoomType',
      // 	component: () => import('@/views/Page/meetingRoom/meetingRoomType.vue'),
      // 	meta: {
      // 		title: '会议室类型',
      // 		icon: 'icon-city'
      // 	},
      // },
    ]
  },
  
  {
    component: Layout,
    children: [{
        name: '人员管理',
        path: "/user",
        component: () => import('../views/system/user/index.vue'),
        meta: {
          title: '人员管理',
          icon: 'icon-people-search',
          // permissions:['管理员']
        },
      },
    ]
  },
  
  {
    component: Layout,
    children: [{
        name: '部门管理',
        path: "/department",
        component: () => import('../views/Page/department/index.vue'),
        meta: {
          title: '部门管理',
          icon: 'icon-alignment-bottom-center',
          // permissions:['管理员']
        },
      },
    ]
  },
  
  
  // {
  //   name: '系统管理',
  //   path: '/system',
  //   component: Layout,
  //   // hidden: true,
  //   meta: {
  //     title: '系统管理',
  //     icon: 'icon-setting-two',
  //     // permissions:['管理员']
  //   },
  //   children: [{
  //       name: '用户管理',
  //       path: "/user",
  //       component: () => import('../views/system/user/index.vue'),
  //       meta: {
  //         title: '用户管理',
  //         icon: 'icon-people-search',
  //         // permissions:['管理员']
  //       },
  //     },
  //     {
  //       name: '角色管理',
  //       path: "/role",
  //       component: () => import('../views/system/role/index.vue'),
  //       meta: {
  //         title: '角色管理',
  //         icon: 'icon-data-user',
  //         // permissions:['admin']
  //       },
  //     },
  //     {
  //       name: '菜单管理',
  //       path: "/menu",
  //       component: () => import('../views/system/menu/index.vue'),
  //       meta: {
  //         title: '菜单管理',
  //         icon: 'icon-notebook-one',
  //         // permissions:['admin']
  //       },
  //     },
  //   ]
  // },



  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true,
  // },
];

const router = createRouter({
  // history: createWebHistory(netConfig.baseURL),
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: constantRoutes,
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const {
      name
    } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
  //删除重置路由后，要加上基本路由
  constantRoutes.forEach((item) => {
    router.addRoute(item);
  });

}

export default router;
