'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var menuItem = require('./menu-item2.js');

class Menu {
  constructor(domNode, namespace) {
    this.domNode = domNode;
    this.init(namespace);
  }
  init(namespace) {
    const menuChildren = this.domNode.childNodes;
    Array.from(menuChildren).forEach((child) => {
      if (child.nodeType === 1) {
        new menuItem["default"](child, namespace);
      }
    });
  }
}

exports["default"] = Menu;
//# sourceMappingURL=menu-bar2.js.map
