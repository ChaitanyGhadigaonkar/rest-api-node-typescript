"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function default_1(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
        res.status(403);
        throw new Error("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, config_1.ACCESS_TOKEN_SECRET, (err, decoded) => {
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
exports.default = default_1;
