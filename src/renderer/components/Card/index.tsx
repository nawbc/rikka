import React, { FC } from 'react';
import './card.css';
import { NavLink } from 'react-router-dom';

export interface CardProps {
  imgSrc?: string;
  videoId?: string;
  subTitle?: string;
  desc?: string;
  videoName?: string;
  videoSrc?: string;
}

const Card: FC<CardProps> = function(props) {
  const { imgSrc, videoName, videoId, videoSrc, subTitle, desc, ...rest } = props;

  return (
    <div className="card" {...rest}>
      <div
        className="wrapper"
        style={{
          background: `url(${imgSrc}) center/cover no-repeat`
        }}
      >
        <div className="data">
          <div className="content">
            <span className="author">{subTitle}</span>
            <p className="title">
              <NavLink to={`/play${videoId || ''}`}>{videoName}</NavLink>
            </p>
            <p className="text">{desc}</p>
            {/* <a href={`${videoId}`} className="button">
              详情
      </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
