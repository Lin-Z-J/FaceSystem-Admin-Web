import Transfer from './src/index2.mjs';
import './src/transfer2.mjs';

Transfer.install = (app) => {
  app.component(Transfer.name, Transfer);
};
const _Transfer = Transfer;
const ElTransfer = _Transfer;

export { ElTransfer, _Transfer as default };
//# sourceMappingURL=index2.mjs.map
