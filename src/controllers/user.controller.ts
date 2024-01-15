import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model";

export const createUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // register the user
    const { username, email, password } = req.body;
    if (!username && !email && !password) {
      throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });
    if (user) {
      throw new Error("Email is already taken.");
    }

    await User.create({ username, email, password });
    res.status(201).json({ message: "account created successfully" });
  }
);

export const updateUser = async (req: Request, res: Response) => {
  const { userId, email } = req.user;

  const { username, password } = req.body;
  if (!username && !password) {
    throw new Error("All fields are required");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User does not exists.");
  }
  user.username = username;
  user.password = password;
  const updatedUser = await user.save();
  res.status(200).json({ message: "user updated successfully" });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId, email } = req.user;
  await User.findByIdAndDelete(userId);
  res.status(201).json({ message: "user deleted successfully" });
};

export const userController = { createUser, updateUser, deleteUser };
