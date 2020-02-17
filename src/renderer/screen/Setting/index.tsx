import React, { FC, useReducer, useState, useRef } from 'react';
import { useTitle, useWindowResize, localStore, initStore } from '@/utils';
import { notification, Divider, Checkbox, Switch, Icon, Radio, Tooltip } from 'antd';
import { ScrollBar, MainButton, List, ListItem, RIcon, ClickDown } from '@/components';
import { ipcRenderer, remote } from 'electron';
import './index.css';

const { dialog } = remote;

const Setting: FC = function() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const { width, height } = useWindowResize();
  const isAutoLogin = localStore.get('setting.isAutoLogin');
  const parallelCount = localStore.get('setting.parallelCount');
  const threadCount = localStore.get('setting.threadCount');
  const downloadPosition = localStore.get('setting.downloadPosition');
  const screenshotPosition = localStore.get('setting.screenshotPosition');
  const isSplash = localStore.get('setting.splash');
  const downloadRef = useRef<any>(null);
  const screenshotRef = useRef<any>(null);

  useTitle('设置');

  return (
    <div style={{ width, height }}>
      <ScrollBar>
        <div style={{ maxWidth: '600px', margin: '60px auto' }}>
          <h3 style={{ marginBottom: 16 }}>基本设置</h3>
          <List>
            <ListItem
              prefixBlock="开机自爆(qi)"
              other={
                <Switch
                  size="small"
                  onClick={() => {
                    localStore.set('setting.isAutoLogin', !isAutoLogin);
                    isAutoLogin
                      ? ipcRenderer.send('closeAutoLogin')
                      : ipcRenderer.send('openAutoLogin');
                    forceUpdate();
                  }}
                  checked={isAutoLogin}
                />
              }
            />
            <ListItem
              prefixBlock="启动页"
              other={
                <Switch
                  size="small"
                  onClick={() => {
                    localStore.set('setting.splash', !isSplash);
                    forceUpdate();
                  }}
                  checked={isSplash}
                />
              }
            />
            <ListItem
              prefixBlock={
                <>
                  <span>截图路径</span> &nbsp;&nbsp;
                  <span style={{ color: 'var(--gg)', fontSize: 11 }} ref={screenshotRef}>
                    {screenshotPosition}
                  </span>
                </>
              }
              other={
                <ClickDown>
                  <RIcon
                    src={require('../../assets/dir.svg')}
                    size={[18, 18]}
                    style={{ marginRight: '4px' }}
                    onClick={() => {
                      dialog
                        .showOpenDialog({
                          properties: ['openDirectory']
                        })
                        .then(info => {
                          const dirPath = info.filePaths;
                          localStore.set('setting.screenshotPosition', dirPath[0]);
                          screenshotRef.current.innerText = dirPath;
                        });
                    }}
                  />
                </ClickDown>
              }
            />
            <ListItem
              prefixBlock="最小化后显示"
              style={{
                paddingRight: '3px'
              }}
              other={
                <Radio.Group>
                  <Radio value="1">退出</Radio>
                  <Radio value="2">托盘</Radio>
                </Radio.Group>
              }
            />
            <ListItem
              prefixBlock="主题模式"
              style={{
                paddingRight: '3px'
              }}
              other={
                <Radio.Group>
                  <Tooltip title="根据时间自动切换 ">
                    <Radio value="1">昼夜</Radio>
                  </Tooltip>
                  <Radio value="2">圣光</Radio>
                  <Radio value="3">暗焰</Radio>
                </Radio.Group>
              }
            />
          </List>
          <h3 style={{ margin: '16px 0' }}>下载设置</h3>
          <List>
            <ListItem
              prefixBlock={
                <>
                  <span>下载路径</span> &nbsp;&nbsp;
                  <span style={{ color: 'var(--gg)', fontSize: 11 }} ref={downloadRef}>
                    {downloadPosition}
                  </span>
                </>
              }
              other={
                <ClickDown>
                  <RIcon
                    src={require('../../assets/dir.svg')}
                    size={[18, 18]}
                    style={{ marginRight: '4px' }}
                    onClick={() => {
                      dialog
                        .showOpenDialog({
                          properties: ['openDirectory']
                        })
                        .then(info => {
                          const dirPath = info.filePaths;
                          localStore.set('setting.downloadPosition', dirPath[0]);
                          downloadRef.current.innerText = dirPath;
                        });
                    }}
                  />
                </ClickDown>
              }
            />
          </List>
          <h3 style={{ margin: '16px 0' }}>消息通知</h3>
          <List>
            <ListItem
              prefixBlock="消息通知"
              other={
                <Switch
                  size="small"
                  onClick={() => {
                    console.log(111);
                  }}
                  checked={true}
                />
              }
            />
            <ListItem
              prefixBlock="番剧更新提醒"
              other={
                <Switch
                  size="small"
                  onClick={() => {
                    console.log(111);
                  }}
                  checked={true}
                />
              }
            />
            <ListItem
              prefixBlock="下载完成提示音"
              other={
                <Switch
                  size="small"
                  onClick={() => {
                    console.log(1111);
                  }}
                  checked={true}
                />
              }
            />
          </List>
          <h3 style={{ margin: '16px 0' }}>消息通知</h3>
          <List>
            <ListItem
              prefixBlock="自动更新"
              other={
                <Switch
                  size="small"
                  onClick={() => {
                    console.log(111);
                  }}
                  checked={true}
                />
              }
            />
            <ListItem
              prefixBlock="番剧更新提醒"
              other={
                <Switch
                  size="small"
                  onClick={() => {
                    console.log(111);
                  }}
                  checked={true}
                />
              }
            />
          </List>
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
