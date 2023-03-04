import '../../utils/index2.mjs';
import { addResizeListener, removeResizeListener } from '../../utils/dom/resize-event2.mjs';

const Resize = {
  beforeMount(el, binding) {
    el._handleResize = () => {
      var _a;
      el && ((_a = binding.value) == null ? void 0 : _a.call(binding, el));
    };
    addResizeListener(el, el._handleResize);
  },
  beforeUnmount(el) {
    removeResizeListener(el, el._handleResize);
  }
};

export { Resize as default };
//# sourceMappingURL=index2.mjs.map
