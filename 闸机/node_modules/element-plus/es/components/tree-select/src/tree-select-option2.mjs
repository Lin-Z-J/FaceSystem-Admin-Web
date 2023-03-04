import { defineComponent } from 'vue';
import { ElOption } from '../../select/index2.mjs';

const component = defineComponent({
  extends: ElOption,
  setup(props, ctx) {
    const result = ElOption.setup(props, ctx);
    delete result.selectOptionClick;
    return result;
  },
  methods: {
    selectOptionClick() {
      this.$el.parentElement.click();
    }
  }
});

export { component as default };
//# sourceMappingURL=tree-select-option2.mjs.map
