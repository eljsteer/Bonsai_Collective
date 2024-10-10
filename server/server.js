const db = require("./config/connection");
const express = require("express");
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
const isDevelopment = process.env.NODE_ENV === "development"

const corsOptions = {
  origin: isDevelopment
    ? "http://localhost:5173"
    : ["https://bonsai-collective.onrender.com", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};


// ------ Apply CORS globally ------>>
app.use(cors(corsOptions));

// Handle preflight requests for CORS
app.options('*', cors(corsOptions)); // This should handle OPTIONS preflight requests properly

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

//// ------ Set up Apollo Server ------>>
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (err) => {
    console.error(err);
    return err;
  },
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
    })
  );

  // Start backend server
  db.once("open", () => {
    httpServer.listen({ port: PORT }, () => {
      console.log(`🔥 API server running on port ${PORT}`);
      console.log(`🌍 GraphQL in use at http://localhost:${PORT}/graphql`);
    });
  });
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

startApolloServer();
