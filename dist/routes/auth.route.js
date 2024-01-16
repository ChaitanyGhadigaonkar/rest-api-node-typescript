"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
exports.authRouter = express_1.default.Router();
exports.authRouter.route("/").post(auth_controller_1.authController.login);
exports.authRouter.route("/refresh").get(auth_controller_1.authController.refresh);
exports.authRouter.route("/logout").post(auth_controller_1.authController.logout);
