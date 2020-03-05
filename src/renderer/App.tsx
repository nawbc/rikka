import { MenuDrawer, Splash, Search, DragAppBar, HomeButton } from '@/components';
import { Route, HashRouter, Switch } from 'react-router-dom';
import React, { useState, FC, useLayoutEffect, useEffect, useReducer } from 'react';
import {
  localStore,
  initStore,
  IS_SPLASH,
  SPLASH_DURATION,
  IS_AUTOUPDATE,
  EXIT_MODE,
  IS_REMEMBER_EXIT
} from './utils';
import { Modal, Icon, Checkbox, notification, Button } from 'antd';
import CacheRoute from 'react-router-cache-route';
import { hot } from 'react-hot-loader/root';
import { ipcRenderer } from 'electron';
import { routes } from './router';
import './stylesheet/index.css';
import { exitAppModal } from './components/Modal';

export const ctx = React.createContext({
  theme: 'light',
  title: document.title
});

const App: FC = function() {
  const [isDisplaySplash, setDisplaySplash] = useState(true);
  const [inProp, setInProp] = useState(true);
  const splashItem = localStore.get(IS_SPLASH);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  // const isAutoUpdate = localStore.get(IS_AUTOUPDATE);
  // 检查更新
  // useEffect(() => {
  // isAutoUpdate &&
  //   setTimeout(() => {
  //     ipcRenderer.send('check-update');
  //   }, 2000);
  // handleUpdate();
  // }, []);

  useLayoutEffect(() => {
    if (splashItem) {
      setTimeout(() => {
        setDisplaySplash(false);
      }, SPLASH_DURATION);

      setTimeout(() => {
        setInProp(false);
      }, SPLASH_DURATION - 400);
    }
  }, [splashItem]);

  useEffect(initStore, []);

  return (
    <>
      {isDisplaySplash && splashItem ? <Splash inProp={inProp} duration={400} /> : null}
      <HashRouter basename="/">
        <DragAppBar
          onClose={() => {
            const exitMode = localStore.get(EXIT_MODE);
            switch (exitMode) {
              case 'exit':
                ipcRenderer.send('direct-close');
                break;
              case 'ask':
                exitAppModal();
                break;
              case 'tray':
                ipcRenderer.send('close');
                break;
            }
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
