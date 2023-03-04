import { onBeforeMount } from 'vue';
import { isClient } from '@vueuse/core';
import '../../utils/index2.mjs';
import { generateId } from '../../utils/rand2.mjs';

let cachedContainer;
const POPPER_CONTAINER_ID = `el-popper-container-${generateId()}`;
const POPPER_CONTAINER_SELECTOR = `#${POPPER_CONTAINER_ID}`;
const createContainer = () => {
  const container = document.createElement("div");
  container.id = POPPER_CONTAINER_ID;
  document.body.appendChild(container);
  return container;
};
const usePopperContainer = () => {
  onBeforeMount(() => {
    if (!isClient)
      return;
    if (process.env.NODE_ENV === "test" || !cachedContainer || !document.body.querySelector(POPPER_CONTAINER_SELECTOR)) {
      cachedContainer = createContainer();
    }
  });
};

export { POPPER_CONTAINER_ID, POPPER_CONTAINER_SELECTOR, usePopperContainer };
//# sourceMappingURL=index2.mjs.map
