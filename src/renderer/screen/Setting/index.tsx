import React, { FC, useReducer, useRef } from 'react';
import {
  useTitle,
  useWindowResize,
  localStore,
  initStore,
  keepOneAudio,
  IS_AUTO_LOGIN,
  DOWNLOAD_POSITION,
  SCREENSHOT_POSITION,
  IS_NOTIFICATION_SOUND,
  FORK_NOTIFICATION,
  IS_PROMPT_TONE,
  PROMPT_TONE,
  IS_SPLASH,
  IS_AUTOUPDATE,
  EXIT_MODE,
  THEME_MODE
} from '@/utils';
import { notification, Switch, Select, Button } from 'antd';
import { ScrollBar, MainButton, SettingList, ListItem, RIcon, ClickDown } from '@/components';
import { ipcRenderer, remote } from 'electron';
import Package from '../../../../package.json';
import './index.css';

const { dialog } = remote;
const pkg = Package as any;
const { Option } = Select;

const switchModeVal = function(mode: string) {
  switch (mode) {
    case 'dayNight':
      return '昼夜';
    case 'holyLight':
      return '圣光';
    case 'darkFlame':
      return '暗焰';
  }
};

const Setting: FC = function() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const { width, height } = useWindowResize();
  const isAutoLogin = localStore.get(IS_AUTO_LOGIN);
  const downloadPosition = localStore.get(DOWNLOAD_POSITION);
  const screenshotPosition = localStore.get(SCREENSHOT_POSITION);
  const isNotificationSound = localStore.get(IS_NOTIFICATION_SOUND);
  const forkNotification = localStore.get(FORK_NOTIFICATION);
  const isPromptTone = localStore.get(IS_PROMPT_TONE);
  const promptTone = localStore.get(PROMPT_TONE);
  const isSplash = localStore.get(IS_SPLASH);
  const isAutoUpdate = localStore.get(IS_AUTOUPDATE);
  const exitMode = localStore.get(EXIT_MODE);
  const themeMode = localStore.get(THEME_MODE);
  const downloadRef = useRef<any>(null);
  const screenshotRef = useRef<any>(null);

  useTitle('设置');

  return (
    <div style={{ width, height }}>
      <ScrollBar>
        <div style={{ maxWidth: '600px', margin: '60px auto' }}>
          {/* 基本设置 */}
          <h3 style={{ marginBottom: 16 }}>基本设置</h3>
          <SettingList>
            <ListItem
              prefixBlock="开机自爆(qi)"
              other={
                <Switch
                  size="small"
                  onClick={() => {
                    localStore.set(IS_AUTO_LOGIN, !isAutoLogin);
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
                    localStore.set(IS_SPLASH, !isSplash);
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
                    src={require('../../assets/image/icon/dir.svg')}
                    size={[18, 18]}
                    style={{ marginRight: 4 }}
                    onClick={() => {
                      dialog
                        .showOpenDialog({
                          properties: ['openDirectory']
                        })
                        .then(info => {
                          const dirPath = info.filePaths;
                          localStore.set(SCREENSHOT_POSITION, dirPath[0]);
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
                <Select
                  size="small"
                  defaultValue={exitMode}
                  style={{ width: 80 }}
                  onChange={(value: any) => {
                    localStore.set(EXIT_MODE, value);
                    forceUpdate();
                  }}
                >
                  <Option value="ask">询问</Option>
                  <Option value="exit">退出</Option>
                  <Option value="tray">托盘</Option>
                </Select>
              }
            />
            <ListItem
              prefixBlock="主题模式"
              style={{
                paddingRight: '3px'
              }}
              other={
                <Select
                  size="small"
                  defaultValue={switchModeVal(themeMode)}
                  style={{ width: 80 }}
                  onChange={(value: any) => {
                    localStore.set(THEME_MODE, value);
                    forceUpdate();
                  }}
                >
                  <Option value="dayNight">昼夜</Option>
                  <Option value="holyNight">圣光</Option>
                  <Option value="darkFlame">暗焰</Option>
                </Select>
                // <Radio.Group>
                //   <Tooltip title="根据时间自动切换 ">
                //     <Radio value="1">昼夜</Radio>
                //   </Tooltip>
                //   <Radio value="2">圣光</Radio>
                //   <Radio value="3">暗焰</Radio>
                // </Radio.Group>
              }
            />
          </SettingList>
          <h3 style={{ margin: '16px 0' }}>下载设置</h3>
          <SettingList>
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
                    src={require('../../assets/image/icon/dir.svg')}
                    size={[18, 18]}
                    style={{ marginRight: '4px' }}
                    onClick={() => {
                      dialog
                        .showOpenDialog({
                          properties: ['openDirectory']
                        })
                        .then(info => {
                          const dirPath = info.filePaths;
                          localStore.set(DOWNLOAD_POSITION, dirPath[0]);
                          downloadRef.current.innerText = dirPath;
                        });
                    }}
                  />
                </ClickDown>
              }
            />
          </SettingList>
          {/* 消息通知 */}
          <h3 style={{ margin: '16px 0' }}>消息通知</h3>
          <SettingList>
            <ListItem
              prefixBlock="消息通知"
              other={
                <Switch
                  size="small"
                  onClick={() => {
                    localStore.set(IS_NOTIFICATION_SOUND, !isNotificationSound);
                    localStore.set(FORK_NOTIFICATION, !isNotificationSound);
                    localStore.set(IS_PROMPT_TONE, !isNotificationSound);
                    forceUpdate();
                  }}
                  checked={isNotificationSound}
                />
              }
            />
            <ListItem
              prefixBlock="番剧更新提醒"
              other={
                <Switch
                  size="small"
                  disabled={!isNotificationSound}
                  onClick={() => {
                    localStore.set(FORK_NOTIFICATION, !forkNotification);
                    forceUpdate();
                  }}
                  checked={forkNotification}
                />
              }
            />
            <ListItem
              prefixBlock={
                <span>
                  <span>提示音</span>
                  &nbsp;&nbsp;&nbsp;
                  <Select
                    size="small"
                    defaultValue={promptTone}
                    style={{ width: 80 }}
                    onChange={(value: any) => {
                      localStore.set(PROMPT_TONE, value);
                      forceUpdate();
                      keepOneAudio(require(`../../assets/sound/${value}`));
                    }}
                  >
                    <Option value="normal.mp3">normal</Option>
                    <Option value="e.mp3">e</Option>
                    <Option value="mega.mp3">mega</Option>
                    <Option value="rikka.mp3">rikka</Option>
                    <Option value="saigao.mp3">saigao</Option>
                  </Select>
                </span>
              }
              other={
                <Switch
                  size="small"
                  disabled={!isNotificationSound}
                  onClick={() => {
                    localStore.set(IS_PROMPT_TONE, !isPromptTone);
                    forceUpdate();
                  }}
                  checked={isPromptTone}
                />
              }
            />
          </SettingList>
          {/* 软件版本 */}
          <h3 style={{ margin: '16px 0' }}>软件版本</h3>
          <SettingList>
            <ListItem prefixBlock="版本号" other={<span>{pkg.version}</span>} />
            <ListItem
              prefixBlock="自动更新"
              other={
                <Switch
                  size="small"
                  onClick={() => {
                    localStore.set(IS_AUTOUPDATE, !isAutoUpdate);
                    forceUpdate();
                  }}
                  checked={isAutoUpdate}
                />
              }
            />
            <ListItem
              prefixBlock="检查更新"
              other={
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    ipcRenderer.send('check-update');
                  }}
                >
                  检查
                </Button>
              }
            />
          </SettingList>
          <p>
            <MainButton
              className="rect reset-button"
              onClick={() => {
                localStore.clear();
                initStore();
                notification.open({
                  message: '信息',
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
