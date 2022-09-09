const { decodeToken } = require("../services/auth");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ auth: false, message: "Sem token na requisição" });
  }

  try {
    const decoded = decodeToken(token);

    req.decoded = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ auth: false, message: "Token expirado ou incorreto." });
  }
};
