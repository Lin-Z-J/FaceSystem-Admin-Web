import '../../../../hooks/index2.mjs';
import { getFixedColumnsClass, getFixedColumnOffset, ensurePosition } from '../util2.mjs';
import useMapState from './mapState-helper2.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index2.mjs';

function useStyle(props) {
  const { columns } = useMapState();
  const ns = useNamespace("table");
  const getCellClasses = (columns2, cellIndex) => {
    const column = columns2[cellIndex];
    const classes = [
      ns.e("cell"),
      column.id,
      column.align,
      column.labelClassName,
      ...getFixedColumnsClass(ns.b(), cellIndex, column.fixed, props.store)
    ];
    if (column.className) {
      classes.push(column.className);
    }
    if (!column.children) {
      classes.push(ns.is("leaf"));
    }
    return classes;
  };
  const getCellStyles = (column, cellIndex) => {
    const fixedStyle = getFixedColumnOffset(cellIndex, column.fixed, props.store);
    ensurePosition(fixedStyle, "left");
    ensurePosition(fixedStyle, "right");
    return fixedStyle;
  };
  return {
    getCellClasses,
    getCellStyles,
    columns
  };
}

export { useStyle as default };
//# sourceMappingURL=style-helper2.mjs.map
