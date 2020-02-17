import AV, { debug } from 'leancloud-storage';

export function initLeanCloud(callback: (err: any) => void) {
  try {
    AV.init({
      appId: 'rqArayNLwBSGtPlufB5qcIUt-gzGzoHsz',
      appKey: 'EhBTSxPi4cDE3jwGyFoF0PXB',
      serverURLs: 'https://rqaraynl.lc-cn-n1-shared.com'
    });
  } catch (err) {
    !!callback && callback(err);
  }

  process.env.NODE_ENV === 'development' ? debug.enable() : debug.disable();
}
