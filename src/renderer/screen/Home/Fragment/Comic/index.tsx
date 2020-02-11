import React, { FC, useState, useLayoutEffect, useEffect } from 'react';

import { Card, Nav, Foot, ScrollBar } from '@/components';
import { createComic, Areas, ComicKind } from '@/api/halihali';
import { VideoListData } from '@/api/halihali/halihali.interface';
import { Pagination } from 'antd';

export const Comic: FC = function() {
  const [cards, setCards] = useState<VideoListData[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    createComic({ area: Areas['日本'], page }).then(val => {
      setCards(val);
    });
  }, [page]);

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
                  url={val.url}
                  videoName={val.title}
                  subTitle={val.episode}
                />
              );
            })
          : null}
        <Pagination
          defaultCurrent={1}
          total={3240}
          onChange={(num: number) => {
            setPage(num);
          }}
        />
        <Foot />
      </div>
    </ScrollBar>
  );
};
