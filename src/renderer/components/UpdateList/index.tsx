import React, { FC, useState, HTMLAttributes, useLayoutEffect } from 'react';
import { ipcRenderer } from 'electron';
import ClickDown from '../ClickDown';
import { UpdateCollections } from '@/api/halihali/halihali.interface';
import { Tabs, List } from 'antd';
import { ScrollBar } from '..';
import './index.css';
import { createUpdateList } from '@/api/halihali';
import { NavLink } from 'react-router-dom';

interface UpdateLisProp extends HTMLAttributes<any> {}

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
  const today = new Date().getDay();
  const [pane, setPane] = useState(today.toString());
  const [updateList, setUpdateList] = useState<UpdateCollections>([]);
  const { style } = props;
  const height = !!style ? style.height : null;
  useLayoutEffect(() => {
    createUpdateList().then(data => {
      setUpdateList(data);
    });
  }, []);

  return (
    <div {...props}>
      <Tabs
        tabPosition="right"
        className="update-table"
        activeKey={pane}
        onChange={key => {
          setPane(key);
        }}
      >
        {updateList.map((val, index) => {
          return (
            <TabPane tab={displayDay(index)} key={index.toString()} forceRender>
              <ScrollBar style={{ height }}>
                <List
                  itemLayout="horizontal"
                  dataSource={val}
                  renderItem={item => {
                    return (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <NavLink to={`play${item.url.pathname || ''}${item.title}`}>
                              {item.title}
                            </NavLink>
                          }
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
