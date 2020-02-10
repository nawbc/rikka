/* code from https://codepen.io/nourabusoud/pen/ypZzMM */

import React, { FC, useRef } from 'react';
import './index.css';
import { is } from '@/utils';

const MainButton: FC<any> = function(props) {
  const btn = useRef(null);
  const { children, onClick, className, ...rest } = props;

  return (
    <button
      {...rest}
      ref={btn}
      className={'bubbly-button ' + className}
      onClick={(e: any) => {
        e.persist();
        const button = (btn.current as unknown) as HTMLButtonElement;
        button.classList.add('animate');
        setTimeout(function() {
          button.classList.remove('animate');
        }, 450);
        is.function(onClick) && onClick(button);
      }}
    >
      {children}
    </button>
  );
};

export default MainButton;
