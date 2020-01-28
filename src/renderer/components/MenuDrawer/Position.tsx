import React, { FC } from 'react';
import Electron from 'electron';
import { Modal, Input, Icon } from 'antd';
import { localStore } from '@/utils';

const { dialog } = Electron.remote;

interface PositionCpt {
  setting: [string, string];
  title: string;
  optionTitle: string;
  icon: React.ReactNode;
}

export const Position: FC<PositionCpt> = function(props) {
  const { title, optionTitle, icon, setting } = props;

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
        onClick={() => {
          const modal = Modal.confirm({
            okText: '确定',
            cancelText: 'Death',
            title: title,
            icon: icon,
            onCancel: () => {
              modal.destroy();
            },
            onOk: () => {
              modal.destroy();
            },
            content: InputEle(''),
            okButtonProps: {
              type: 'link'
            },
            cancelButtonProps: {
              type: 'link'
            }
          });

          function InputEle(filePath: string) {
            const realPosition = localStore.get(`${setting[0]}.${setting[1]}`);
            return (
              <Input
                {...Object.assign({}, filePath === '' ? null : { value: filePath })}
                placeholder={`位置: ${realPosition}`}
                addonAfter={
                  <Icon
                    type="folder"
                    onClick={() => {
                      dialog
                        .showOpenDialog({
                          properties: ['openDirectory']
                        })
                        .then(info => {
                          const dirPath = info.filePaths;
                          if (!!dirPath) {
                            modal.update({
                              content: InputEle(dirPath[0]),
                              onOk: () => {
                                localStore.set(`${setting[0]}.${setting[1]}`, dirPath[0]);
                                modal.destroy();
                              }
                            });
                          }
                        });
                    }}
                  />
                }
              />
            );
          }
        }}
      >
        {optionTitle}
      </div>
    </>
  );
};
