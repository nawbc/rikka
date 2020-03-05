import React, { FC, useState, useReducer } from 'react';
import { Menu, Drawer, Switch, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { FilePosition } from '../Modal/FilePositionModal';
import { RIcon } from '@/components';
import { OtherDownloadOptions } from './OtherDownloadOptions';
import { localStore, keepOneAudio, IS_SPLASH, ORIGIN } from '@/utils';
import ClickDown from '../ClickDown';
import './index.css';

const { SubMenu } = Menu;

const menuHasOptionStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const SwitchOriginIcon: FC<{ origin: string }> = function(props) {
  const { origin } = props;
  return localStore.get(ORIGIN) === origin ? (
    <RIcon src={require('../../assets/image/icon/position.svg')} />
  ) : null;
};

const singleSubMenu = function(key: string[], update: any) {
  const last = key.slice(key.length - 1);

  if (last.includes('downloadSetting')) {
    last.push('setting');
    update(last);
  } else {
    update(last);
  }
};

const MenuDrawer: FC<any> = function() {
  const [display, setDisplay] = useState(false);
  const [downVisible, setDownVisible] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [subKey, setSubKey] = useState<string[]>([]);

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
          <RIcon size={[20, 20]} src={require('../../assets/image/icon/menu.svg')} />
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
          openKeys={subKey}
          onOpenChange={key => singleSubMenu(key, setSubKey)}
          forceSubMenuRender
          mode="inline"
        >
          {/* 源 */}
          <SubMenu key="origin" title="选择源">
            <Menu.Item
              style={menuHasOptionStyle}
              onClick={() => {
                localStore.set(ORIGIN, 'halihali');
                forceUpdate();
              }}
            >
              <span>邪王真眼</span>
              <SwitchOriginIcon origin="halihali" />
            </Menu.Item>
            <Menu.Item
              style={menuHasOptionStyle}
              onClick={() => {
                localStore.set(ORIGIN, 'newworld');
                forceUpdate();
              }}
            >
              <span>雷神战锤</span>
              <SwitchOriginIcon origin="newworld" />
            </Menu.Item>
            {/* <Menu.Item>Mori Summer</Menu.Item>
            <Menu.Item>漆黑烈焰</Menu.Item> */}
          </SubMenu>

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
          <SubMenu key="setting" title={<span>设置</span>}>
            <Menu.Item key="splash" style={menuHasOptionStyle}>
              <span>启动页</span>
              <Switch
                size="small"
                onClick={() => {
                  localStore.set(IS_SPLASH, !localStore.get(IS_SPLASH));
                  forceUpdate();
                }}
                checked={localStore.get(IS_SPLASH)}
              />
            </Menu.Item>
            <Menu.Item key="theme-mode" style={menuHasOptionStyle}>
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
          src={require('../../assets/image/icon/rikkia.svg')}
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
