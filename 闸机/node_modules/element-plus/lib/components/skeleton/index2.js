'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var skeleton$1 = require('./src/skeleton4.js');
var skeletonItem$1 = require('./src/skeleton-item4.js');
var skeleton = require('./src/skeleton3.js');
var skeletonItem = require('./src/skeleton-item3.js');
var install = require('../../utils/vue/install2.js');

const ElSkeleton = install.withInstall(skeleton$1["default"], {
  SkeletonItem: skeletonItem$1["default"]
});
const ElSkeletonItem = install.withNoopInstall(skeletonItem$1["default"]);

exports.skeletonProps = skeleton.skeletonProps;
exports.skeletonItemProps = skeletonItem.skeletonItemProps;
exports.ElSkeleton = ElSkeleton;
exports.ElSkeletonItem = ElSkeletonItem;
exports["default"] = ElSkeleton;
//# sourceMappingURL=index2.js.map
