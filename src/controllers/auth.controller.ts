import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config";

const login = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User does not exists.");
  }

  const match = await user.comparePassword(password);
  if (!match) {
    throw new Error("Email or password is wrong");
  }
  const accessToken = jwt.sign(
    {
      userInfo: {
        userId: user._id,
        email: user.email,
      },
    },
    ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    {
      userInfo: {
        email: user.email,
      },
    },
    REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "none", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });
  res.status(200).json({ accessToken });
});

const refresh = expressAsyncHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    throw new Error("Unauthorized jwt is absent");
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET as string,
    async (err: any, decode: any) => {
      if (err) {
        throw new Error("Forbidden");
      }
      const user = await User.findOne({ email: decode.userInfo.email });

      if (!user) {
        throw new Error("Forbidden user not found.");
      }

      const accessToken = jwt.sign(
        {
          userInfo: {
            userId: user._id,
            email: user.email,
          },
        },
        ACCESS_TOKEN_SECRET as string,
        { expiresIn: "15m" }
      );

      res.status(200).json({ accessToken });
    }
  );
});
const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

  res.status(200).json({ message: "Cookie cleared" });
};

export const authController = { login, refresh, logout };
