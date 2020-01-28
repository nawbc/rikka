import React, { FC, useState, useLayoutEffect } from 'react';

import { Card, Nav, Foot, ScrollBar } from '@/components';
import { createComic, Areas, ComicKind } from '@/api/halihali';
import { VideoListData } from '@/api/halihali/halihali.interface';

export const Comic: FC = function() {
  const [cards, setCards] = useState<VideoListData[]>([]);

  useLayoutEffect(() => {
    createComic({ area: Areas['日本'] }).then(val => {
      setCards(val);
    });
  }, []);

  return (
    <ScrollBar>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          position: 'relative',
          marginTop: '40px',
          padding: '0 20px'
        }}
      >
        <Nav kind={ComicKind} />
        {!!cards && cards.length !== 0
          ? cards.map((val, index) => {
              return (
                <Card
                  key={index}
                  imgSrc={val.thumbUrl}
                  videoId={new URL(val.url!).pathname}
                  videoName={val.title}
                  subTitle={val.episode}
                />
              );
            })
          : null}
        <Foot />
      </div>
    </ScrollBar>
  );
};
