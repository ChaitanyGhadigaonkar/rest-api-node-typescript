import { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../config";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send({
    message: err.message,
    stack: NODE_ENV === "dev" ? err.stack : null,
  });
};
export default errorHandler;
