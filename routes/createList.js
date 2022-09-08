var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const verifyJWT = require("../middleware");
const parseJwt = require("../utils/parseJwt");

// models
const List = require("../models/List");
const User = require("../models/User");

router.post("/", verifyJWT, async function (req, res) {
  const body = req.body;
  const listId = crypto.randomBytes(5).toString("hex");

  const { id } = parseJwt(req.headers.authorization);

  const user = await User.findById(id);

  const findList = await List.findOne({ id: listId });

  if (!user) {
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
    create_by: user?.name,
    create_byId: user?._id,
    id: listId,
    ...body,
  };

  const list = new List(response);

  list.save().then((doc) => res.status(200).send(doc));
});

module.exports = router;
