import { verifyAccessToken } from "../utils/jwt.js";

function authMiddleware(req, res, next) {
  const token =
    req.cookies.token ||
    req.headers.authorization?.split(" ")[1] || "";

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = { user_id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

export default authMiddleware;
