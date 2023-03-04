import { defineComponent, getCurrentInstance, inject, watch, onUnmounted, onUpdated, h } from 'vue';
import { isClient } from '@vueuse/core';
import '../../../../utils/index2.mjs';
import '../../../../hooks/index2.mjs';
import useLayoutObserver from '../layout-observer2.mjs';
import { removePopper } from '../util2.mjs';
import { TABLE_INJECTION_KEY } from '../tokens2.mjs';
import useRender from './render-helper2.mjs';
import defaultProps from './defaults2.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index2.mjs';
import { removeClass, addClass } from '../../../../utils/dom/style2.mjs';

var TableBody = defineComponent({
  name: "ElTableBody",
  props: defaultProps,
  setup(props) {
    const instance = getCurrentInstance();
    const parent = inject(TABLE_INJECTION_KEY);
    const ns = useNamespace("table");
    const { wrappedRowRender, tooltipContent, tooltipTrigger } = useRender(props);
    const { onColumnsChange, onScrollableChange } = useLayoutObserver(parent);
    watch(props.store.states.hoverRow, (newVal, oldVal) => {
      if (!props.store.states.isComplex.value || !isClient)
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
          removeClass(oldRow, "hover-row");
        }
        if (newRow) {
          addClass(newRow, "hover-row");
        }
      });
    });
    onUnmounted(() => {
      var _a;
      (_a = removePopper) == null ? void 0 : _a();
    });
    onUpdated(() => {
      var _a;
      (_a = removePopper) == null ? void 0 : _a();
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
    return h("tbody", {}, [
      data.reduce((acc, row) => {
        return acc.concat(wrappedRowRender(row, acc.length));
      }, [])
    ]);
  }
});

export { TableBody as default };
//# sourceMappingURL=index2.mjs.map
