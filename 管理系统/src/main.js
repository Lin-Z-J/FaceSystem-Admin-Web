import { createApp } from 'vue';

// permission 权限文件
import './config/permission';

// element
import 'element-plus/theme-chalk/display.css';
// element theme change

import App from './App.vue';
const app = createApp(App);

import { VueClipboard } from '@soerenmartius/vue3-clipboard';
app.use(VueClipboard);

// layout components
import layoutComp from './layouts/components/export';
layoutComp(app);



// router
import router from './router/index';
app.use(router);

// vuex
import store from '@/store';
app.use(store);

// 按需注册方式
// import elementPlus from './plugin/el-comp';
// 注册 elementPlus组件/插件
// elementPlus(app);

// // 完整引入
//设置中文
import elementPlus from 'element-plus'
import locale from "element-plus/lib/locale/lang/zh-cn"; 
app.use(elementPlus,{locale})




// 注册字节跳动图标
import iconPark from './plugin/icon-park';
iconPark(app);

import loadI18n from './plugin/i18n';
loadI18n(app);

app.mount('#app');
  
import {netConfig} from '@/config/net.config.js'
// console.log(process.env.BASE_API)
// console.log(process.env.NODE_ENV)
// console.log(netConfig.baseURL)
// console.log(process.env.VITE_APP_BASEAPI)
