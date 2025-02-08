import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;
  console.log("🟡 Checking Token:", token);

  if (!token) {
    console.log("🔴 Unauthorized: No token provided");
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("🔴 JWT Verification Error:", err.message);
      return next(errorHandler(403, "Forbidden"));
    }
    
    console.log("🟢 Token Verified for User:", user);
    req.user = user;
    next();
  });
};
