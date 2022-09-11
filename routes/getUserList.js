var express = require("express");
var router = express.Router();
const verifyJWT = require("../middleware");

// models
const List = require("../models/List");

router.get("/", verifyJWT, async function (req, res) {
  const { _id: id } = req.decoded;

  const findList = await List.find({
    create_byId: id,
  });

  if (!findList) {
    return res.status(201).send([]);
  }

  return res.status(200).send(findList);
});

module.exports = router;
