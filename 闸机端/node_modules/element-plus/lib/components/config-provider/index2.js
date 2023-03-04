'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var configProvider = require('./src/config-provider2.js');
var install = require('../../utils/vue/install2.js');

const ElConfigProvider = install.withInstall(configProvider["default"]);

exports.configProviderProps = configProvider.configProviderProps;
exports.messageConfig = configProvider.messageConfig;
exports.ElConfigProvider = ElConfigProvider;
exports["default"] = ElConfigProvider;
//# sourceMappingURL=index2.js.map
