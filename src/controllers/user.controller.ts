import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model";

export const createUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // register the user
    const { username, email, password } = req.body;
    if (!username && !email && !password) {
      res.status(403).json({ message: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(403).json({ message: "Email is already taken." });
      return;
    }

    await User.create({ username, email, password });
    res.status(201).json({ message: "account created successfully" });
  }
);

export const updateUser = async (req: Request, res: Response) => {
  const { userId, email, role } = req.user;

  const { username, password } = req.body;
  if (!username && !password) {
    res.status(403).json({ message: "All fields are required" });
    return;
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(403).json({ message: "User does not exists." });
    return;
  }
  user.username = username;
  user.password = password;
  const updatedUser = await user.save();
  res.status(200).json({ message: "user updated successfully" });
};
export const deleteUser = async (req: Request, res: Response) => {};

export const userController = { createUser, updateUser, deleteUser };
