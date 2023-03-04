'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var defaults = require('./defaults2.js');
require('./components/index2.js');
require('./constants/index2.js');
require('./directives/index2.js');
require('./hooks/index2.js');
require('./tokens/index2.js');
var makeInstaller = require('./make-installer2.js');
var dayjs = require('dayjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

const install = defaults["default"].install;
const version = defaults["default"].version;

exports["default"] = defaults["default"];
exports.makeInstaller = makeInstaller.makeInstaller;
Object.defineProperty(exports, 'dayjs', {
	enumerable: true,
	get: function () { return dayjs__default["default"]; }
});
exports.install = install;
exports.version = version;
//# sourceMappingURL=index2.js.map
