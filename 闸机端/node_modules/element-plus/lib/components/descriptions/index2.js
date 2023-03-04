'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var index = require('./src/index2.js');
var descriptionItem = require('./src/description-item2.js');
var install = require('../../utils/vue/install2.js');

const ElDescriptions = install.withInstall(index["default"], {
  DescriptionsItem: descriptionItem["default"]
});
const ElDescriptionsItem = install.withNoopInstall(descriptionItem["default"]);

exports.ElDescriptions = ElDescriptions;
exports.ElDescriptionsItem = ElDescriptionsItem;
exports["default"] = ElDescriptions;
//# sourceMappingURL=index2.js.map
