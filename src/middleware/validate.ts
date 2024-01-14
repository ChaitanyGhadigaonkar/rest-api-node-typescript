import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject, ZodError, ZodIssue } from "zod";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.issues[0].message });
      }
    }
  };

export default validate;
