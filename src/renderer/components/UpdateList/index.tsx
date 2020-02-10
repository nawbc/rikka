import React, { FC } from 'react';
import { ipcRenderer } from 'electron';
import ClickDown from '../ClickDown';
import { UpdateCollections } from '@/api/halihali/halihali.interface';
import { Tabs, List } from 'antd';
import { ScrollBar } from '..';

interface UpdateLisProp {
  lists: UpdateCollections;
}

const { TabPane } = Tabs;

const displayDay = (index: number) => {
  switch (index) {
    case 0:
      return '周日';
    case 1:
      return '周一';
    case 2:
      return '周二';
    case 3:
      return '周三';
    case 4:
      return '周四';
    case 5:
      return '周五';
    case 6:
      return '周六';
  }
};

const UpdateList: FC<UpdateLisProp> = function(props) {
  const { lists } = props;
  const today = new Date().getDay() - 1;
  return (
    <div
      className="update-list-wrapper"
      style={{ width: 300, height: 400, display: 'inline-block' }}
    >
      <Tabs tabPosition="right">
        {lists.map((val, index) => {
          return (
            <TabPane tab={displayDay(index)} key={index.toString()}>
              <ScrollBar style={{ height: 400 }}>
                <List
                  style={{ height: 300 }}
                  itemLayout="horizontal"
                  dataSource={val}
                  renderItem={item => {
                    return (
                      <List.Item>
                        <List.Item.Meta
                          title={<a href="https://ant.design">{item.title}</a>}
                          description={item.update}
                        />
                      </List.Item>
                    );
                  }}
                />
              </ScrollBar>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default React.memo(UpdateList);
