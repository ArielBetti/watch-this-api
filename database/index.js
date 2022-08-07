require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://watchthis:${process.env.DATA_BASE_PASSWORD}@watch-this-cluster.uufoq35.mongodb.net/watch-this?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
