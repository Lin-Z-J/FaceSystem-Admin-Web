'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var arrays = require('./arrays2.js');
var lodashUnified = require('lodash-unified');



exports.castArray = arrays.castArray;
exports.unique = arrays.unique;
Object.defineProperty(exports, 'ensureArray', {
	enumerable: true,
	get: function () { return lodashUnified.castArray; }
});
//# sourceMappingURL=arrays.js.map
