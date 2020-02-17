import { MenuDrawer, Splash, Search, DragAppBar, CheckNetwork, HomeButton } from '@/components';
import { Route, HashRouter, Switch } from 'react-router-dom';
import React, { useState, FC, useLayoutEffect } from 'react';
import CacheRoute from 'react-router-cache-route';
import { localStore, initStore } from './utils';
import { Modal, Icon, Checkbox } from 'antd';
import { hot } from 'react-hot-loader/root';
import { ipcRenderer } from 'electron';
import { routes } from './router';
import './stylesheet/index.css';

export const APP_MAIN_TITLE = '邪王真眼 --- 爆裂吧，番剧！ 粉碎吧，精神, 放逐这个世界！';
const SPLASH_DURATION = 1000;
export const ctx = React.createContext({
  theme: 'light',
  title: document.title
});

const confirmExit = () => {
  Modal.confirm({
    title: '是否直接退出主程序 ？',
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

const App: FC = () => {
  const [isDisplaySplash, setDisplaySplash] = useState(true);
  const [inProp, setInProp] = useState(true);
  const splashItem = localStore.get('setting.splash');

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
      <CheckNetwork>
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
      </CheckNetwork>
    </>
  );
};

export default hot(App);
