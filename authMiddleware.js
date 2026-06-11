const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extracts token from 'Bearer <TOKEN>'

  if (!token) {
    return res.status(401).json({ message: "Access Denied: Token Missing!" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attaches user ID to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token!" });
  }
};

module.exports = authenticateToken;
