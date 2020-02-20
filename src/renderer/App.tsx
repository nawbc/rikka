import { MenuDrawer, Splash, Search, DragAppBar, HomeButton } from '@/components';
import { Route, HashRouter, Switch } from 'react-router-dom';
import React, { useState, FC, useLayoutEffect, useEffect } from 'react';
import { localStore, initStore, IS_SPLASH, IS_PROMPT_UPDATE, SPLASH_DURATION } from './utils';
import { Modal, Icon, Checkbox, notification, Button } from 'antd';
import CacheRoute from 'react-router-cache-route';
import { hot } from 'react-hot-loader/root';
import { ipcRenderer } from 'electron';
import { routes } from './router';
import './stylesheet/index.css';

export const ctx = React.createContext({
  theme: 'light',
  title: document.title
});

const confirmExit = function() {
  Modal.confirm({
    title: '是否直接退出主程序？',
    content: (
      <div>
        <p>
          <span style={{ marginRight: 10 }}>不再提示</span>
          <Checkbox
            onChange={() => {
              localStore.set('setting.isExitDirectly', true);
            }}
          />
        </p>
      </div>
    ),
    okText: '确认',
    cancelText: '取消',
    icon: <Icon type="coffee" />,
    onOk: () => {
      ipcRenderer.send('direct-close');
    },
    onCancel: () => {
      ipcRenderer.send('close');
    },
    okButtonProps: {
      type: 'link'
    },
    cancelButtonProps: {
      type: 'link'
    }
  });
};

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
              localStore.set(IS_PROMPT_UPDATE, false);
              notification.close(key);
            }}
          >
            不再显示
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
    }
  });
};

const App: FC = function() {
  const [isDisplaySplash, setDisplaySplash] = useState(true);
  const [inProp, setInProp] = useState(true);
  const splashItem = localStore.get(IS_SPLASH);
  const isPromptUpdate = localStore.get(IS_PROMPT_UPDATE);

  // 检查更新
  useEffect(() => {
    isPromptUpdate &&
      setTimeout(() => {
        ipcRenderer.send('check-update', (event: any, args: any) => {
          if (args.event === 'error') {
            notification.open({
              message: '错误',
              description: '检查更新失败'
            });
          }
        });
      }, 2000);
    handleUpdate();
  }, []);

  useLayoutEffect(() => {
    initStore();
    if (splashItem) {
      setTimeout(() => {
        setDisplaySplash(false);
      }, SPLASH_DURATION);

      setTimeout(() => {
        setInProp(false);
      }, SPLASH_DURATION - 400);
    }
  }, [splashItem]);

  return (
    <>
      {isDisplaySplash && splashItem ? <Splash inProp={inProp} duration={400} /> : null}
      <HashRouter basename="/">
        <DragAppBar
          onClose={() => {
            !!localStore.get('setting.isExitDirectly')
              ? ipcRenderer.send('direct-close')
              : confirmExit();
          }}
          onMini={() => {
            ipcRenderer.send('min');
          }}
        />
        {routes.map((obj, i) => {
          const { isCache, ...rest } = obj;
          return isCache ? <CacheRoute {...rest} key={i} /> : <Route {...rest} key={i} />;
        })}
        <MenuDrawer />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/play" component={Search} />
        </Switch>
        <HomeButton />
      </HashRouter>
    </>
  );
};

export default hot(App);
