import '../../constants/index2.mjs';
import { componentSizes } from '../../constants/size2.mjs';
import { datePickTypes } from '../../constants/date2.mjs';

const isValidComponentSize = (val) => ["", ...componentSizes].includes(val);
const isValidDatePickType = (val) => [...datePickTypes].includes(val);

export { isValidComponentSize, isValidDatePickType };
//# sourceMappingURL=validator2.mjs.map
