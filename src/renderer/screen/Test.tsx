import React, { FC, useEffect } from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
// import { ScrollBar, Foot } from "@/components";
import { useWindowResize } from '@/utils';
import { ScrollBar } from '@/components';

const Test: FC = function(props) {
  window.addEventListener('message', e => {
    console.log(e.data);
  });

  return (
    <div style={{ width: '1000px', height: '1000px' }}>
      <ScrollBar>
        <div style={{ width: '1000px', height: '1000px' }} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        dsadsa
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </ScrollBar>
    </div>
  );
};

export default withRouter(Test);
