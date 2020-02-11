import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import { DragAppBar } from '@/components';
import { useTitle } from '@/utils';

const SearchResult: FC = function() {
  useEffect(() => {
    ipcRenderer.on('message', (event, args) => {
      console.log(args);
    });
  }, []);

  useTitle('搜索');

  return (
    <div>
      <DragAppBar
        onClose={() => {
          window.close();
        }}
      />
    </div>
  );
};
