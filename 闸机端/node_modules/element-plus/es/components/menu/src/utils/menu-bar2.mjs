import MenuItem from './menu-item2.mjs';

class Menu {
  constructor(domNode, namespace) {
    this.domNode = domNode;
    this.init(namespace);
  }
  init(namespace) {
    const menuChildren = this.domNode.childNodes;
    Array.from(menuChildren).forEach((child) => {
      if (child.nodeType === 1) {
        new MenuItem(child, namespace);
      }
    });
  }
}

export { Menu as default };
//# sourceMappingURL=menu-bar2.mjs.map
