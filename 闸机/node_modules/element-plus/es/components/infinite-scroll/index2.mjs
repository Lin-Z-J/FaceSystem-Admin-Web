import InfiniteScroll from './src/index2.mjs';

const _InfiniteScroll = InfiniteScroll;
_InfiniteScroll.install = (app) => {
  app.directive("InfiniteScroll", _InfiniteScroll);
};
const ElInfiniteScroll = _InfiniteScroll;

export { ElInfiniteScroll, _InfiniteScroll as default };
//# sourceMappingURL=index2.mjs.map
