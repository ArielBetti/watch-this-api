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
  list: {
    type: Schema.Types.Mixed,
    require: true,
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
