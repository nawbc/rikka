export const setHeaders = function(headers: object) {
  const baseHeaders = {
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
    Connection: 'keep-alive',
    'Accept-Language': 'zh-CN, zh; q = 0.9'
  };
  return Object.assign({}, baseHeaders, headers);
};
