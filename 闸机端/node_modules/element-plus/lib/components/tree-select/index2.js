'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var treeSelect = require('./src/tree-select2.js');

treeSelect["default"].install = (app) => {
  app.component(treeSelect["default"].name, treeSelect["default"]);
};
const _TreeSelect = treeSelect["default"];
const ElTreeSelect = _TreeSelect;

exports.ElTreeSelect = ElTreeSelect;
exports["default"] = _TreeSelect;
//# sourceMappingURL=index2.js.map
