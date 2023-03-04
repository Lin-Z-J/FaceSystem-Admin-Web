'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tree = require('./src/tree2.js');

tree["default"].install = (app) => {
  app.component(tree["default"].name, tree["default"]);
};
const _Tree = tree["default"];
const ElTree = _Tree;

exports.ElTree = ElTree;
exports["default"] = _Tree;
//# sourceMappingURL=index2.js.map
