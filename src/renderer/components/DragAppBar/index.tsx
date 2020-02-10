import React, { FC, useReducer } from 'react';
import ClickDown from '../ClickDown';
import './index.css';
import { RIcon } from '..';

const DragAppBar: FC<any> = function(props) {
  const { onClose, onMini, title } = props;
  const isNight = new Date().getHours() > 18;
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div
      style={
        {
          width: '100%',
          height: 20,
          top: 0,
          WebkitAppRegion: 'drag',
          position: 'relative',
          background: `url(${
            isNight ? require('../../assets/night.gif') : require('../../assets/day.gif')
          }) no-repeat center/cover`,
          backgroundPositionY: '70%',
          textAlign: 'center'
        } as any
      }
    >
      <span id="app-title">{document.title}</span>
      <div style={{ display: 'inline-block', position: 'absolute', right: 5, top: 1 }}>
        {!!onMini ? (
          <ClickDown>
            <RIcon
              src={require('../../assets/down.svg')}
              size={[16, 16]}
              style={{ marginRight: 10, WebkitAppRegion: 'no-drag' }}
              onClick={onMini}
            />
          </ClickDown>
        ) : null}
        {!!onClose ? (
          <ClickDown>
            <RIcon
              style={{
                WebkitAppRegion: 'no-drag'
              }}
              src={require('../../assets/close.svg')}
              onClick={onClose}
              size={[16, 16]}
            />
          </ClickDown>
        ) : null}
      </div>
    </div>
  );
};

export default DragAppBar;
