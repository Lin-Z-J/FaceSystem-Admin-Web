import CollapseTransition from './src/collapse-transition2.mjs';

CollapseTransition.install = (app) => {
  app.component(CollapseTransition.name, CollapseTransition);
};
const _CollapseTransition = CollapseTransition;
const ElCollapseTransition = _CollapseTransition;

export { ElCollapseTransition, _CollapseTransition as default };
//# sourceMappingURL=index2.mjs.map
