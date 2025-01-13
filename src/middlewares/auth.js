const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No autenticado, no hay JWT" });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ message: "Token Invalido" });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: "No autenticado" });
  }

  req.user = decodedToken; // Add decoded token to request object
  next();
};