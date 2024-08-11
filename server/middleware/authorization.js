import UnauthorizationError from "../errors/unauthorizationError.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizationError("Authorization invalid.");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new UnauthorizationError("Authorization invalid.");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      username: payload.username,
      userId: payload.userId,
      email: payload.email,
    };
    next();
  } catch (error) {
    throw new UnauthorizationError("Authorization invalid.");
  }
};

export default auth;
