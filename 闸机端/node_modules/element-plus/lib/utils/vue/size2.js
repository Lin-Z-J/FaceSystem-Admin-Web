'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../constants/index2.js');
var size = require('../../constants/size2.js');

const getComponentSize = (size$1) => {
  return size.componentSizeMap[size$1 || "default"];
};

exports.getComponentSize = getComponentSize;
//# sourceMappingURL=size2.js.map
