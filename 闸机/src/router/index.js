import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { defineAsyncComponent } from 'vue'; //异步组挂载器
const routes= [
    {
      path: "/",
      component: defineAsyncComponent(() => import('../views/border.vue'))
    }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes // short for `routes: routes`
})
export default router