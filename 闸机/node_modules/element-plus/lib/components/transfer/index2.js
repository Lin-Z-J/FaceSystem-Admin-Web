'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./src/index2.js');
require('./src/transfer2.js');

index["default"].install = (app) => {
  app.component(index["default"].name, index["default"]);
};
const _Transfer = index["default"];
const ElTransfer = _Transfer;

exports.ElTransfer = ElTransfer;
exports["default"] = _Transfer;
//# sourceMappingURL=index2.js.map
