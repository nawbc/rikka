import React, { FC, useReducer } from 'react';
import { useTitle, useWindowResize, localStore, initStore } from '@/utils';
import { List, notification } from 'antd';
import { ScrollBar, MainButton } from '@/components';
import './index.css';

const Setting: FC = function() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const { width, height } = useWindowResize();

  useTitle('设置');

  return (
    <div style={{ width, height }}>
      <ScrollBar>span</ScrollBar>
    </div>
  );
};

export default Setting;
