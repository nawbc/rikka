import { useEffect } from 'react';

export const useTitle = function(t: string): void {
  useEffect(() => {
    document.getElementById('app-title')!.innerText = t;
  }, []);
};
