'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var collapse$1 = require('./src/collapse4.js');
var collapseItem$1 = require('./src/collapse-item4.js');
var collapse = require('./src/collapse3.js');
var collapseItem = require('./src/collapse-item3.js');
var install = require('../../utils/vue/install2.js');

const ElCollapse = install.withInstall(collapse$1["default"], {
  CollapseItem: collapseItem$1["default"]
});
const ElCollapseItem = install.withNoopInstall(collapseItem$1["default"]);

exports.collapseEmits = collapse.collapseEmits;
exports.collapseProps = collapse.collapseProps;
exports.emitChangeFn = collapse.emitChangeFn;
exports.collapseItemProps = collapseItem.collapseItemProps;
exports.ElCollapse = ElCollapse;
exports.ElCollapseItem = ElCollapseItem;
exports["default"] = ElCollapse;
//# sourceMappingURL=index2.js.map
