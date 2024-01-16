"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.PORT = _a.PORT, exports.MONGODB_URI = _a.MONGODB_URI, exports.ACCESS_TOKEN_SECRET = _a.ACCESS_TOKEN_SECRET, exports.REFRESH_TOKEN_SECRET = _a.REFRESH_TOKEN_SECRET, exports.NODE_ENV = _a.NODE_ENV;
