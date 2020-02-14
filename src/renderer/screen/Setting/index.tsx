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
      <ScrollBar>
        <div style={{ maxWidth: '600px', margin: '60px auto' }}>
          <h3 style={{ marginBottom: 16 }}>基本设置</h3>
          <List
          // dataSource={data}
          // renderItem={item => <List.Item>fuck</List.Item>}
          />
          <h3 style={{ margin: '16px 0' }}>下载设置</h3>
          <List
            size="small"
            // dataSource={}
            // renderItem={item => <List.Item>{item}</List.Item>}
          />
          <h3 style={{ margin: '16px 0' }}>消息通知</h3>
          <List
            size="large"
            // dataSource={data}
            // renderItem={item => <List.Item>{item}</List.Item>}
          />
          <p>
            <MainButton
              className="rect reset-button"
              onClick={() => {
                localStore.clear();
                initStore();
                notification.open({
                  message: '',
                  description: '设置已重置'
                });
                forceUpdate();
              }}
            >
              重置设置项
            </MainButton>
          </p>
        </div>
      </ScrollBar>
    </div>
  );
};

export default Setting;
