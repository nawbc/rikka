import React, { FC, useState, ImgHTMLAttributes } from 'react';
import './index.css';
// import './card.css';
import { NavLink } from 'react-router-dom';

export interface CardProps {
  imgSrc?: string;
  url?: string;
  subTitle?: string;
  desc?: string;
  videoName?: string;
}

const Card: FC<CardProps> = function(props) {
  const { imgSrc, videoName, url, subTitle, desc, ...rest } = props;

  return (
    <div className="card" {...rest}>
      <img
        src={imgSrc}
        onError={e => {
          const errorTarget = e.target as HTMLImageElement;
          errorTarget.src = require('../../assets/error_img.jpg');
        }}
      />
      <div className="data">
        <div className="content">
          <p className="title">
            <NavLink to={`play${url || ''}${videoName}`}>{videoName}</NavLink>
          </p>
          <span className="author">{subTitle || '不可视之境界'}</span>
          <p className="text">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
