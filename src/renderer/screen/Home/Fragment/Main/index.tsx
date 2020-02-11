import React, { FC, useState, useLayoutEffect } from 'react';
import { Card, Nav, Foot, ScrollBar, UpdateList } from '@/components';
import { createComic, Areas, ComicKind, createUpdateList } from '@/api/halihali';
import { UpdateCollections } from '@/api/halihali/halihali.interface';
import { NavLink } from 'react-router-dom';
import { ipcRenderer } from 'electron';

const initData = [[{}]];

export const Main: FC = function() {
  const [updateList, setUpdateList] = useState<UpdateCollections>([]);

  useLayoutEffect(() => {
    createUpdateList().then(data => {
      setUpdateList(data);
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
        <UpdateList lists={updateList} />
      </div>
    </ScrollBar>
  );
};
