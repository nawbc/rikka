import React, { FC, useState, useLayoutEffect } from 'react';

import { Card, Nav, Foot, ScrollBar } from '@/components';
import { createComic, Areas, ComicKind, createUpdateList } from '@/api/halihali';
import { VideoListData } from '@/api/halihali/halihali.interface';

export const Main: FC = function() {
  const [updateList, setUpdateList] = useState([]);
  const today = new Date().getDay() - 1;

  useLayoutEffect(() => {
    createUpdateList().then(data => {
      console.log(data);
    });
  }, []);

  return (
    <ScrollBar>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          marginTop: '40px',
          padding: '0 20px'
        }}
      >
        sadasd
      </div>
    </ScrollBar>
  );
};
