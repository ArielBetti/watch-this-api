var express = require("express");
var router = express.Router();
const verifyJWT = require("../middleware");

// models
const List = require("../models/List");

router.put("/", verifyJWT, async function (req, res) {
  const body = req.body;

  const findList = await List.findOne({ id: body.id });

  if (!findList) {
    return res.status(404).send({
      error: true,
      message: "Não encontramos essa lista.",
    });
  }

  const filter = { id: body.id };
  const update = { list: body.list };

  let doc = await List.findOneAndUpdate(filter, update, {
    new: true,
  });

  return res
    .status(200)
    .send({ message: "Lista atualizada com sucesso!", list: doc.list });
});

module.exports = router;
