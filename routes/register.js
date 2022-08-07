var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

// models
const User = require("../models/User");

/* GET users listing. */
router.post("/", async function (req, res) {
  const { name } = req.body;

  try {
    const findUser = await User.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (findUser) {
      return res.status(400).send({ error: "Esse usuário já existe." });
    }

    // creating a new mongoose doc from user data
    const user = new User(req.body);

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user
      .save()
      .then((doc) => res.status(200).send({ message: `Olá ${doc.name}!` }));
  } catch (err) {
    return res
      .status(400)
      .send({ error: err, message: "O registro de usuário falhou." });
  }
});

module.exports = router;
