const mongoose = require("../database");

const itemListSchema = new mongoose.Schema({
  adult: {
    type: Boolean,
    require: true,
  },
  backdrop_path: {
    type: String,
    require: true,
  },
  genres: {
    type: [
      {
        id: Number,
        name: String,
      },
    ],
    require: true,
  },
  id: {
    type: Number,
    require: true,
  },
  imdb_id: {
    type: String,
    require: true,
  },
  overview: {
    type: String,
    require: true,
  },
  poster_path: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  vote_average: {
    type: String,
    require: true,
  },
});

const ItemList = mongoose.model("ItemList", itemListSchema);

module.exports = ItemList;
