'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../constants/index2.js');
var event = require('../../../constants/event2.js');

const useMove = (props, checkedState, propsKey, emit) => {
  const _emit = (value, type, checked) => {
    emit(event.UPDATE_MODEL_EVENT, value);
    emit(event.CHANGE_EVENT, value, type, checked);
  };
  const addToLeft = () => {
    const currentValue = props.modelValue.slice();
    checkedState.rightChecked.forEach((item) => {
      const index = currentValue.indexOf(item);
      if (index > -1) {
        currentValue.splice(index, 1);
      }
    });
    _emit(currentValue, "left", checkedState.rightChecked);
  };
  const addToRight = () => {
    let currentValue = props.modelValue.slice();
    const itemsToBeMoved = props.data.filter((item) => {
      const itemKey = item[propsKey.value];
      return checkedState.leftChecked.includes(itemKey) && !props.modelValue.includes(itemKey);
    }).map((item) => item[propsKey.value]);
    currentValue = props.targetOrder === "unshift" ? itemsToBeMoved.concat(currentValue) : currentValue.concat(itemsToBeMoved);
    if (props.targetOrder === "original") {
      currentValue = props.data.filter((item) => currentValue.includes(item[propsKey.value])).map((item) => item[propsKey.value]);
    }
    _emit(currentValue, "right", checkedState.leftChecked);
  };
  return {
    addToLeft,
    addToRight
  };
};

exports.useMove = useMove;
//# sourceMappingURL=useMove2.js.map
