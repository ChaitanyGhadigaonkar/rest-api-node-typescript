"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("All fields are required");
    }
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new Error("User does not exists.");
    }
    const match = yield user.comparePassword(password);
    if (!match) {
        throw new Error("Email or password is wrong");
    }
    const accessToken = jsonwebtoken_1.default.sign({
        userInfo: {
            userId: user._id,
            email: user.email,
        },
    }, config_1.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({
        userInfo: {
            email: user.email,
        },
    }, config_1.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    res.cookie("jwt", refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //https
        sameSite: "none", //cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    res.status(200).json({ accessToken });
}));
const refresh = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        throw new Error("Unauthorized jwt is absent");
    }
    const refreshToken = cookies.jwt;
    jsonwebtoken_1.default.verify(refreshToken, config_1.REFRESH_TOKEN_SECRET, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            throw new Error("Forbidden");
        }
        const user = yield user_model_1.default.findOne({ email: decode.userInfo.email });
        if (!user) {
            throw new Error("Forbidden user not found.");
        }
        const accessToken = jsonwebtoken_1.default.sign({
            userInfo: {
                userId: user._id,
                email: user.email,
            },
        }, config_1.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        res.status(200).json({ accessToken });
    }));
}));
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(204);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.status(200).json({ message: "Cookie cleared" });
});
exports.authController = { login, refresh, logout };
