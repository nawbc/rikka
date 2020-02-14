import AV, { debug } from 'leancloud-storage';

export function init() {
  AV.init({
    appId: 'rqArayNLwBSGtPlufB5qcIUt-gzGzoHsz',
    appKey: 'EhBTSxPi4cDE3jwGyFoF0PXB',
    serverURLs: 'https://rqaraynl.lc-cn-n1-shared.com'
  });

  process.env.NODE_ENV === 'development' ? debug.enable() : debug.disable();
}
