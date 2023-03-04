'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var space = require('./src/space2.js');
var useSpace = require('./src/use-space2.js');
var install = require('../../utils/vue/install2.js');

const ElSpace = install.withInstall(space["default"]);

exports.spaceProps = space.spaceProps;
exports.useSpace = useSpace.useSpace;
exports.ElSpace = ElSpace;
exports["default"] = ElSpace;
//# sourceMappingURL=index2.js.map
