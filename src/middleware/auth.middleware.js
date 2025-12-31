const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access token is missing or invalid",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // attach user info to request
    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};
