import React, { FC, useState, useLayoutEffect } from 'react';
import { ScrollBar, UpdateList } from '@/components';
import { createUpdateList } from '@/api/halihali';
import { UpdateCollections } from '@/api/halihali/halihali.interface';
import AV from 'leancloud-storage';

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
        <button>Fuck</button>
      </div>
    </ScrollBar>
  );
};
