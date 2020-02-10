import React, { FC } from 'react';
import pkg from '../../../package.json';

const Foot: FC<any> = function(props) {
  return (
    <div
      style={{
        width: '100%',
        marginTop: '60px',
        height: '120px',
        fontSize: '13px',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '30px',
          bottom: '25px'
        }}
      >
        <span style={{ color: '#000' }}>Gtihub: </span>
        <a href="https://www.github.com/sewerganger/rikka">{pkg.author.alias}</a>
      </div>
    </div>
  );
};

export default Foot;
