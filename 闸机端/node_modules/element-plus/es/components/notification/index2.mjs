import '../../utils/index2.mjs';
import notify from './src/notify2.mjs';
export { notificationEmits, notificationProps, notificationTypes } from './src/notification3.mjs';
import { withInstallFunction } from '../../utils/vue/install2.mjs';

const ElNotification = withInstallFunction(notify, "$notify");

export { ElNotification, ElNotification as default };
//# sourceMappingURL=index2.mjs.map
