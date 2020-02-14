import React, { FC, useState, useReducer } from 'react';
import { Menu, Drawer, Switch, Icon, notification } from 'antd';
import { NavLink } from 'react-router-dom';
import { FilePosition } from './FilePosition';
import { RIcon } from '@/components';
import { OtherDownloadOptions } from './OtherDownloadOptions';
import { localStore, initStore, randomAudio } from '@/utils';
import ClickDown from '../ClickDown';
import './index.css';

const { SubMenu } = Menu;

interface MenuDrawerProps {
  onClose?: ((e: any) => void) | undefined;
}

const MenuDrawer: FC<MenuDrawerProps> = function(props) {
  const [display, setDisplay] = useState(false);
  const [downVisible, setDownVisible] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div>
      <div
        style={
          {
            position: 'fixed',
            top: '0px',
            left: '0px',
            zIndex: 999,
            WebkitAppRegion: 'no-drag'
          } as any
        }
        onClick={() => {
          setDisplay(true);
        }}
      >
        <ClickDown>
          <RIcon size={[20, 20]} src={require('../../assets/menu.svg')} />
        </ClickDown>
      </div>
      <Drawer
        width={300}
        placement="left"
        closable={false}
        onClose={() => {
          setDisplay(false);
        }}
        visible={display}
      >
        <Menu
          style={{ width: '100%' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          forceSubMenuRender
          mode="inline"
        >
          {/* 下载 */}
          <Menu.Item key="1">{<NavLink to="/download">下载</NavLink>}</Menu.Item>
          {/* 关于 */}
          <Menu.Item key="2">关于</Menu.Item>
          {/*设置*/}
          <SubMenu
            key="setting"
            title={
              <span>
                <span>设置</span>
              </span>
            }
          >
            <Menu.Item
              key="3"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>启动页</span>
              <Switch
                size="small"
                onClick={() => {
                  forceUpdate();
                  localStore.set('setting.splash', !localStore.get('setting.splash'));
                }}
                checked={localStore.get('setting.splash')}
              />
            </Menu.Item>
            <Menu.Item
              key="10"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>昼夜模式</span>
              <Switch
                size="small"
                onClick={() => {
                  forceUpdate();
                  localStore.set('setting.dayNightMode', !localStore.get('setting.dayNightMode'));
                }}
                checked={localStore.get('setting.dayNightMode')}
              />
            </Menu.Item>
            <SubMenu
              key="downloadSetting"
              title={
                <span>
                  <span>下载设置</span>
                </span>
              }
            >
              <Menu.Item key="4">
                <FilePosition
                  optionTitle="保存路径"
                  title="设置下载位置"
                  setting={['setting', 'downloadPosition']}
                  icon={<Icon type="cloud-download" />}
                />
              </Menu.Item>
              <Menu.Item key="5">
                <OtherDownloadOptions
                  visible={downVisible}
                  onOpen={() => {
                    setDownVisible(true);
                  }}
                  onClose={() => {
                    setDownVisible(false);
                  }}
                />
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="8">全部设置</Menu.Item>
            <Menu.Item
              key="7"
              onClick={() => {
                localStore.clear();
                initStore();
                notification.open({
                  message: '',
                  description: '设置已重置'
                });
                forceUpdate();
              }}
            >
              重置
            </Menu.Item>
          </SubMenu>
        </Menu>
        <RIcon
          src={require('../../assets/rikkia.svg')}
          className="rikka-logo"
          onClick={() => {
            randomAudio([
              require('../../assets/sound/e.mp3'),
              require('../../assets/sound/mega.mp3'),
              require('../../assets/sound/rikka.mp3'),
              require('../../assets/sound/saogao.mp3')
            ]);
          }}
          style={{
            width: '200px',
            height: '245px',
            bottom: '5px',
            left: '0px',
            position: 'absolute'
          }}
        />
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
