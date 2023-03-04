import CascaderPanel from './src/index2.mjs';
export { CASCADER_PANEL_INJECTION_KEY, ExpandTrigger } from './src/types2.mjs';
export { CommonProps, DefaultProps, useCascaderConfig } from './src/config2.mjs';

CascaderPanel.install = (app) => {
  app.component(CascaderPanel.name, CascaderPanel);
};
const _CascaderPanel = CascaderPanel;
const ElCascaderPanel = _CascaderPanel;

export { ElCascaderPanel, _CascaderPanel as default };
//# sourceMappingURL=index2.mjs.map
