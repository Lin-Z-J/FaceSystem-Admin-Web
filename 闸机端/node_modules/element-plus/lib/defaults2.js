'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var makeInstaller = require('./make-installer2.js');
var component = require('./component2.js');
var plugin = require('./plugin2.js');

var installer = makeInstaller.makeInstaller([...component["default"], ...plugin["default"]]);

exports["default"] = installer;
//# sourceMappingURL=defaults2.js.map
