import React, { FC, useEffect, useRef, useState } from 'react';
import DPlayer, { DPlayerOptions } from 'dplayer';
import { settingIcon } from './Icons';
import './index.css';
import { CollectionList } from './CollectionList';
import { Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import { VideoSrcApi } from '@/api/halihali/videoApi';

type Collections = { url?: string; name?: string }[];

interface PlayerOptions {
  options?: DPlayerOptions;
  src: VideoSrcApi;
}

const Player: FC<PlayerOptions> = function(props) {
  const wrapper = useRef(null);

  const [display, setDisplay] = useState(false);
  const { src } = props;
  const url = src.currentVideo.url;

  const createSelectCollectionEle = function() {
    const div = document.createElement('div');
    div.className = 'play-sm-1';
    div.innerHTML = `<div style="height:20px">选集</div>`;
    div.onclick = () => {
      setDisplay(true);
    };
    return div;
  };
  useEffect(() => {
    const playerWrapper = (wrapper.current as unknown) as HTMLDivElement;
    new DPlayer({
      video: {
        url
      },
      screenshot: true,
      container: playerWrapper,
      preload: 'metadata',
      theme: '#3d30f0',
      ...props.options
    });

    const icons = playerWrapper.getElementsByClassName('dplayer-icon-content');
    const rightSetting = playerWrapper.getElementsByClassName('dplayer-icons-right')[0];
    const settingNode = playerWrapper.getElementsByClassName('dplayer-setting')[0];

    const selectCollectionBtn = createSelectCollectionEle();
    rightSetting.insertBefore(selectCollectionBtn, settingNode);

    icons[5].innerHTML = settingIcon;
  }, [props.options, url]);

  return (
    <div className="player-container">
      <div id="player" className="player-wrapper" ref={wrapper} />
      <CollectionList
        display={display}
        close={() => {
          setDisplay(false);
        }}
      >
        {/*       {Array.isArray(collections)
          ? collections.map((val, index) => (
              <Row className="collection-row" key={index}>
                <Col
                  span={6}
                  style={{
                    textAlign: "center",
                    height: "60px",
                    lineHeight: "60px"
                  }}
                >
                  {index}
                </Col>
                <Col
                  span={18}
                  style={{
                    height: "60px",
                    lineHeight: "60px"
                  }}
                >
                  <NavLink to={val.url!}>{val.name}</NavLink>
                </Col>
              </Row>
            ))
                : null} */}
      </CollectionList>
    </div>
  );
};

export default Player;

// padding: 8.5px;
