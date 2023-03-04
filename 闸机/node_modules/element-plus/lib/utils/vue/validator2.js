'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../constants/index2.js');
var size = require('../../constants/size2.js');
var date = require('../../constants/date2.js');

const isValidComponentSize = (val) => ["", ...size.componentSizes].includes(val);
const isValidDatePickType = (val) => [...date.datePickTypes].includes(val);

exports.isValidComponentSize = isValidComponentSize;
exports.isValidDatePickType = isValidDatePickType;
//# sourceMappingURL=validator2.js.map
