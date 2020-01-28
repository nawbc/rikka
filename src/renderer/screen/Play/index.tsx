import React, { FC, useEffect, useState, useMemo } from 'react';
import { Player, CollectionBlock } from '@/components';
import { VideoApi, VideoSrcApi } from '@/api/halihali/videoApi';
import { useTitle } from '@/utils';
import { halihaliUrl, createIntroduce } from '@/api/halihali';
import { format } from 'url';

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
  // const { id, type } = props.match.params;
  const [src, setSrc] = useState<VideoSrcApi>(initVideo);
  const [collection, selectCollection] = useState(0);
  const [origin, setOrigin] = useState(1);
  const id = 6616,
    type = 'acg';
  const introUrl = format({
    host: halihaliUrl,
    pathname: `${type}/${id}/`
  });

  useTitle('勇者很强');
  const currentVideo = useMemo(async () => {
    return new VideoApi(introUrl + '1.html', type).init();
  }, [type]);

  const introduce = useMemo(async () => {
    return createIntroduce(introUrl);
  }, [introUrl]);

  // useEffect(() => {
  //   currentVideo
  //     .then(e => e.index(collection))
  //     .then(e => e.origin(origin))
  //     .then(data => {
  //       console.log(data);
  //       setSrc(data);
  //     })
  //     .catch(err => {
  //       console.log(11, err);
  //     });
  // }, [collection, src]);

  return (
    <>
      <Player src={src} />
      <CollectionBlock
        onSetOrigin={num => {
          setOrigin(num);
        }}
        src={src}
        intro={introduce}
        onSelectCollection={num => {
          selectCollection(num);
        }}
      />
    </>
  );
};

export default Play;
