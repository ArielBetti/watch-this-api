var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const verifyJWT = require("../middleware");

// models
const List = require("../models/List");

router.post("/", verifyJWT, async function (req, res) {
  const body = req.body;
  const id = crypto.randomBytes(5).toString("hex");

  const findList = await List.findOne({ id });

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

  if (!body.create_by) {
    return res.status(400).send({
      error: true,
      message:
        "Ocorreu um erro com a sua sessão por favor faça login novamente.",
    });
  }

  if (!body.list || body.list.length <= 0) {
    return res.status(400).send({
      error: true,
      message: "Informe pelo menos um titulo.",
    });
  }

  const response = {
    ...body,
    id,
  };

  const list = new List(response);

  list.save().then((doc) => res.status(200).send(doc));
});

module.exports = router;
