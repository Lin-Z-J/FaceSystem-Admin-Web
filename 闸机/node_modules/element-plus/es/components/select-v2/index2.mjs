import Select from './src/select2.mjs';
export { selectV2InjectionKey } from './src/token2.mjs';

Select.install = (app) => {
  app.component(Select.name, Select);
};
const _Select = Select;
const ElSelectV2 = _Select;

export { ElSelectV2, _Select as default };
//# sourceMappingURL=index2.mjs.map
