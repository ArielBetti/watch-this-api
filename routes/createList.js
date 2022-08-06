var express = require("express");
var router = express.Router();
const verifyJWT = require("../middleware");

/* GET users listing. */
router.get("/", verifyJWT, (req, res, next) => {
  try {
    res.send([{ list: "Em breve..." }]);
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
