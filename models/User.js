const mongoose = require("../database");

const userSchema = new mongoose.Schema({
  avatar: {
    type: {
      accessoires: [String],
      backgroundColor: [String],
      eyes: [String],
      eyebrows: [String],
      mouth: [String],
      flip: Boolean,
      url: String,
    },
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
