"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = __importDefault(require("../middleware/validate"));
const user_model_1 = require("../models/user.model");
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const zod_1 = require("zod");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.route("/").post((0, validate_1.default)(user_model_1.userZodSchema), user_controller_1.userController.createUser);
exports.userRouter.use(verifyJWT_1.default);
const updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z
            .string({
            required_error: "username is required",
        })
            .min(6, "username is too small")
            .max(20, "username should be less than 20 character"),
        password: zod_1.z
            .string({
            required_error: "password is required",
        })
            .min(8, "password must of 8 characters")
            .max(12, "password can't exceeds 12 characters"),
    }),
});
exports.userRouter
    .route("/")
    .put((0, validate_1.default)(updateUserSchema), user_controller_1.userController.updateUser)
    .delete(user_controller_1.userController.deleteUser);
