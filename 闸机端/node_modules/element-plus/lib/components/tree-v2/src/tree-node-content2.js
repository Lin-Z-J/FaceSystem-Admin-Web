'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../hooks/index2.js');
var virtualTree = require('./virtual-tree2.js');
var index = require('../../../hooks/use-namespace/index2.js');

var ElNodeContent = vue.defineComponent({
  name: "ElTreeNodeContent",
  props: virtualTree.treeNodeContentProps,
  setup(props) {
    const tree = vue.inject(virtualTree.ROOT_TREE_INJECTION_KEY);
    const ns = index.useNamespace("tree");
    return () => {
      const node = props.node;
      const { data } = node;
      return (tree == null ? void 0 : tree.ctx.slots.default) ? tree.ctx.slots.default({ node, data }) : vue.h("span", { class: ns.be("node", "label") }, [node == null ? void 0 : node.label]);
    };
  }
});

exports["default"] = ElNodeContent;
//# sourceMappingURL=tree-node-content2.js.map
