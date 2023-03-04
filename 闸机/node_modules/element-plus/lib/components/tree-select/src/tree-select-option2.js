'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../select/index2.js');

const component = vue.defineComponent({
  extends: index.ElOption,
  setup(props, ctx) {
    const result = index.ElOption.setup(props, ctx);
    delete result.selectOptionClick;
    return result;
  },
  methods: {
    selectOptionClick() {
      this.$el.parentElement.click();
    }
  }
});

exports["default"] = component;
//# sourceMappingURL=tree-select-option2.js.map
