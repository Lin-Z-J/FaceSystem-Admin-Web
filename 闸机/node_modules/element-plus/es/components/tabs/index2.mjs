import '../../utils/index2.mjs';
import Tabs from './src/tabs.mjs';
export { tabsEmits, tabsProps } from './src/tabs.mjs';
import TabPane from './src/tab-pane4.mjs';
export { tabBarProps } from './src/tab-bar3.mjs';
export { tabNavProps } from './src/tab-nav.mjs';
export { tabPaneProps } from './src/tab-pane3.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install2.mjs';

const ElTabs = withInstall(Tabs, {
  TabPane
});
const ElTabPane = withNoopInstall(TabPane);

export { ElTabPane, ElTabs, ElTabs as default };
//# sourceMappingURL=index2.mjs.map
