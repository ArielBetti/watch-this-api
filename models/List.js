const mongoose = require("../database");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  create_by: {
    type: String,
    require: true,
  },
  create_byId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    select: false,
  },
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
  list: {
    type: [
      {
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
          require: false,
        },
        name: {
          type: String,
          require: false,
        },
        vote_average: {
          type: String,
          require: true,
        },
      },
    ],
    require: true,
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
