/**
 * @author hujiangjun 1217437592@qq.com
 * @description 路由控制
 */
import router from '@/router';
import store from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {
  getPageTitle
} from '@/utils/index';
import {
  setting
} from '@/config/setting';

import {
  getAccessToken,
} from '@/utils/accessToken';
const {
  authentication,
  loginInterception,
  progressBar,
  routesWhiteList,
  recordRoute
} = setting;

import Cookies from 'js-cookie';
NProgress.configure({
  easing: 'ease',
  speed: 500, //递增进度条的速度
  trickleSpeed: 200, // 自动递增间隔
  showSpinner: false, // 是否显示加载ico
});
router.beforeEach(async (to, from, next) => {
  if (progressBar) NProgress.start();


  //不能从store里面拿，刷新没了

  // let hasToken = store.getters['user/accessToken'];
  let hasToken = getAccessToken()
  // console.log(hasToken)
  // console.log(getAccessToken())
  // console.log(Cookies.get('token'))

  // console.log("permiss")
  // console.log(hasToken)
  
  // console.log("permiss")
  // let hasToken = '123';


  //loginInterception是否开启登录拦截
  //如果loginInterception不等于true hasToken = true;
  // if (!loginInterception) hasToken = true;



  if (hasToken) {
   

    if (to.path === '/login') {
      next({
        path: '/personal'
      });
      if (progressBar) NProgress.done();
    } else {
      const hasPermissions =
        store.getters['user/permissions'] && store.getters['user/permissions'].length > 0;
      if (hasPermissions) {
        next();
      } else {
        try {
          //为设置路由 指定permissions
          let permissions;
          //如果loginInterception不等于true 执行
          if (!loginInterception) {
            //settings.js loginInterception为false时，创建虚拟权限
            await store.dispatch('user/setPermissions', ['admin']);
            permissions = ['admin'];
          } else {
            //settings.js loginInterception为true时，创建后台permissions权限
            permissions = await store.dispatch('user/getUserInfo');
            // permissions =['admin'];
          }

          // intelligence 前端控制路由 
          // all 后端控制
          let accessRoutes = [];
          if (authentication === 'intelligence') {
            // intelligence 前端控制路由 
            if(permissions.indexOf('管理员')!== -1){
              accessRoutes = await store.dispatch('routes/setRoutes', permissions);
            }
            // accessRoutes = await store.dispatch('routes/setRoutes', permissions);
            
          } else if (authentication === 'all') {
            // all 后端控制
            //需要更改 加permissions 向后台发送 然后获取相应路由信息
            // accessRoutes = awlet hasToken=ait store.dispatch('routes/setAllRoutes');
          }
          // accessRoutes.forEach((item) => {
          //   router.addRoute(item);
          // });
          next({
            ...to,
            replace: true
          });
        } catch {
          await store.dispatch('user/resetAccessToken');
          if (progressBar) NProgress.done();
        }
      }
    }
  } else {

    // 免登录路由
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // //token失效回退到登录页时是否记录本次的路由
      // if (recordRoute) {
      //   console.log(to.path)
      //   next(`/login?redirect=${to.path}`);
      // } else {
      //   next('/login');
      // }
      //直接通过
      next('/login');
      if (progressBar) NProgress.done();
    }
  }


















  // if (to.path === '/login') {
  //   next()


  // } else {
  //   if (hasToken) {



  //     const hasPermissions =
  //       store.getters['user/permissions'] && store.getters['user/permissions'].length > 0;
  //     if (hasPermissions) {
  //       next();
  //     } else {

  //         //为设置路由 指定permissions
  //         let permissions;
  //         permissions = await store.dispatch('user/getUserInfo');
  //         next({
  //           ...to,
  //           replace: true
  //         });

  //     }

  //     // next()

  //   } else {
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   }
  // }







  document.title = getPageTitle(to.meta.title);
});
router.afterEach(() => {
  if (progressBar) NProgress.done();
});
