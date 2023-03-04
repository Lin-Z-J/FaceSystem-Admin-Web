import '../../utils/index2.mjs';
import ConfigProvider from './src/config-provider2.mjs';
export { configProviderProps, messageConfig } from './src/config-provider2.mjs';
import { withInstall } from '../../utils/vue/install2.mjs';

const ElConfigProvider = withInstall(ConfigProvider);

export { ElConfigProvider, ElConfigProvider as default };
//# sourceMappingURL=index2.mjs.map
