'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../hooks/index2.js');
var index = require('../../../hooks/use-namespace/index2.js');

const Timeline = vue.defineComponent({
  name: "ElTimeline",
  setup(_, { slots }) {
    const ns = index.useNamespace("timeline");
    vue.provide("timeline", slots);
    return () => {
      return vue.h("ul", { class: [ns.b()] }, [vue.renderSlot(slots, "default")]);
    };
  }
});

exports["default"] = Timeline;
//# sourceMappingURL=timeline2.js.map
