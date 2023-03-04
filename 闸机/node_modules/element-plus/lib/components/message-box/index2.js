'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var messageBox = require('./src/messageBox2.js');
require('./src/message-box.type2.js');

const _MessageBox = messageBox["default"];
_MessageBox.install = (app) => {
  _MessageBox._context = app._context;
  app.config.globalProperties.$msgbox = _MessageBox;
  app.config.globalProperties.$messageBox = _MessageBox;
  app.config.globalProperties.$alert = _MessageBox.alert;
  app.config.globalProperties.$confirm = _MessageBox.confirm;
  app.config.globalProperties.$prompt = _MessageBox.prompt;
};
const ElMessageBox = _MessageBox;

exports.ElMessageBox = ElMessageBox;
exports["default"] = _MessageBox;
//# sourceMappingURL=index2.js.map
