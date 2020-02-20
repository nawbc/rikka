import React, { FC, HTMLAttributes, SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export interface CardProps extends HTMLAttributes<any> {
  imgSrc?: string;
  url?: string;
  subTitle?: string;
  desc?: string;
  videoName?: string;
  onImgLoadError?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
}

const Card: FC<CardProps> = function(props) {
  const { onImgLoadError, imgSrc, videoName, url, subTitle, desc, ...rest } = props;

  return (
    <div className="card" {...rest}>
      <img
        src={imgSrc}
        onError={e => {
          console.log(e);
          !!onImgLoadError && onImgLoadError(e);
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
