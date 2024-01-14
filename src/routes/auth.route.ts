import express from "express";
import { authController } from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.route("/").post(authController.login);

authRouter.route("/refresh").get(authController.refresh);

authRouter.route("/logout").post(authController.logout);
