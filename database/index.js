require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://watchthis:${process.env.DATA_BASE_PASSWORD}@watch-this-cluster.uufoq35.mongodb.net/watch-this?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) console.log("MongoDB has connected successfully.");
    if (err) console.log("@!erro", err);
  }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
