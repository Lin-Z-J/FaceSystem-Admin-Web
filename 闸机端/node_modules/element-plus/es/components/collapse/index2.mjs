import '../../utils/index2.mjs';
import Collapse from './src/collapse4.mjs';
import CollapseItem from './src/collapse-item4.mjs';
export { collapseEmits, collapseProps, emitChangeFn } from './src/collapse3.mjs';
export { collapseItemProps } from './src/collapse-item3.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install2.mjs';

const ElCollapse = withInstall(Collapse, {
  CollapseItem
});
const ElCollapseItem = withNoopInstall(CollapseItem);

export { ElCollapse, ElCollapseItem, ElCollapse as default };
//# sourceMappingURL=index2.mjs.map
