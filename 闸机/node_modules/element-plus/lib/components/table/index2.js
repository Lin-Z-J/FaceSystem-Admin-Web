'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var table = require('./src/table2.js');
require('./src/tableColumn2.js');
var install = require('../../utils/vue/install2.js');
var index = require('./src/table-column/index2.js');

const ElTable = install.withInstall(table["default"], {
  TableColumn: index["default"]
});
const ElTableColumn = install.withNoopInstall(index["default"]);

exports.ElTable = ElTable;
exports.ElTableColumn = ElTableColumn;
exports["default"] = ElTable;
//# sourceMappingURL=index2.js.map
