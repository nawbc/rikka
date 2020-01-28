import React, { useState, useEffect, FC } from 'react';
import { hot } from 'react-hot-loader/root';
import './stylesheet/index.css';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { routes } from './router';
import { MenuDrawer, Splash, Search } from '@/components';
import { initStore, localStore } from './utils';

import CheckNetwork from './components/CheckNetwork';
import HomeButton from './components/HomeButton';

const SPLASH_DURATION = 3000;
export const APP_MAIN_TITLE = '邪王真眼 --- 爆裂吧，番剧！ 粉碎吧，精神, 放逐这个世界！';

const App: FC = () => {
  const [isDisplaySplash, setDisplaySplash] = useState(true);
  const [inProp, setInProp] = useState(true);
  const splashItem = localStore.get('setting.splash');
  useEffect(() => {
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
        {isDisplaySplash && splashItem ? (
          <Splash inProp={inProp} duration={400} />
        ) : (
          <HashRouter basename="/">
            {routes.map((obj, i) => (
              <Route {...obj} key={i} />
            ))}
            <MenuDrawer />
            <Switch>
              <Route exact path="/" component={Search} />
              <Route path="/play" component={Search} />
            </Switch>
            <HomeButton />
          </HashRouter>
        )}
      </CheckNetwork>
    </>
  );
};

export default hot(App);
