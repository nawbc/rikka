import { Checkbox, Icon, Modal } from 'antd';
import React from 'react';
import { IS_REMEMBER_EXIT, localStore, EXIT_MODE } from '@/utils';
import { ipcRenderer } from 'electron';

export default function() {
  const modal = Modal.confirm({
    title: '是否直接退出主程序？',
    content: ConfirmModal(localStore.get(IS_REMEMBER_EXIT)),
    okText: '确认',
    cancelText: '取消',
    icon: <Icon type="coffee" />,
    onOk: () => {
      localStore.get(IS_REMEMBER_EXIT) && localStore.set(EXIT_MODE, 'exit');
      ipcRenderer.send('direct-close');
    },
    onCancel: () => {
      localStore.get(IS_REMEMBER_EXIT) && localStore.set(EXIT_MODE, 'tray');
      ipcRenderer.send('close');
    },
    okButtonProps: {
      type: 'link'
    },
    cancelButtonProps: {
      type: 'link'
    }
  });

  function ConfirmModal(isRem: boolean) {
    return (
      <div>
        <p>
          <span style={{ marginRight: 10 }}>不再提示</span>
          <Checkbox
            checked={isRem}
            onChange={() => {
              localStore.set(IS_REMEMBER_EXIT, !isRem);
              modal.update({
                content: ConfirmModal(!isRem)
              });
            }}
          />
        </p>
      </div>
    );
  }
}
