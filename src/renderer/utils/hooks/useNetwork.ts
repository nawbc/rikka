import { useState, useEffect } from 'react';

interface Network {
  isOnline?: boolean;
  effectiveType?: string;
}

export const useNetwork = function(): Network {
  const connection = (window.navigator as any).connection;

  const [networkInfo, setNetwork] = useState({
    isOnline: navigator.onLine,
    effectiveType: connection.effectiveType
  });

  useEffect(() => {
    window.ononline = function() {
      setNetwork({ isOnline: true, effectiveType: connection.effectiveType });
    };
    window.onoffline = function() {
      setNetwork({
        isOnline: false,
        effectiveType: connection.effectiveType
      });
    };
  });
  return networkInfo;
};
