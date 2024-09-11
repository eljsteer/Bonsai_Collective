const db = require('./config/connection');
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { typeDefs, resolvers } = require('./schema');
const { getUserFromToken } = require('./utils/authServer');
const app = express();
const httpServer = http.createServer(app);

// ------ Set the correct port, using the environment variable provided by Render or default to 5000 ------>>
const PORT = process.env.PORT || 3001;


//// ------ Sets up new Apollo Server ------>>
//// --------------------------------------->>
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

//// ------ Serve static files in production mode ------>>
//// --------------------------------------------------->>
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}



//// ------ Start Apollo Server with Express integration ------>>
//// ---------------------------------------------------------->>
const startApolloServer = async () => {
  await server.start();
  app.use(
    '/graphql', 
    cors({
      origin: 'https://bonsai-collective.onrender.com',
      credentials: true,
    }), 
    express.json(), 
    express.urlencoded({ extended: true }), 
    expressMiddleware(server, {
      context: async ({ req }) => ({
        user: await getUserFromToken(req),
      }),
    }),
  );

//// ------ Start backend server ------>>
//// ---------------------------------->>
  db.once('open', () => {
    httpServer.listen({ port: PORT }, () => {
      console.log(`🔥 API server running on port ${PORT}`);
      console.log(`🌍 GraphQL in use at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();


