import React, { FC, useState } from 'react';
import { Areas, Years } from '@/api/halihali';
import { Row, Col, Drawer } from 'antd';
import { ClickDown } from '.';

const Nav: FC<any> = function(props) {
  const { kind } = props;
  const [display, setDisplay] = useState(false);
  const block = (k: object) =>
    Reflect.ownKeys(k).map((val, index) => (
      <Col span={4} key={index} style={{ textAlign: 'center', marginBottom: '5px' }}>
        <span>{val}</span>
      </Col>
    ));

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '0px',
          right: '20px',
          zIndex: 999
        }}
        onClick={() => {
          setDisplay(true);
        }}
      >
        <ClickDown>筛选</ClickDown>
      </div>
      <Drawer
        height="auto"
        width={300}
        placement="top"
        closable={false}
        onClose={() => {
          setDisplay(false);
        }}
        visible={display}
      >
        <div className="nav">
          <h3 style={{ textAlign: 'center' }}>类型</h3>
          <Row>{block(kind)}</Row>
          <h3 style={{ textAlign: 'center' }}>地区</h3>
          <Row>{block(Areas)}</Row>
          <h3 style={{ textAlign: 'center' }}>年份</h3>
          <Row>{block(Years)}</Row>
        </div>
      </Drawer>
    </>
  );
};

export default Nav;
