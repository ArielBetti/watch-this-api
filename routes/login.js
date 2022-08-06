var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// models
const User = require("../models/User");

/* GET users listing. */
router.post("/", async function (req, res) {
  const body = req.body;
  const user = await User.findOne({ name: body.name });

  if (user) {
    // check user password with hashed password stored in the database

    User.findOne({ name: body.name })
      .select("password")
      .exec(async function (__err, userInfo) {
        if (userInfo.password && body.password) {
          const validPassword = await bcrypt.compare(
            body.password,
            userInfo.password
          );

          if (validPassword) {
            const token = jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: 10800000, // expires in 3hours
              }
            );

            return res
              .status(200)
              .json({ message: "Usuário logado!", user, token });
          } else {
            res.status(400).json({ error: "Senha incorreta" });
          }
        } else {
          return res.status(401).json({ error: "Digite uma senha." });
        }
      });
  } else {
    res.status(401).json({ error: "Usuário não encontrado." });
  }
});

module.exports = router;
