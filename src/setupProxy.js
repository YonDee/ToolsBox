  const proxy = require('http-proxy-middleware');

  module.exports = function(app) {
    app.use('/taobao', proxy({
      target: 'http://api.m.taobao.com',
      changeOrigin: true
    }));
  };