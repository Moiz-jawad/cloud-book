const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        code: 401,
        status: false,
        message: "Authorization header missing",
      });
    }

    // Must be: Bearer <token>
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        code: 401,
        status: false,
        message: "Invalid authorization format",
      });
    }

    const token = parts[1];

    // Guard against bad values
    if (!token || token === "undefined" || token === "null") {
      return res.status(401).json({
        code: 401,
        status: false,
        message: "Token is missing or invalid",
      });
    }

    const payload = jwt.verify(token, jwtSecret);

    req.user = {
      _id: payload._id,
      name: payload.name,
      email: payload.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      status: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = isAuth;
