const mongoose = require('mongoose');

//// -------------------------------------------------////
//// ------ MonogDB Connection through Mongoose ------////
//// -------------------------------------------------////
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bonzaiCollective")
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.error("MongoDB connection error: ", err));

module.exports = mongoose.connection;