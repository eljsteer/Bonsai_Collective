const mongoose = require('mongoose');

const dotenv = require('dotenv');

// Load .env file
dotenv.config();

//// -------------------------------------------------////
//// ------ MonogDB Connection through Mongoose ------////
//// -------------------------------------------------////
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.error("MongoDB connection error: ", err));

module.exports = mongoose.connection;