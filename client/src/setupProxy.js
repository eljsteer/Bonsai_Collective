import { createProxyMiddleware } from 'http-proxy-middleware';

function CreateProxy(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
}

export default CreateProxy