import User from "../models/auth.js";
import badRequestError from "../errors/badRequestError.js";
import UnauthorizationError from "../errors/unauthorizationError.js";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username, email: user.email }, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new badRequestError("Please Provide The Credentials.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizationError("No account found with this email.");
  }

  const isCorrect = await user.verifyPassword(password);
  if (!isCorrect) {
    throw new UnauthorizationError("Incorrect Password.");
  }

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { username: user.username, email: user.email }, token });
};
