'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
require('../../../../utils/index2.js');
require('../../../../hooks/index2.js');
var layoutObserver = require('../layout-observer2.js');
var util = require('../util2.js');
var tokens = require('../tokens2.js');
var renderHelper = require('./render-helper2.js');
var defaults = require('./defaults2.js');
var index = require('../../../../hooks/use-namespace/index2.js');
var style = require('../../../../utils/dom/style2.js');

var TableBody = vue.defineComponent({
  name: "ElTableBody",
  props: defaults["default"],
  setup(props) {
    const instance = vue.getCurrentInstance();
    const parent = vue.inject(tokens.TABLE_INJECTION_KEY);
    const ns = index.useNamespace("table");
    const { wrappedRowRender, tooltipContent, tooltipTrigger } = renderHelper["default"](props);
    const { onColumnsChange, onScrollableChange } = layoutObserver["default"](parent);
    vue.watch(props.store.states.hoverRow, (newVal, oldVal) => {
      if (!props.store.states.isComplex.value || !core.isClient)
        return;
      let raf = window.requestAnimationFrame;
      if (!raf) {
        raf = (fn) => window.setTimeout(fn, 16);
      }
      raf(() => {
        var _a;
        const rows = (_a = instance == null ? void 0 : instance.vnode.el) == null ? void 0 : _a.querySelectorAll(`.${ns.e("row")}`);
        const oldRow = rows[oldVal];
        const newRow = rows[newVal];
        if (oldRow) {
          style.removeClass(oldRow, "hover-row");
        }
        if (newRow) {
          style.addClass(newRow, "hover-row");
        }
      });
    });
    vue.onUnmounted(() => {
      var _a;
      (_a = util.removePopper) == null ? void 0 : _a();
    });
    vue.onUpdated(() => {
      var _a;
      (_a = util.removePopper) == null ? void 0 : _a();
    });
    return {
      ns,
      onColumnsChange,
      onScrollableChange,
      wrappedRowRender,
      tooltipContent,
      tooltipTrigger
    };
  },
  render() {
    const { wrappedRowRender, store } = this;
    const data = store.states.data.value || [];
    return vue.h("tbody", {}, [
      data.reduce((acc, row) => {
        return acc.concat(wrappedRowRender(row, acc.length));
      }, [])
    ]);
  }
});

exports["default"] = TableBody;
//# sourceMappingURL=index2.js.map
