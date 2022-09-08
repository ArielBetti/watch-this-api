var express = require("express");
var router = express.Router();
const verifyJWT = require("../middleware");
const parseJwt = require("../utils/parseJwt");

// models
const List = require("../models/List");
const User = require("../models/User");

router.put("/", verifyJWT, async function (req, res) {
  const body = req.body;

  const { id } = parseJwt(req.headers.authorization);

  const findById = await User.findById(id);

  const findList = await List.findOne({ id: body.id }).select("create_byId");

  if (body?.create_by || body?.create_byId) {
    return res.status(400).send({
      error: true,
      message: "Parametros inválidos",
    });
  }

  if (findById?._id?.toString() !== findList?.create_byId) {
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
  const update = { list: body.list };

  let doc = await List.findOneAndUpdate(filter, update, {
    new: true,
  });

  return res
    .status(200)
    .send({ message: "Lista atualizada com sucesso!", list: doc.list });
});

module.exports = router;
