'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./src/index2.js');
var directive = require('./src/directive2.js');

index["default"].install = (app) => {
  app.component(index["default"].name, index["default"]);
};
directive["default"].install = (app) => {
  app.directive(directive.VPopover, directive["default"]);
};
const _PopoverDirective = directive["default"];
index["default"].directive = _PopoverDirective;
const _Popover = index["default"];
const ElPopover = _Popover;
const ElPopoverDirective = _PopoverDirective;

exports.ElPopover = ElPopover;
exports.ElPopoverDirective = ElPopoverDirective;
exports["default"] = _Popover;
//# sourceMappingURL=index2.js.map
