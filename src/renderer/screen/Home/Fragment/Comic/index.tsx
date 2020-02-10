import React, { FC, useState, useLayoutEffect, useEffect } from 'react';

import { Card, Nav, Foot, ScrollBar } from '@/components';
import { createComic, Areas, ComicKind } from '@/api/halihali';
import { VideoListData } from '@/api/halihali/halihali.interface';

export const Comic: FC = function() {
  const [cards, setCards] = useState<VideoListData[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    createComic({ area: Areas['日本'], page }).then(val => {
      setCards(val);
    });
  });

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
                  videoId={val.url}
                  videoName={val.title}
                  subTitle={val.episode}
                />
              );
            })
          : null}
        <button
          onClick={() => {
            console.log(1111);
            setPage(page + 1);
          }}
        >
          next
        </button>
        <Foot />
      </div>
    </ScrollBar>
  );
};
