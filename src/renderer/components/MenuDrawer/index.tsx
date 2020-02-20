import React, { FC, useState, useReducer } from 'react';
import { Menu, Drawer, Switch, Icon, notification } from 'antd';
import { NavLink } from 'react-router-dom';
import { FilePosition } from './FilePosition';
import { RIcon } from '@/components';
import { OtherDownloadOptions } from './OtherDownloadOptions';
import { localStore, initStore, keepOneAudio } from '@/utils';
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
        className="draw-box"
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
          <Menu.Item key="download">
            <NavLink to="/download">下载</NavLink>
          </Menu.Item>
          {/* 关于 */}
          <Menu.Item key="about">
            <NavLink to="/about">关于</NavLink>
          </Menu.Item>
          {/* 广告 */}
          <Menu.Item key="ads">
            <NavLink to="/ads">广告欣赏</NavLink>
          </Menu.Item>
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
              key="splash"
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
                  localStore.set('setting.splash', !localStore.get('setting.splash'));
                  forceUpdate();
                }}
                checked={localStore.get('setting.splash')}
              />
            </Menu.Item>
            <Menu.Item
              key="theme-mode"
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
              <Menu.Item key="download-position">
                <FilePosition
                  optionTitle="保存路径"
                  title="设置下载位置"
                  setting={['setting', 'downloadPosition']}
                  icon={<Icon type="cloud-download" />}
                />
              </Menu.Item>
              <Menu.Item key="speed">
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
            <Menu.Item key="all-setting">
              <NavLink to="/setting">全部设置</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <RIcon
          src={require('../../assets/rikkia.svg')}
          className="rikka-logo"
          onClick={() => {
            keepOneAudio([
              require('../../assets/sound/e.mp3'),
              require('../../assets/sound/mega.mp3'),
              require('../../assets/sound/rikka.mp3'),
              require('../../assets/sound/saigao.mp3')
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
