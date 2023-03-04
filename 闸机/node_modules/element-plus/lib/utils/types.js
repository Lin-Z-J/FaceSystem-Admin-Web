'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var types = require('./types2.js');
var shared = require('@vue/shared');
var core = require('@vueuse/core');
var vue = require('vue');



exports.isElement = types.isElement;
exports.isEmpty = types.isEmpty;
exports.isPropAbsent = types.isPropAbsent;
exports.isUndefined = types.isUndefined;
Object.defineProperty(exports, 'isArray', {
	enumerable: true,
	get: function () { return shared.isArray; }
});
Object.defineProperty(exports, 'isDate', {
	enumerable: true,
	get: function () { return shared.isDate; }
});
Object.defineProperty(exports, 'isFunction', {
	enumerable: true,
	get: function () { return shared.isFunction; }
});
Object.defineProperty(exports, 'isObject', {
	enumerable: true,
	get: function () { return shared.isObject; }
});
Object.defineProperty(exports, 'isPromise', {
	enumerable: true,
	get: function () { return shared.isPromise; }
});
Object.defineProperty(exports, 'isString', {
	enumerable: true,
	get: function () { return shared.isString; }
});
Object.defineProperty(exports, 'isSymbol', {
	enumerable: true,
	get: function () { return shared.isSymbol; }
});
Object.defineProperty(exports, 'isBoolean', {
	enumerable: true,
	get: function () { return core.isBoolean; }
});
Object.defineProperty(exports, 'isNumber', {
	enumerable: true,
	get: function () { return core.isNumber; }
});
Object.defineProperty(exports, 'isVNode', {
	enumerable: true,
	get: function () { return vue.isVNode; }
});
//# sourceMappingURL=types.js.map
