import '../../utils/index2.mjs';
import Skeleton from './src/skeleton4.mjs';
import SkeletonItem from './src/skeleton-item4.mjs';
export { skeletonProps } from './src/skeleton3.mjs';
export { skeletonItemProps } from './src/skeleton-item3.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install2.mjs';

const ElSkeleton = withInstall(Skeleton, {
  SkeletonItem
});
const ElSkeletonItem = withNoopInstall(SkeletonItem);

export { ElSkeleton, ElSkeletonItem, ElSkeleton as default };
//# sourceMappingURL=index2.mjs.map
