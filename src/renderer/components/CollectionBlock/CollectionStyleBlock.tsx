import React, { FC, useReducer } from 'react';
import { localStore } from '@/utils';
import { Row, Col, InputNumber, Icon, Input } from 'antd';
import Scrollbars from 'react-custom-scrollbars';
import { Loading, ClickDown } from '..';

interface CollectionStyleProp {}

const SETTING_REVERSE = 'setting.collectionsIsReverse';
const SETTING_COLLECTION_STYLE = 'setting.collectionsStyle';

const CollectionStyleBlock: FC<any> = function(props) {
  const { collections, ...rest } = props;
  const isReverse = localStore.get(SETTING_REVERSE);
  const isBar = localStore.get(SETTING_COLLECTION_STYLE) === 'bar';
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const lastCollections = [
      ['132131', '212312321', '321333333333333333333dsadasdas'],
      ['132131', '212312321', '3213333333333333333dsadsa33'],
      ['132131', '212312321', '321333333333333333333'],
      ['132131', '212312321', '321333333333333333333']
    ] /* useMemo(() => collections.vid.reverse(), [isReverse, src]) */;

  return (
    <div {...rest}>
      <div
        style={{
          padding: '10px'
        }}
      >
        <Row type="flex" align="middle">
          <Col span={12}>
            <Input
              style={{ minWidth: '100px', width: '140px' }}
              size="small"
              placeholder="跳转到"
              addonAfter={
                <ClickDown style={{ display: 'flex', alignItem: 'center' }}>
                  <Icon type="search" />
                </ClickDown>
              }
            />
          </Col>
          <Col
            span={12}
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <ClickDown
              onClick={() => {
                localStore.set(SETTING_REVERSE, !isReverse);
                forceUpdate(null);
              }}
            >
              {isReverse ? (
                <Icon type="sort-ascending" style={{ fontSize: '24px' }} />
              ) : (
                <Icon type="sort-descending" style={{ fontSize: '24px' }} />
              )}
            </ClickDown>
            <ClickDown
              onClick={() => {
                localStore.set(SETTING_COLLECTION_STYLE, isBar ? 'block' : 'bar');
                forceUpdate(null);
              }}
            >
              {isBar ? (
                <Icon type="appstore" style={{ fontSize: '24px', margin: '0 15px' }} />
              ) : (
                <Icon type="unordered-list" style={{ fontSize: '24px', margin: '0 15px' }} />
              )}
            </ClickDown>
          </Col>
        </Row>
      </div>
      <Scrollbars style={{ height: '92%', width: '100%' }}>
        {lastCollections.length === 1 ? <Loading /> : <div />}
      </Scrollbars>
    </div>
  );
};

export default CollectionStyleBlock;
