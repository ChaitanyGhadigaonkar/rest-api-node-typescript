import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

export default function (req: Request, res: Response, next: NextFunction) {
  const authHeader: string | string[] | undefined =
    req.headers.authorization || req.headers.Authorization;

  if (!(authHeader as string)?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = (authHeader as string).split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET as string, (err, decoded: any) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.user = {
      userId: decoded.userInfo.userId,
      email: decoded.userInfo.email,
      role: decoded.userInfo.role,
    };

    next();
  });
}
