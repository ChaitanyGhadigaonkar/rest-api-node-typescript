import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        email: string;
      };
    }
  }
}

export default function (req: Request, res: Response, next: NextFunction) {
  const authHeader: string | string[] | undefined =
    req.headers.authorization || req.headers.Authorization;

  if (!(authHeader as string)?.startsWith("Bearer ")) {
    res.status(403);
    throw new Error("Unauthorized");
  }

  const token = (authHeader as string).split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET as string, (err, decoded: any) => {
    if (err) {
      throw new Error("Forbidden");
    }

    req.user = {
      userId: decoded.userInfo.userId,
      email: decoded.userInfo.email,
    };

    next();
  });
}
