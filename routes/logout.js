var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/", async function (__req, res) {
  res.send({ message: "Usuário deslogado!", user: null, token: null });
});

module.exports = router;
