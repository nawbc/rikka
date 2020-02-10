import React, { FC, useState, useReducer, useMemo } from 'react';
import { Row, Col, Tooltip, Button, Input, Icon } from 'antd';
import CollectionStyleBlock from './CollectionStyleBlock';
import ClickDown from '../ClickDown';
import { RIcon } from '..';
import './index.css';
import { VideoSrcApi } from '@/api/halihali/videoApi';

interface Collection {
  src: VideoSrcApi;
  onSelectCollection: (num: number) => void;
  onSetOrigin: (num: number) => void;
  onLoad?: () => void;
  intro?: {};
}

const CollectionBlock: FC<Collection> = function(props) {
  const { src, intro, onSelectCollection } = props;
  const { collections } = src;
  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        width: '25%',
        height: '100%'
      }}
    >
      <CollectionStyleBlock
        style={{
          height: '35%'
        }}
      />
      <div
        className="rest"
        style={{
          height: '65%'
        }}
      >
        <div className="funcs">
          <ClickDown>
            <Tooltip title="换源" mouseEnterDelay={0.5}>
              <Icon type="interaction" style={{ fontSize: '28px' }} />
            </Tooltip>
          </ClickDown>
          <ClickDown>
            <Tooltip title="下载" mouseEnterDelay={0.5}>
              <Icon type="download" style={{ fontSize: '28px' }} />
            </Tooltip>
          </ClickDown>
          <ClickDown>
            <Tooltip title="追番" mouseEnterDelay={0.5}>
              <Icon type="heart" style={{ fontSize: '28px' }} />
            </Tooltip>
          </ClickDown>
          <ClickDown>
            <Tooltip title="保存到百度云" mouseEnterDelay={0.5}>
              <Icon type="cloud" style={{ fontSize: '28px' }} />
            </Tooltip>
          </ClickDown>
        </div>
        <div className="introduce" />
      </div>
    </div>
  );
};

export default CollectionBlock;
