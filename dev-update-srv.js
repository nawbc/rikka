const liveServer = require('live-server');

const params = {
  port: 80,
  host: 'localhost',
  root: 'build',
  open: false,
  wait: 1000,
  logLevel: 2
};
liveServer.start(params);
