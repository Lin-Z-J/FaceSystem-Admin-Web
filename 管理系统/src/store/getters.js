const getters = {
  username:(state) => state.user.username,
  avatar: (state) => state.user.avatar,
  faceUrl: (state) => state.user.faceUrl,
  token: (state) => state.user.token,
  collapse: (state) => state.setting.collapse,
  fullScreen: (state) => state.setting.fullScreen,
};
export default getters;
