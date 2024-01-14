import { Router } from "express";
import { userController } from "../controllers/user.controller";
import validate from "../middleware/validate";
import { userZodSchema } from "../models/user.model";
import verifyJWT from "../middleware/verifyJWT";
import { z } from "zod";

export const userRouter = Router();

userRouter.route("/").post(validate(userZodSchema), userController.createUser);

userRouter.use(verifyJWT);

const updateUserSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: "username is required",
      })
      .min(6, "username is too small")
      .max(20, "username should be less than 20 character"),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(8, "password must of 8 characters")
      .max(12, "password can't exceeds 12 characters"),
  }),
});

userRouter
  .route("/")
  .put(validate(updateUserSchema), userController.updateUser)
  .delete(userController.deleteUser);
