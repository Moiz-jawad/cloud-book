require("dotenv").config();

let { PORT, CON_URL, JWT_SECRET } = process.env;

module.exports = {
  port: PORT || 5000,
  conUrl: CON_URL,
  jwtSecret: JWT_SECRET,
};
