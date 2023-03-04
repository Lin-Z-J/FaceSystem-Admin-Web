import { isClient } from '@vueuse/core';

const isFirefox = () => isClient && /firefox/i.test(window.navigator.userAgent);

export { isFirefox };
//# sourceMappingURL=browser2.mjs.map
