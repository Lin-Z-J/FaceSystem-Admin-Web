import TreeSelect from './src/tree-select2.mjs';

TreeSelect.install = (app) => {
  app.component(TreeSelect.name, TreeSelect);
};
const _TreeSelect = TreeSelect;
const ElTreeSelect = _TreeSelect;

export { ElTreeSelect, _TreeSelect as default };
//# sourceMappingURL=index2.mjs.map
