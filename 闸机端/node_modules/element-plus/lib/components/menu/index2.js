'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var menu = require('./src/menu2.js');
var menuItem$1 = require('./src/menu-item4.js');
var menuItemGroup$1 = require('./src/menu-item-group4.js');
var subMenu = require('./src/sub-menu2.js');
var menuItem = require('./src/menu-item3.js');
var menuItemGroup = require('./src/menu-item-group3.js');
require('./src/types2.js');
var install = require('../../utils/vue/install2.js');

const ElMenu = install.withInstall(menu["default"], {
  MenuItem: menuItem$1["default"],
  MenuItemGroup: menuItemGroup$1["default"],
  SubMenu: subMenu["default"]
});
const ElMenuItem = install.withNoopInstall(menuItem$1["default"]);
const ElMenuItemGroup = install.withNoopInstall(menuItemGroup$1["default"]);
const ElSubMenu = install.withNoopInstall(subMenu["default"]);

exports.menuEmits = menu.menuEmits;
exports.menuProps = menu.menuProps;
exports.subMenuProps = subMenu.subMenuProps;
exports.menuItemEmits = menuItem.menuItemEmits;
exports.menuItemProps = menuItem.menuItemProps;
exports.menuItemGroupProps = menuItemGroup.menuItemGroupProps;
exports.ElMenu = ElMenu;
exports.ElMenuItem = ElMenuItem;
exports.ElMenuItemGroup = ElMenuItemGroup;
exports.ElSubMenu = ElSubMenu;
exports["default"] = ElMenu;
//# sourceMappingURL=index2.js.map
