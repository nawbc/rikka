import React, { FC, useEffect } from 'react';
import { useNetWork } from '@/utils';

// notification.config({
//   duration: 2.5,
//   top: 50
// });

interface CheckNetwork {
  onDisconnect: () => void;
  onChargeNetwork?: () => void;
}

const CheckNetwork: FC<CheckNetwork> = function(props) {
  const { onDisconnect, onChargeNetwork } = props;
  const network = useNetWork();

  useEffect(() => {
    if (network.isOnline) {
      if (network.effectiveType === '4g') {
        !!onChargeNetwork && onChargeNetwork();
      }
    } else {
      onDisconnect();
    }
  }, [network.isOnline]);

  return <>{network.isOnline ? props.children : null}</>;
};

export default CheckNetwork;
