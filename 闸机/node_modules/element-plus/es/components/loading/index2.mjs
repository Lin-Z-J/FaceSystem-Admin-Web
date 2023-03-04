import { Loading } from './src/service2.mjs';
export { Loading as ElLoadingService } from './src/service2.mjs';
import { vLoading } from './src/directive2.mjs';
export { vLoading as ElLoadingDirective, vLoading } from './src/directive2.mjs';
import './src/types2.mjs';

const ElLoading = {
  install(app) {
    app.directive("loading", vLoading);
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading
};

export { ElLoading, ElLoading as default };
//# sourceMappingURL=index2.mjs.map
