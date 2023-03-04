'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var autocomplete$1 = require('./src/autocomplete4.js');
var autocomplete = require('./src/autocomplete3.js');
var install = require('../../utils/vue/install2.js');

const ElAutocomplete = install.withInstall(autocomplete$1["default"]);

exports.autocompleteEmits = autocomplete.autocompleteEmits;
exports.autocompleteProps = autocomplete.autocompleteProps;
exports.ElAutocomplete = ElAutocomplete;
exports["default"] = ElAutocomplete;
//# sourceMappingURL=index2.js.map
