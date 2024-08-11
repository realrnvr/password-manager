import Manager from "../models/manager.js";
import notFoundError from "../errors/notFoundError.js";
import badRequestError from "../errors/badRequestError.js";
import { StatusCodes } from "http-status-codes";

export const getAllPasswords = async (req, res) => {
  const { userId } = req.user;
  const manager = await Manager.find({ createdBy: userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ manager: manager, length: manager.length });
};

export const getPassword = async (req, res) => {
  const {
    user: { userId },
    params: { id: passwordId },
  } = req;

  const manager = await Manager.findOne({ createdBy: userId, _id: passwordId });
  if (!manager) {
    throw new notFoundError(`There is no such password with id: ${passwordId}`);
  }

  res.status(StatusCodes.OK).json({ manager });
};

export const createPassword = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const manager = await Manager.create({ ...req.body });
  res.status(200).json({ manager });
};

export const updatePassword = async (req, res) => {
  const {
    user: { userId },
    params: { id: passwordId },
    body: { site, username, password },
  } = req;

  if (!site || !username || !password) {
    throw new badRequestError("Please provide Credentails!");
  }

  const manager = await Manager.findOneAndUpdate(
    {
      createdBy: userId,
      _id: passwordId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!manager) {
    throw new notFoundError(`There is no such password with id: ${passwordId}`);
  }

  res.status(StatusCodes.OK).json({ manager });
};

export const deletePassword = async (req, res) => {
  const {
    user: { userId },
    params: { id: passwordId },
  } = req;

  const manager = await Manager.findOneAndDelete({
    _id: passwordId,
    createdBy: userId,
  });
  if (!manager) {
    throw new notFoundError(`There is no such password with id: ${passwordId}`);
  }

  res.status(StatusCodes.OK).json({ manager });
};
