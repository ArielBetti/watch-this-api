const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token)
    return res
      .status(401)
      .json({ auth: false, message: "Sem token na requisição" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({ auth: false, message: "Token expirado!" });

    req.userId = decoded.id;
    next();
  });
};
