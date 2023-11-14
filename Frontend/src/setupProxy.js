const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://homestays-management-api.vercel.app', // Your backend server URL
      // target:'http://localhost:5000', 
      changeOrigin: true,
      // secure: false,
    })
  );
};