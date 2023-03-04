import { makeInstaller } from './make-installer2.mjs';
import Components from './component2.mjs';
import Plugins from './plugin2.mjs';

var installer = makeInstaller([...Components, ...Plugins]);

export { installer as default };
//# sourceMappingURL=defaults2.mjs.map
