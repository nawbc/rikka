import { ipcRenderer } from 'electron';
import React from 'react';
import { Button, notification } from 'antd';
import { localStore, IS_AUTOUPDATE } from '..';

const handleUpdate = function() {
  ipcRenderer.on('update-msg', (event, args) => {
    if (args.event === 'update-available') {
      const key = `open${Date.now()}`;

      const btn = (
        <>
          <Button
            type="link"
            className="button-down"
            size="small"
            onClick={() => {
              localStore.set(IS_AUTOUPDATE, false);
              notification.close(key);
            }}
          >
            取消自动更新
          </Button>
          <Button
            type="link"
            size="small"
            className="button-down"
            onClick={() => {
              ipcRenderer.send('confirm-download', (event: any, args: any) => {
                console.log(args, 'fucker');
              });
              // notification.close(key);
            }}
          >
            更新
          </Button>
        </>
      );

      notification.open({
        duration: 10,
        message: '有可用更新',
        description: '有可用更新',
        btn,
        key
      });
    } else if (args.event === 'update-not-available') {
      notification.open({
        duration: 3,
        message: '信息',
        description: '无可用更新'
      });
    } else if (args.event === 'error') {
      notification.open({
        message: '错误',
        description: '检查更新失败'
      });
    }
  });
};
