import '../../constants/index2.mjs';
import { componentSizeMap } from '../../constants/size2.mjs';

const getComponentSize = (size) => {
  return componentSizeMap[size || "default"];
};

export { getComponentSize };
//# sourceMappingURL=size2.mjs.map
