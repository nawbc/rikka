const AV = require('leancloud-storage');

module.exports = function initLeanCloud(callback) {
  try {
    AV.init({
      appId: 'rqArayNLwBSGtPlufB5qcIUt-gzGzoHsz',
      appKey: 'EhBTSxPi4cDE3jwGyFoF0PXB',
      serverURLs: 'https://rqaraynl.lc-cn-n1-shared.com'
    });
  } catch (err) {
    !!callback && callback(err);
  }
};
