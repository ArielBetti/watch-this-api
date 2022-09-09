var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const verifyJWT = require("../middleware");

// models
const List = require("../models/List");

router.post("/", verifyJWT, async function (req, res) {
  const body = req.body;
  const listId = crypto.randomBytes(5).toString("hex");

  const { _id: id, name } = req.decoded;

  const findList = await List.findOne({ id: listId });

  if (!id) {
    return res.status(401).send({
      error: true,
      message: "Ocorreu um erro na sua sessão, por favor refaça o seu login",
    });
  }

  if (body?.create_by || body?.create_byId) {
    return res.status(400).send({
      error: true,
      message: "Parametros inválidos",
    });
  }

  if (findList) {
    return res.status(400).send({
      error: true,
      message:
        "Ocorreu um erro no cadastro da lista, por favor tente novamente.",
    });
  }

  if (!body.title) {
    return res.status(400).send({
      error: true,
      message: "Por favor adicione um nome para a lista",
    });
  }

  if (!body.list || body.list.length <= 0) {
    return res.status(400).send({
      error: true,
      message: "Informe pelo menos um titulo.",
    });
  }

  const response = {
    create_by: name,
    create_byId: id,
    id: listId,
    ...body,
  };

  const list = new List(response);

  list.save().then((doc) => res.status(200).send(doc));
});

module.exports = router;
