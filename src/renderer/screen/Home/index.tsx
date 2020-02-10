import React, { FC } from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import { useWindowResize } from '@/utils';
import { Comic } from './Fragment/Comic';
import { Main } from './Fragment/Main';
const { TabPane } = Tabs;

const Home = function() {
  const { width, height } = useWindowResize();

  return (
    <Tabs defaultActiveKey="1" size="small" className="main-tabs">
      <TabPane tab="老大" key="1" style={{ width, height }}>
        <Main />
      </TabPane>
      <TabPane tab="纸片" key="2" style={{ width, height }}>
        <Comic />
      </TabPane>
      <TabPane tab="幻境" key="3" style={{ width, height }} />
      <TabPane tab="现实" key="4" style={{ width, height }} />
      <TabPane tab="吾王" key="5" style={{ width, height }} />
    </Tabs>
  );
};

export default withRouter(Home);
