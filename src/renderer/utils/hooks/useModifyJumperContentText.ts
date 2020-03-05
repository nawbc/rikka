import { useLayoutEffect } from 'react';

export const useModifyJumperContentText = function() {
  useLayoutEffect(() => {
    const jumper = document.getElementsByClassName('ant-pagination-options-quick-jumper') as any;
    for (const ele of jumper) {
      ele.childNodes[0].textContent = '跳转';
    }
  }, []);
};
