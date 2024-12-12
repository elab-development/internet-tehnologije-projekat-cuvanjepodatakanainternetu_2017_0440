const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://login.microsoftonline.com',
      changeOrigin: true,
      pathRewrite: (path, req) => {
        return path.replace('/api/', '/');
      },
    })
  );
};
