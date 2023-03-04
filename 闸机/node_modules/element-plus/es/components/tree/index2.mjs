import Tree from './src/tree2.mjs';

Tree.install = (app) => {
  app.component(Tree.name, Tree);
};
const _Tree = Tree;
const ElTree = _Tree;

export { ElTree, _Tree as default };
//# sourceMappingURL=index2.mjs.map
