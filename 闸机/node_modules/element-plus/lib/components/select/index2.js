'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var select = require('./src/select2.js');
var option = require('./src/option2.js');
var optionGroup = require('./src/option-group2.js');
var token = require('./src/token2.js');
var install = require('../../utils/vue/install2.js');

const ElSelect = install.withInstall(select["default"], {
  Option: option["default"],
  OptionGroup: optionGroup["default"]
});
const ElOption = install.withNoopInstall(option["default"]);
const ElOptionGroup = install.withNoopInstall(optionGroup["default"]);

exports.selectGroupKey = token.selectGroupKey;
exports.selectKey = token.selectKey;
exports.ElOption = ElOption;
exports.ElOptionGroup = ElOptionGroup;
exports.ElSelect = ElSelect;
exports["default"] = ElSelect;
//# sourceMappingURL=index2.js.map
