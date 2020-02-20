import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import { ScrollBar } from '@/components';

const Ads: FC<any> = function() {
  return (
    <div style={{ width: '1000px', height: '1000px' }}>
      <ScrollBar>敬请期待</ScrollBar>
    </div>
  );
};

export default withRouter(Ads);
