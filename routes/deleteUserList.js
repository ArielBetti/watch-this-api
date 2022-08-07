var express = require("express");
var router = express.Router();
const verifyJWT = require("../middleware");

// models
const List = require("../models/List");

router.delete("/", verifyJWT, async function (req, res) {
  const body = req.body;

  const findList = await List.findOne({ id: body.id });

  console.log("@@#", body);

  if (!findList) {
    return res.status(404).send({
      error: true,
      message: "Não encontramos essa lista.",
    });
  }

  const filter = { id: body.id };

  await List.findOneAndDelete(filter)
    .then(res.status(200).send({ message: "Lista deletada com sucesso!" }))
    .catch((err) => next(err));
});

module.exports = router;
