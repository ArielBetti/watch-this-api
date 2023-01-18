var express = require("express");
var router = express.Router();
const verifyJWT = require("../middleware");

// models
const List = require("../models/List");

router.delete("/", verifyJWT, async function (req, res) {
  const body = req.body;

  const { _id: id } = req.decoded;

  const findList = await List.findOne({ id: body.id }).select("create_byId");

  if (body?.create_by || body?.create_byId) {
    return res.status(400).send({
      error: true,
      message: "Parametros inválidos",
    });
  }

  if (id !== findList?.create_byId.toString()) {
    return res.status(401).send({
      error: true,
      message: "Essa lista não pertence a esse usuário",
    });
  }

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
