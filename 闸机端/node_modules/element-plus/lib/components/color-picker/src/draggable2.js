'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@vueuse/core');
require('../../../utils/index2.js');
var event = require('../../../utils/dom/event2.js');

let isDragging = false;
function draggable(element, options) {
  if (!core.isClient)
    return;
  const moveFn = function(event) {
    var _a;
    (_a = options.drag) == null ? void 0 : _a.call(options, event);
  };
  const upFn = function(event$1) {
    var _a;
    event.off(document, "mousemove", moveFn);
    event.off(document, "mouseup", upFn);
    event.off(document, "touchmove", moveFn);
    event.off(document, "touchend", upFn);
    document.onselectstart = null;
    document.ondragstart = null;
    isDragging = false;
    (_a = options.end) == null ? void 0 : _a.call(options, event$1);
  };
  const downFn = function(event$1) {
    var _a;
    if (isDragging)
      return;
    event$1.preventDefault();
    document.onselectstart = () => false;
    document.ondragstart = () => false;
    event.on(document, "mousemove", moveFn);
    event.on(document, "mouseup", upFn);
    event.on(document, "touchmove", moveFn);
    event.on(document, "touchend", upFn);
    isDragging = true;
    (_a = options.start) == null ? void 0 : _a.call(options, event$1);
  };
  event.on(element, "mousedown", downFn);
  event.on(element, "touchstart", downFn);
}

exports["default"] = draggable;
//# sourceMappingURL=draggable2.js.map
