import React, { FC } from 'react';
import './index.css';

export const About: FC = function(props) {
  return (
    <div id="Awesome" className="anim750">
      <div className="reveal circle_wrapper">
        <div className="circle">Hello!</div>
      </div>

      <div className="sticky anim750">
        <div className="front circle_wrapper anim750">
          <div className="circle anim750" />
        </div>
      </div>

      <h4>Peel Me!</h4>

      <div className="sticky anim750">
        <div className="back circle_wrapper anim750">
          <div className="circle anim750" />
        </div>
      </div>
    </div>
  );
};
