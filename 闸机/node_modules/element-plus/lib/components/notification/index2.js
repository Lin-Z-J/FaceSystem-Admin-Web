'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var notify = require('./src/notify2.js');
var notification = require('./src/notification3.js');
var install = require('../../utils/vue/install2.js');

const ElNotification = install.withInstallFunction(notify["default"], "$notify");

exports.notificationEmits = notification.notificationEmits;
exports.notificationProps = notification.notificationProps;
exports.notificationTypes = notification.notificationTypes;
exports.ElNotification = ElNotification;
exports["default"] = ElNotification;
//# sourceMappingURL=index2.js.map
