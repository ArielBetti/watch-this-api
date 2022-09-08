var express = require("express");
var router = express.Router();
const verifyJWT = require("../middleware");
const parseJwt = require("../utils/parseJwt");


// models
const List = require("../models/List");
const User = require("../models/User");

router.get("/", verifyJWT, async function (req, res) {
  const { id } = parseJwt(req?.headers?.authorization);

  const user = await User.findById(id);

  const findList = await List.find({
    create_by: { $regex: `^${user?.name}$`, $options: "igm" },
  });

  if (!findList) {
    return res.status(201).send({
      lists: [],
    });
  }

  return res.status(200).send({ lists: findList });
});

module.exports = router;
