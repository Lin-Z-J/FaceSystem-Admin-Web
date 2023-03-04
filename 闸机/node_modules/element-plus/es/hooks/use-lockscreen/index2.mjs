import { isRef, watch, onScopeDispose } from 'vue';
import { isClient } from '@vueuse/core';
import '../../utils/index2.mjs';
import { throwError } from '../../utils/error2.mjs';
import { hasClass, removeClass, getStyle, addClass } from '../../utils/dom/style2.mjs';
import { getScrollBarWidth } from '../../utils/dom/scroll2.mjs';

const useLockscreen = (trigger) => {
  if (!isRef(trigger)) {
    throwError("[useLockscreen]", "You need to pass a ref param to this function");
  }
  if (!isClient || hasClass(document.body, "el-popup-parent--hidden")) {
    return;
  }
  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let bodyPaddingRight = "0";
  let computedBodyPaddingRight = 0;
  const cleanup = () => {
    removeClass(document.body, "el-popup-parent--hidden");
    if (withoutHiddenClass) {
      document.body.style.paddingRight = bodyPaddingRight;
    }
  };
  watch(trigger, (val) => {
    if (!val) {
      cleanup();
      return;
    }
    withoutHiddenClass = !hasClass(document.body, "el-popup-parent--hidden");
    if (withoutHiddenClass) {
      bodyPaddingRight = document.body.style.paddingRight;
      computedBodyPaddingRight = Number.parseInt(getStyle(document.body, "paddingRight"), 10);
    }
    scrollBarWidth = getScrollBarWidth();
    const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
    const bodyOverflowY = getStyle(document.body, "overflowY");
    if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
      document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarWidth}px`;
    }
    addClass(document.body, "el-popup-parent--hidden");
  });
  onScopeDispose(() => cleanup());
};

export { useLockscreen };
//# sourceMappingURL=index2.mjs.map
