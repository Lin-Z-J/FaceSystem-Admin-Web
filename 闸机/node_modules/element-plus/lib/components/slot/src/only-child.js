'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var shared = require('@vue/shared');
require('../../../hooks/index2.js');
require('../../../utils/index2.js');
var index = require('../../../hooks/use-forward-ref/index2.js');
var error = require('../../../utils/error2.js');

const NAME = "ElOnlyChild";
const OnlyChild = vue.defineComponent({
  name: NAME,
  setup(_, {
    slots,
    attrs
  }) {
    var _a;
    const forwardRefInjection = vue.inject(index.FORWARD_REF_INJECTION_KEY);
    const forwardRefDirective = index.useForwardRefDirective((_a = forwardRefInjection == null ? void 0 : forwardRefInjection.setForwardRef) != null ? _a : shared.NOOP);
    return () => {
      var _a2;
      const defaultSlot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots, attrs);
      if (!defaultSlot)
        return null;
      if (defaultSlot.length > 1) {
        error.debugWarn(NAME, "requires exact only one valid child.");
        return null;
      }
      const firstLegitNode = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) {
        error.debugWarn(NAME, "no valid child node found");
        return null;
      }
      return vue.withDirectives(vue.cloneVNode(firstLegitNode, attrs), [[forwardRefDirective]]);
    };
  }
});
function findFirstLegitChild(node) {
  if (!node)
    return null;
  const children = node;
  for (const child of children) {
    if (shared.isObject(child)) {
      switch (child.type) {
        case vue.Comment:
          continue;
        case vue.Text:
          return wrapTextContent(child);
        case "svg":
          return wrapTextContent(child);
        case vue.Fragment:
          return findFirstLegitChild(child.children);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}
function wrapTextContent(s) {
  return vue.createVNode("span", {
    "class": "el-only-child__content"
  }, [s]);
}

exports.OnlyChild = OnlyChild;
//# sourceMappingURL=only-child.js.map
