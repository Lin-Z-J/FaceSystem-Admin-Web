import { asyncRoutes, constantRoutes } from '@/router';
import { searchUserMenu} from '@/api/router';
import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes';

const state = () => ({
  // routes: [],
  routes: constantRoutes,
  partialRoutes: [],
});
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
};
const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes);
  },
  SetConstantRoutes(state, routes){
    state.routes = routes;
  },
  setAllRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes);
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = constantRoutes.concat(routes);
  },
};
const actions = {
  
  // 前端控制路由 
  async setRoutes({ commit }, permissions) {
    //开源版只过滤动态路由permissions，admin不再默认拥有全部权限
    //异步理由:不同的用户（角色），需要过滤筛选出的路由，称之为异步路由
    const finallyAsyncRoutes = await filterAsyncRoutes([...asyncRoutes], permissions);
    commit('setRoutes', finallyAsyncRoutes);
    return finallyAsyncRoutes;
  },
  
  // 后端控制
  async setAllRoutes({ commit }) {
    // 请求路由的后端接口
    // let { data } = await getRouterList();
    
        let { data } = await searchUserMenu();
    
    // let data  = null;
    // console.log("菜单列表",data)
    // data.push({ path: '*', redirect: '/404', hidden: true });
    let accessRoutes = convertRouter(data);
    //设置基本路由
    commit('SetConstantRoutes', constantRoutes);
    //基本路由加后端路由
    commit('setAllRoutes', accessRoutes);
    return accessRoutes;
  },
  setPartialRoutes({ commit }, accessRoutes) {
    commit('setPartialRoutes', accessRoutes);
    return accessRoutes;
  },
};
export default { state, getters, mutations, actions };
