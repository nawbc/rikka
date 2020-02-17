import React, { FC } from 'react';
import { Avatar, Row, Col, Modal } from 'antd';
import { RIcon, ScrollBar, ListItem, ElectronLink, List, ClickDown } from '@/components';
import { useWindowResize } from '@/utils';
import Package from '../../../../package.json';
import './index.css';
import { BrowserWindowProxy } from 'electron';

const pkg = Package as any;

const Item: FC<any> = function(props) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      {props.children}
    </div>
  );
};

export const About: FC = function(props) {
  const { width, height } = useWindowResize();

  return (
    <div
      style={{
        width,
        height
      }}
    >
      <ScrollBar>
        <div style={{ maxWidth: '600px', margin: '60px auto' }}>
          <Row style={{ background: '#eee', padding: '10px 20px', borderRadius: 5 }}>
            <Col span={6}>
              <Avatar shape="circle" size={100} src={require('../../assets/pay/profile.jpg')} />
            </Col>
            <Col span={18} style={{ fontSize: 16 }}>
              <div
                style={{
                  paddingLeft: 30,
                  justifyContent: 'space-around',
                  height: 150,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Item>
                  <div>
                    <RIcon src={require('../../assets/my.svg')} size={[16, 16]} />
                    &nbsp;&nbsp;
                    <span>作者</span>
                  </div>
                  <i>HanWang</i>
                </Item>
                <Item>
                  <div>
                    <RIcon src={require('../../assets/qq.svg')} size={[20, 20]} />
                    &nbsp;&nbsp;
                    <span>QQ</span>
                  </div>
                  <span>942341345</span>
                </Item>
                <Item>
                  <div>
                    <RIcon src={require('../../assets/qq.svg')} size={[20, 20]} />
                    &nbsp;&nbsp;
                    <span>邮箱</span>
                  </div>
                  <ElectronLink href={`mailto:${pkg.author.email}`}>
                    {pkg.author.email}
                  </ElectronLink>
                </Item>
                <Item>
                  <div>
                    <RIcon src={require('../../assets/github.svg')} size={[20, 20]} />
                    &nbsp;&nbsp;
                    <span>Github</span>
                  </div>
                  <ElectronLink href="https://github.com/dark-flame-bricker">
                    访问 dark-flame-bricker
                  </ElectronLink>
                </Item>
              </div>
            </Col>
          </Row>
          <List>
            {/* <ElectronLink href={pkg.config.qq_group_link}> */}
            <ListItem
              prefixBlock="加入qq群 (bug 反馈, 划水)"
              other={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ClickDown>
                    <button
                      style={{ borderRadius: '7px', color: '#999' }}
                      onClick={() => {
                        const win = (window.open(
                          pkg.config.qq_group_link
                        ) as unknown) as BrowserWindowProxy;

                        setTimeout(() => {
                          win!.close();
                        }, 1000);
                      }}
                    >
                      点击加入
                    </button>
                  </ClickDown>
                  &nbsp;&nbsp;
                  <span>{pkg.config.qq_group}</span>&nbsp;&nbsp;
                  <ClickDown>
                    <RIcon
                      src={require('../../assets/qr.svg')}
                      size={[16, 16]}
                      onClick={() => {
                        Modal.confirm({
                          title: <h3>二维码</h3>,
                          content: (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <img src={require('../../assets/pay/qq_qr.png')} />
                            </div>
                          ),
                          okText: '关闭',
                          cancelText: ' ',
                          icon: ''

                          // onOk() {},
                          // onCancel() {}
                        });
                      }}
                    />
                  </ClickDown>
                </div>
              }
            />
          </List>
          <br />
          <br />
          <h2>捐赠</h2>
        </div>
      </ScrollBar>
    </div>
  );
};
