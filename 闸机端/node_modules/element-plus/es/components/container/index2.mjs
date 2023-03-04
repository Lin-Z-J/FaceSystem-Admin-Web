import '../../utils/index2.mjs';
import Container from './src/container2.mjs';
import Aside from './src/aside2.mjs';
import Footer from './src/footer2.mjs';
import Header from './src/header2.mjs';
import Main from './src/main2.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install2.mjs';

const ElContainer = withInstall(Container, {
  Aside,
  Footer,
  Header,
  Main
});
const ElAside = withNoopInstall(Aside);
const ElFooter = withNoopInstall(Footer);
const ElHeader = withNoopInstall(Header);
const ElMain = withNoopInstall(Main);

export { ElAside, ElContainer, ElFooter, ElHeader, ElMain, ElContainer as default };
//# sourceMappingURL=index2.mjs.map
