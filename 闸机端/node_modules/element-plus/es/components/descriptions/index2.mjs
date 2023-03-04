import '../../utils/index2.mjs';
import Descriptions from './src/index2.mjs';
import DescriptionsItem from './src/description-item2.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install2.mjs';

const ElDescriptions = withInstall(Descriptions, {
  DescriptionsItem
});
const ElDescriptionsItem = withNoopInstall(DescriptionsItem);

export { ElDescriptions, ElDescriptionsItem, ElDescriptions as default };
//# sourceMappingURL=index2.mjs.map
