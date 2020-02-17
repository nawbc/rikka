import React, { FC } from 'react';
import ClickDown from '../ClickDown';
import { RIcon } from '..';
import { NavLink } from 'react-router-dom';

const DragAppBar: FC<any> = function(props) {
  const { onClose, onMini } = props;
  const isNight = new Date().getHours() > 18;

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
          backgroundPositionY: isNight ? '67%' : '45%',
          textAlign: 'center'
        } as any
      }
    >
      <span id="app-title" style={{ lineHeight: '20px', color: '#e8e8e8' }}>
        {document.title}
      </span>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          position: 'absolute',
          right: 5,
          height: '20px'
        }}
      >
        <ClickDown>
          <NavLink to="/setting" style={{ display: 'inline-flex' }}>
            <RIcon
              src={require('../../assets/setting.svg')}
              size={[16, 16]}
              style={{ marginRight: 10, WebkitAppRegion: 'no-drag' }}
            />
          </NavLink>
        </ClickDown>
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
