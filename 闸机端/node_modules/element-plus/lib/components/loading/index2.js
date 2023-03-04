'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var service = require('./src/service2.js');
var directive = require('./src/directive2.js');
require('./src/types2.js');

const ElLoading = {
  install(app) {
    app.directive("loading", directive.vLoading);
    app.config.globalProperties.$loading = service.Loading;
  },
  directive: directive.vLoading,
  service: service.Loading
};

exports.ElLoadingService = service.Loading;
exports.ElLoadingDirective = directive.vLoading;
exports.vLoading = directive.vLoading;
exports.ElLoading = ElLoading;
exports["default"] = ElLoading;
//# sourceMappingURL=index2.js.map
