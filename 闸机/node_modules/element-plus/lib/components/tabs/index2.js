'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index2.js');
var tabs = require('./src/tabs.js');
var tabPane$1 = require('./src/tab-pane4.js');
var tabBar = require('./src/tab-bar3.js');
var tabNav = require('./src/tab-nav.js');
var tabPane = require('./src/tab-pane3.js');
var install = require('../../utils/vue/install2.js');

const ElTabs = install.withInstall(tabs["default"], {
  TabPane: tabPane$1["default"]
});
const ElTabPane = install.withNoopInstall(tabPane$1["default"]);

exports.tabsEmits = tabs.tabsEmits;
exports.tabsProps = tabs.tabsProps;
exports.tabBarProps = tabBar.tabBarProps;
exports.tabNavProps = tabNav.tabNavProps;
exports.tabPaneProps = tabPane.tabPaneProps;
exports.ElTabPane = ElTabPane;
exports.ElTabs = ElTabs;
exports["default"] = ElTabs;
//# sourceMappingURL=index2.js.map
