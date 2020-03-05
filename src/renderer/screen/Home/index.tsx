import React from 'react';
import { Tabs, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { useWindowResize, changeTitle, APP_MAIN_TITLE } from '@/utils';
import { Comic } from './Fragment/Comic';
import { Main } from './Fragment/Main';
import { Movie } from './Fragment/Movie';
import { User } from './Fragment/User';
import { Series } from './Fragment/Series';
import { CheckNetwork } from '@/components';
import { useModifyJumperContentText } from '@/utils';
import './index.css';

const { TabPane } = Tabs;

const Home = function() {
  const { width, height } = useWindowResize();
  useModifyJumperContentText();

  return (
    <CheckNetwork
      onDisconnect={() => {
        notification.open({
          message: '注意',
          description: '网络 未与君产生共鸣'
        });
      }}
      onChargeNetwork={() => {
        notification.open({
          message: '注意',
          description: '正在使用计费网络, 注意补魔'
        });
      }}
    >
      <Tabs
        defaultActiveKey="1"
        size="small"
        className="main-tabs"
        // animated={false}
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
              changeTitle('账户');
              break;
          }
        }}
      >
        <TabPane tab="老大" key="1" style={{ width, height }} forceRender>
          <Main />
        </TabPane>
        <TabPane tab="吾王" key="2" style={{ width, height }} forceRender>
          <User />
        </TabPane>
        <TabPane tab="纸片" key="3" style={{ width, height }} forceRender>
          <Comic />
        </TabPane>
        <TabPane tab="幻境" key="4" style={{ width, height }} forceRender>
          <Movie />
        </TabPane>
        <TabPane tab="现实" key="5" style={{ width, height }} forceRender>
          <Series />
        </TabPane>
      </Tabs>
    </CheckNetwork>
  );
};

export default withRouter(Home);
