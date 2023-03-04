'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var container = require('./src/container2.js');
var aside = require('./src/aside2.js');
var footer = require('./src/footer2.js');
var header = require('./src/header2.js');
var main = require('./src/main2.js');
var install = require('../../utils/vue/install2.js');

const ElContainer = install.withInstall(container["default"], {
  Aside: aside["default"],
  Footer: footer["default"],
  Header: header["default"],
  Main: main["default"]
});
const ElAside = install.withNoopInstall(aside["default"]);
const ElFooter = install.withNoopInstall(footer["default"]);
const ElHeader = install.withNoopInstall(header["default"]);
const ElMain = install.withNoopInstall(main["default"]);

exports.ElAside = ElAside;
exports.ElContainer = ElContainer;
exports.ElFooter = ElFooter;
exports.ElHeader = ElHeader;
exports.ElMain = ElMain;
exports["default"] = ElContainer;
//# sourceMappingURL=index2.js.map
