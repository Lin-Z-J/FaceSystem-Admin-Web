import Popover from './src/index2.mjs';
import PopoverDirective, { VPopover } from './src/directive2.mjs';

Popover.install = (app) => {
  app.component(Popover.name, Popover);
};
PopoverDirective.install = (app) => {
  app.directive(VPopover, PopoverDirective);
};
const _PopoverDirective = PopoverDirective;
Popover.directive = _PopoverDirective;
const _Popover = Popover;
const ElPopover = _Popover;
const ElPopoverDirective = _PopoverDirective;

export { ElPopover, ElPopoverDirective, _Popover as default };
//# sourceMappingURL=index2.mjs.map
