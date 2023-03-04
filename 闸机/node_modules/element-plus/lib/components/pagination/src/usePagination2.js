'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../tokens/index2.js');
var pagination = require('../../../tokens/pagination2.js');

const usePagination = () => vue.inject(pagination.elPaginationKey, {});

exports.usePagination = usePagination;
//# sourceMappingURL=usePagination2.js.map
