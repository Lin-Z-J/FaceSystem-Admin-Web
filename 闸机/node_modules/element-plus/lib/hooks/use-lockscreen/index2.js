'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
require('../../utils/index2.js');
var error = require('../../utils/error2.js');
var style = require('../../utils/dom/style2.js');
var scroll = require('../../utils/dom/scroll2.js');

const useLockscreen = (trigger) => {
  if (!vue.isRef(trigger)) {
    error.throwError("[useLockscreen]", "You need to pass a ref param to this function");
  }
  if (!core.isClient || style.hasClass(document.body, "el-popup-parent--hidden")) {
    return;
  }
  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let bodyPaddingRight = "0";
  let computedBodyPaddingRight = 0;
  const cleanup = () => {
    style.removeClass(document.body, "el-popup-parent--hidden");
    if (withoutHiddenClass) {
      document.body.style.paddingRight = bodyPaddingRight;
    }
  };
  vue.watch(trigger, (val) => {
    if (!val) {
      cleanup();
      return;
    }
    withoutHiddenClass = !style.hasClass(document.body, "el-popup-parent--hidden");
    if (withoutHiddenClass) {
      bodyPaddingRight = document.body.style.paddingRight;
      computedBodyPaddingRight = Number.parseInt(style.getStyle(document.body, "paddingRight"), 10);
    }
    scrollBarWidth = scroll.getScrollBarWidth();
    const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
    const bodyOverflowY = style.getStyle(document.body, "overflowY");
    if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
      document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarWidth}px`;
    }
    style.addClass(document.body, "el-popup-parent--hidden");
  });
  vue.onScopeDispose(() => cleanup());
};

exports.useLockscreen = useLockscreen;
//# sourceMappingURL=index2.js.map
