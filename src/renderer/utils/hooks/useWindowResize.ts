import { useState, useEffect } from 'react';

export const useWindowResize = function() {
  const getSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [size, setReSize] = useState(getSize());
  useEffect(() => {
    window.onresize = () => setReSize(getSize());
  });
  return size;
};
