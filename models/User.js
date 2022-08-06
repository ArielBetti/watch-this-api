const mongoose = require("../database");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
