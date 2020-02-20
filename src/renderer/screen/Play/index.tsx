import React, { FC, useEffect, useState, useMemo, useContext, useLayoutEffect } from 'react';
import { Player, CollectionBlock } from '@/components';
import { VideoApi, VideoSrcApi } from '@/api/halihali/videoApi';
import { useTitle, useWindowResize } from '@/utils';
import { halihaliUrl, createIntroduce } from '@/api/halihali';
import { format } from 'url';
import log from 'electron-log';
import { notification } from 'antd';
import { ctx } from '@/App';

const initVideo = {
  currentVideo: {
    success: '',
    url: '',
    ext: '',
    play: ''
  },
  collections: {
    vid: [['']],
    yb_url1: [['']],
    yb_url2: [['']]
  },
  type: '',
  initUrl: '',
  videoMakeUp: {
    vid: '',
    yb_url1: '',
    yb_url2: ''
  },
  introduce: {}
};

const Play: FC<any> = function(props) {
  const [src, setSrc] = useState<VideoSrcApi>(initVideo);
  const [collection, selectCollection] = useState(0);
  const [origin, setOrigin] = useState(1);
  const [intro, setIntro] = useState();
  const { height } = useWindowResize();
  const { id, type, name } = props.match.params;

  const introUrl = format({
    host: halihaliUrl,
    pathname: `/${type}/${id}/`
  });

  // useTitle(name);

  const currentVideo = useMemo(async () => {
    return new VideoApi(introUrl + '1.html', type).init();
  }, [type]);

  const introduce = useMemo(async () => {
    return createIntroduce(introUrl);
  }, [introUrl]);

  useLayoutEffect(() => {
    currentVideo
      .then(e => e.index(collection))
      .then(e => e.origin(origin))
      .then(data => {
        console.log(data);
        setSrc(data);
      })
      .catch(err => {
        notification.open({
          message: '错误',
          description: '视频获取错误, 请尝试切换视频源',
          duration: 4
        });
        log.error(err);
      });
  }, [collection, src]);
  ``;

  return (
    <div
      style={{
        height: height - 20,
        position: 'relative'
      }}
    >
      <Player src={src} />
      {/* <CollectionBlock
        onSetOrigin={num => {
          setOrigin(num);
        }}
        src={src}
        intro={intro}
        onSelectCollection={num => {
          selectCollection(num);
        }}
      /> */}
    </div>
  );
};

export default Play;
