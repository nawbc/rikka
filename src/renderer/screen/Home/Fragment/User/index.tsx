import React, { FC, useReducer, useMemo, useState } from 'react';
import { localStore } from '@/utils';
import AV from 'leancloud-storage';
import { Signed } from './Signed';
import { UnSigned } from './UnSigned';

export const User: FC = function() {
  const [] = useReducer(x => x + 1, 0);
  const [] = useState('');
  // const [] = useState('');

  const currentUser = AV.User.current();
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  console.log(currentUser);
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {currentUser ? (
        <Signed />
      ) : (
        <UnSigned
          onLogin={user => {
            forceUpdate();
          }}
        />
      )}
    </div>
  );
};
