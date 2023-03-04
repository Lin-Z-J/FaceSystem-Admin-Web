'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var pagination = require('./src/pagination2.js');
var install = require('../../utils/vue/install2.js');

const ElPagination = install.withInstall(pagination["default"]);

exports.paginationEmits = pagination.paginationEmits;
exports.paginationProps = pagination.paginationProps;
exports.ElPagination = ElPagination;
exports["default"] = ElPagination;
//# sourceMappingURL=index2.js.map
