import React from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import { useWindowResize, changeTitle } from '@/utils';
import { Comic } from './Fragment/Comic';
import { Main } from './Fragment/Main';
import { Movie } from './Fragment/Movie';
import './index.css';

const { TabPane } = Tabs;

const Home = function() {
  const { width, height } = useWindowResize();

  return (
    <Tabs
      defaultActiveKey="1"
      size="small"
      className="main-tabs"
      onChange={activeKey => {
        switch (activeKey) {
          case '1':
            changeTitle('主页');
            break;
          case '2':
            changeTitle('动漫');
            break;
          case '3':
            changeTitle('电影');
            break;
          case '4':
            changeTitle('电视剧');
            break;
          case '5':
            changeTitle('我');
            break;
        }
      }}
    >
      <TabPane tab="老大" key="1" style={{ width, height }} forceRender>
        <Main />
      </TabPane>
      <TabPane tab="纸片" key="2" style={{ width, height }} forceRender>
        <Comic />
      </TabPane>
      <TabPane tab="幻境" key="3" style={{ width, height }} forceRender>
        <Movie />
      </TabPane>
      <TabPane tab="现实" key="4" style={{ width, height }} forceRender />
      <TabPane tab="吾王" key="5" style={{ width, height }} forceRender />
    </Tabs>
  );
};

export default withRouter(Home);
