var express = require("express");
var router = express.Router();
const authServices = require("../services/auth");

const { comparePasswords, generateToken } = authServices;

require("dotenv").config();

// models
const User = require("../models/User");

/* GET users listing. */
router.post("/", async function (req, res) {
  const body = req.body;
  const user = await User.findOne({
    name: { $regex: `^${body.name}$`, $options: "igm" },
  });

  if (user) {
    User.findOne({
      name: { $regex: `^${body.name}$`, $options: "igm" },
    })
      .select("password")
      .exec(async function (__err, userInfo) {
        if (userInfo.password && body.password) {
          const validPassword = await comparePasswords(
            body.password,
            userInfo.password
          );

          if (validPassword) {
            const token = generateToken(user.toJSON());

            return res
              .status(200)
              .json({ message: "Usuário logado!", user, token });
          } else {
            res.status(400).json({ error: true, message: "Senha incorreta" });
          }
        } else {
          return res
            .status(400)
            .json({ error: true, message: "Digite uma senha." });
        }
      });
  } else {
    res.status(404).json({ error: true, message: "Usuário não encontrado." });
  }
});

module.exports = router;
