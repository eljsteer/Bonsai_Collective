const db = require("./config/connection");
const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");
const { typeDefs, resolvers } = require("./schema");
const { getUserFromToken } = require("./utils/authServer");
const app = express();
const httpServer = http.createServer(app);

// ------ Set the correct port, using the environment variable provided by Render or default to 3001 ------>>
const PORT = process.env.PORT || 3001;
const allowedOrigins = ["https://bonsai-collective.onrender.com", "http://localhost:3000"];

// ------ Apply CORS globally ------>>
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Serve static files in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..src/client/dist')));
  
  // Catch-all route to serve index.html for any unknown paths
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..src/client/dist/index.html'));
  });
}


//// ------ Set up Apollo Server ------>>
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

//// ------ Start Apollo Server with Express integration ------>>
const startApolloServer = async () => {
  await server.start();
  
  // Express middleware with Apollo Server integration
  app.use(
    "/graphql",
    express.json(), 
    express.urlencoded({ extended: true }), 
    expressMiddleware(server, {
      context: async ({ req }) => ({
        user: await getUserFromToken(req),
      }),
    }),
  );

  // Start backend server
  db.once("open", () => {
    httpServer.listen({ port: PORT }, () => {
      console.log(`🔥 API server running on port ${PORT}`);
      console.log(`🌍 GraphQL in use at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
