import '../../utils/index2.mjs';
import Select from './src/select2.mjs';
import Option from './src/option2.mjs';
import OptionGroup from './src/option-group2.mjs';
export { selectGroupKey, selectKey } from './src/token2.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install2.mjs';

const ElSelect = withInstall(Select, {
  Option,
  OptionGroup
});
const ElOption = withNoopInstall(Option);
const ElOptionGroup = withNoopInstall(OptionGroup);

export { ElOption, ElOptionGroup, ElSelect, ElSelect as default };
//# sourceMappingURL=index2.mjs.map
