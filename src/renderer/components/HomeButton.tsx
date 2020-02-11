import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { MainButton, RIcon, MenuDrawer } from '.';

const HomeButton: FC<any> = function(props) {
  return (
    <div
      style={{
        position: 'fixed',
        right: '30px',
        bottom: '25px'
      }}
    >
      <NavLink
        to="/"
        draggable={false}
        onClick={() => {
          // console.log()
        }}
      >
        <MainButton className="home-button">
          <RIcon
            src={require('../assets/home.svg')}
            size={[25, 25]}
            style={{
              transform: 'translate(-1px, 2px)'
            }}
          />
        </MainButton>
      </NavLink>
    </div>
  );
};

export default HomeButton;
