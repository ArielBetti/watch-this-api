const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password, salt = 10) => {
  return await bcrypt.hash(password, salt);
};

async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 10800000, // expires in 3hours
  });
};

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

exports.comparePasswords = comparePasswords;
exports.decodeToken = decodeToken;
exports.generateToken = generateToken;
exports.hashPassword = hashPassword;
