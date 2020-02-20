import React, { FC, useState, useLayoutEffect } from 'react';
import { ScrollBar, UpdateList, Card, RIcon } from '@/components';
import { createUpdateList } from '@/api/halihali';
import { UpdateCollections } from '@/api/halihali/halihali.interface';
import AV from 'leancloud-storage';
import { useTitle, APP_MAIN_TITLE } from '@/utils';

export const Main: FC = function() {
  const [updateList, setUpdateList] = useState<UpdateCollections>([]);

  useLayoutEffect(() => {
    createUpdateList().then(data => {
      setUpdateList(data);
    });
  }, []);

  useTitle(APP_MAIN_TITLE);

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
        <div
          style={{
            position: 'relative',
            minHeight: '400px'
          }}
        >
          <div style={{}} />
          <UpdateList
            className="clean-float"
            lists={updateList}
            style={{
              width: 300,
              height: 400,
              display: 'inline-block',
              float: 'right',
              position: 'relative',
              right: 60
            }}
          />
        </div>

        <div style={{ marginTop: 50, padding: 5 }}>
          <RIcon size={[50, 50]} />
        </div>

        <div
          style={{
            width: '100%',
            margin: '40px 0  80px 0'
          }}
        >
          <Card />
        </div>
      </div>
    </ScrollBar>
  );
};
