var express = require("express");
var router = express.Router();

// models
const List = require("../models/List");

router.get("/", async function (req, res) {
  const param = req.query;

  const findList = await List.findOne({ id: param.id });

  if (!findList) {
    return res.status(201).send({
      error: true,
      message: "Não encontramos essa lista.",
    });
  }

  return res.status(200).send({ list: findList });
});

module.exports = router;
