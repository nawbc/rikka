import React, { FC, useEffect } from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
// import { ScrollBar, Foot } from "@/components";
import { useWindowResize } from '@/utils';
import { Comic } from './Fragment/Comic';
import { Main } from './Fragment/Main';
import { createUpdateList, createIntroduce } from '@/api/halihali';

const { TabPane } = Tabs;

const Home: FC = function(props) {
  const { width, height } = useWindowResize();

  return (
    <>
      <Tabs defaultActiveKey="1" size="small">
        <TabPane tab="老大" key="1" style={{ width: width + 'px', height: height + 'px' }}>
          <Main />
        </TabPane>
        <TabPane tab="纸片" key="2" style={{ width: width + 'px', height: height + 'px' }}>
          <Comic />
        </TabPane>
        <TabPane tab="幻境" key="3" style={{ width: width + 'px', height: height + 'px' }} />
        <TabPane tab="现实" key="4" style={{ width: width + 'px', height: height + 'px' }} />
        <TabPane tab="吾王" key="5" style={{ width: width + 'px', height: height + 'px' }} />
      </Tabs>
    </>
  );
};

export default withRouter(Home);
