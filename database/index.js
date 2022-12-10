require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.DATA_BASE_CONNECTION_STRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
