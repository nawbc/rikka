export const leanCloudRegisterError = (status: string) => {
  switch (status) {
    case '203':
      return '邮箱重复， 请更换邮箱';
    default:
      return 'leancloud 请求出错， 请重试';
  }
};
