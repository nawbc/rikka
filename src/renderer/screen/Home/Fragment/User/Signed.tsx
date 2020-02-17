import React, { FC, useReducer, useMemo, useState } from 'react';
import { useTitle, useWindowResize } from '@/utils';
import { User as CloudUser } from 'leancloud-storage';
import { ScrollBar } from '@/components';
import AV from 'leancloud-storage';
import { Input } from 'antd';

export const Signed: FC = function() {
  const [] = useReducer(x => x + 1, 0);

  return (
    <div>
      <button
        style={{ marginTop: 199 }}
        onClick={() => {
          AV.User.logOut()
            .then(() => {
              console.log('done');
            })
            .catch(err => {
              console.log(err);
            });
        }}
      >
        layout
      </button>
    </div>
  );
};
