import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initLeanCloud } from './api/leancloud';
import log from 'electron-log';

initLeanCloud(err => {
  log.error('Error:leancloud 初始化错误' + err);
});

ReactDOM.render(<App />, document.getElementById('root'));
