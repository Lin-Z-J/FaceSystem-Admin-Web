import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'

import router from './router/index.js'

import ElementPlus from 'element-plus'


createApp(App).use(router).use(ElementPlus).mount('#app')
