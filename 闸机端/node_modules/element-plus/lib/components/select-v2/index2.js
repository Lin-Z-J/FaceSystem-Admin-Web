'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var select = require('./src/select2.js');
var token = require('./src/token2.js');

select["default"].install = (app) => {
  app.component(select["default"].name, select["default"]);
};
const _Select = select["default"];
const ElSelectV2 = _Select;

exports.selectV2InjectionKey = token.selectV2InjectionKey;
exports.ElSelectV2 = ElSelectV2;
exports["default"] = _Select;
//# sourceMappingURL=index2.js.map
