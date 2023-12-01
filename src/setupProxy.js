//install http-proxy-middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'https://dev.milton.in/',
      changeOrigin: true,
    })
  );
};