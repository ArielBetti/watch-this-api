var express = require("express");
var router = express.Router();
const verifyJWT = require("../middleware");

// models
const List = require("../models/List");

router.get("/", verifyJWT, async function (req, res) {
  const param = req.query;

  const findList = await List.find({
    create_by: { $regex: `^${param.user_name}$`, $options: "igm" },
  });

  if (!findList) {
    return res.status(201).send({
      lists: [],
    });
  }

  return res.status(200).send({ lists: findList });
});

module.exports = router;
