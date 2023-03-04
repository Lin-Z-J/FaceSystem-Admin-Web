import { defineComponent, h } from 'vue';
import '../../../hooks/index2.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index2.mjs';

var NodeContent = defineComponent({
  name: "NodeContent",
  setup() {
    const ns = useNamespace("cascader-node");
    return {
      ns
    };
  },
  render() {
    const { ns } = this;
    const { node, panel } = this.$parent;
    const { data, label } = node;
    const { renderLabelFn } = panel;
    return h("span", { class: ns.e("label") }, renderLabelFn ? renderLabelFn({ node, data }) : label);
  }
});

export { NodeContent as default };
//# sourceMappingURL=node-content2.mjs.map
