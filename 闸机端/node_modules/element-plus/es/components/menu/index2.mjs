import '../../utils/index2.mjs';
import Menu from './src/menu2.mjs';
export { menuEmits, menuProps } from './src/menu2.mjs';
import MenuItem from './src/menu-item4.mjs';
import MenuItemGroup from './src/menu-item-group4.mjs';
import SubMenu from './src/sub-menu2.mjs';
export { subMenuProps } from './src/sub-menu2.mjs';
export { menuItemEmits, menuItemProps } from './src/menu-item3.mjs';
export { menuItemGroupProps } from './src/menu-item-group3.mjs';
import './src/types2.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install2.mjs';

const ElMenu = withInstall(Menu, {
  MenuItem,
  MenuItemGroup,
  SubMenu
});
const ElMenuItem = withNoopInstall(MenuItem);
const ElMenuItemGroup = withNoopInstall(MenuItemGroup);
const ElSubMenu = withNoopInstall(SubMenu);

export { ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu, ElMenu as default };
//# sourceMappingURL=index2.mjs.map
