import '../../utils/index2.mjs';
import Table from './src/table2.mjs';
import './src/tableColumn2.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install2.mjs';
import ElTableColumn$1 from './src/table-column/index2.mjs';

const ElTable = withInstall(Table, {
  TableColumn: ElTableColumn$1
});
const ElTableColumn = withNoopInstall(ElTableColumn$1);

export { ElTable, ElTableColumn, ElTable as default };
//# sourceMappingURL=index2.mjs.map
