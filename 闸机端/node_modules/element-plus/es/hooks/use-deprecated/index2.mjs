import { watch, unref } from 'vue';
import '../../utils/index2.mjs';
import { debugWarn } from '../../utils/error2.mjs';

const useDeprecated = ({ from, replacement, scope, version, ref, type = "API" }, condition) => {
  watch(() => unref(condition), (val) => {
    if (val) {
      debugWarn(scope, `${type} ${from} is about to be deprecated in version ${version}, please use ${replacement} instead.
For more detail, please visit: ${ref}
`);
    }
  }, {
    immediate: true
  });
};

export { useDeprecated };
//# sourceMappingURL=index2.mjs.map
