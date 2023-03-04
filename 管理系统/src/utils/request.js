import axios from 'axios';
import { netConfig } from '@/config/net.config';
const { baseURL, contentType, invalidCode, noPermissionCode, requestTimeout, successCode } =
  netConfig;
import store from '@/store/index.js';
import router from '@/router/index.js';
import { ElMessageBox, ElMessage } from 'element-plus';
import qs from 'qs';
import { setting } from '@/config/setting';
const { tokenName } = setting;
import {
  getAccessToken,
} from '@/utils/accessToken';

// eslint-disable-next-line no-unused-vars
let tokenLose = true;

/**
 *
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case invalidCode:
      tokenLose = false;
      ElMessageBox.confirm('您已掉线，或者访问权限出错，请重新登录！', '重新登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 处理重新登录逻辑
        })
        .catch(() => {
          tokenLose = true;
        });
      break;
    case noPermissionCode:
      router.push({ path: '/401' }).catch(() => {});
      break;
    default:
      console.log('---');
      ElMessage.error(msg || `后端接口${code}异常`);
      break;
  }
};

// const request = axios.create({
//   baseURL,
//   timeout: requestTimeout,
//   // headers: {
//   //   'Content-Type': contentType,
//   // },

// 	// headers: {
// 	// 	'Content-Type': 'application/json',
// 	// 	'X-Requested-With': 'XMLHttpRequest'
// 	// },
// })
// // 请求相关处理 请求拦截 在请求拦截中可以补充请求相关的配置
// // interceptors axios的拦截器对象
// request.interceptors.request.use(config => {
// 	// config 请求的所有信息
// 	// console.log(config);
// 	config.headers['token'] = getAccessToken();

// 	return config // 将配置完成的config对象返回出去 如果不返回 请求讲不会进行
// }, err => {
// 	// 请求发生错误时的相关处理 抛出错误
// 	Promise.reject(err)
// })
// request.interceptors.response.use(res => {
// 	// 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
// 	// res 是所有相应的信息
// 	// console.log(res)
// 	return Promise.resolve(res)
// }, err => {
// 	// 服务器响应发生错误时的处理
// 	Promise.reject(err)
// })
// export default request
























axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  // headers: {
  //   'Content-Type': contentType,
  // },
});

instance.interceptors.request.use(
  (config) => {
    
    // console.log(config.headers[tokenName])
    config.headers['token'] = getAccessToken();
    // console.log(getAccessToken())
    // if (store.getters['user/accessToken']) {
    //   // config.headers[tokenName] = store.getters['user/accessToken'];
    //   // config.headers[tokenName] = getAccessToken();
    // }
    // if (
    //   config.data &&
    //   config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'
    // )
      // config.data = qs.stringify(config.data);
      // console.log("wangc")
      // console.log(config.headers[tokenName])
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { data } = response;
    const { code, msg } = data;

    // 操作成功
    if (successCode.indexOf(code) !== -1) {
      return res;
    } else {
      console.log('---====', response);
      handleCode(code, msg);
      return Promise.reject();
    }
  },
  (error) => {
    const { response, message } = error;
    console.log(error);
    if (error.response && error.response.data) {
      const { status, data } = response;
      console.log('---===1222=', response);
      handleCode(status, data.msg || message);
      return Promise.reject(error);
    } else {
      let { message } = error;
      if (message === 'Network Error') {
        message = '后端接口连接异常';
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时';
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3);
        console.log('---===2244=', response);
        message = '后端接口' + code + '异常';
      }
      console.log('---===224ee4=', response);
      ElMessage.error(message || `后端接口未知异常`);
      return Promise.reject(error);
    }
  }
);
// instance.defaults.withCredentials = true;
export default instance;
