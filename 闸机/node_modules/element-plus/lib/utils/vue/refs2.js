'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../types2.js');
var shared = require('@vue/shared');

const composeRefs = (...refs) => {
  return (el) => {
    refs.forEach((ref) => {
      if (shared.isFunction(ref)) {
        ref(el);
      } else {
        ref.value = el;
      }
    });
  };
};

exports.composeRefs = composeRefs;
//# sourceMappingURL=refs2.js.map
