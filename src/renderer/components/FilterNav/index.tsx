import React, { FC, useState, useReducer, HTMLAttributes } from 'react';
import { Areas, Years } from '@/api/halihali';
import { Row, Col, Drawer } from 'antd';
import { ClickDown } from '../';
import { ComicKind, MovieKind, SeriesKind } from '@/api/halihali/enum';
import './index.css';

type MainKind = typeof ComicKind | typeof MovieKind | typeof SeriesKind;

interface NavProp extends HTMLAttributes<any> {
  onYear: (year: number) => void;
  onArea: (area: string) => void;
  onKind: (kind: number) => void;
  mainKind: MainKind;
  year: number;
  area: string;
  kind: number;
}

const Nav: FC<NavProp> = function(props) {
  const { kind, onArea, onKind, onYear, year, area, mainKind, ...rest } = props;
  const [display, setDisplay] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const block = (k: object, type: string) =>
    Reflect.ownKeys(k).map((val, index) => {
      const yearCode = (Years as any)[val];
      const areaStr = (Areas as any)[val];
      const kindCode = (mainKind as any)[val];
      const cn =
        (type === 'area' && area === areaStr) ||
        (type === 'year' && year === yearCode) ||
        (type === 'kind' && kind === kindCode)
          ? 'nav-selected'
          : '';
      return (
        <Col
          className={cn}
          span={4}
          key={index}
          style={{ textAlign: 'center', marginBottom: 13 }}
          onClick={() => {
            switch (type) {
              case 'kind':
                onKind(kindCode);
                break;
              case 'year':
                onYear(yearCode);
                break;
              case 'area':
                onArea(areaStr);
                break;
            }
            forceUpdate();
          }}
        >
          <ClickDown>
            <span>{val}</span>
          </ClickDown>
        </Col>
      );
    });

  return (
    <>
      <div
        {...rest}
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
          <Row>{block(mainKind, 'kind')}</Row>
          <h3 style={{ textAlign: 'center' }}>地区</h3>
          <Row>{block(Areas, 'area')}</Row>
          <h3 style={{ textAlign: 'center' }}>年份</h3>
          <Row>{block(Years, 'year')}</Row>
        </div>
      </Drawer>
    </>
  );
};

export default Nav;
