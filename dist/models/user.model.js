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
exports.userZodSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        require: [true, "username is required"],
    },
    email: {
        type: String,
        require: [true, "email is required"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "password is required"],
    },
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const hashedPassword = yield bcrypt_1.default.hash(user.password, yield bcrypt_1.default.genSalt(10));
        user.password = hashedPassword;
        return next();
    });
});
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const isMatched = yield bcrypt_1.default.compare(candidatePassword, user.password);
        return isMatched;
    });
};
const User = mongoose_1.default.model("user", userSchema);
exports.userZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z
            .string({
            required_error: "username is required",
        })
            .min(6, "username is too small")
            .max(20, "username should be less than 20 character"),
        email: zod_1.z
            .string({
            required_error: "email is required",
        })
            .email("Email is not valid."),
        password: zod_1.z
            .string({
            required_error: "password is required",
        })
            .min(8, "password must of 8 characters")
            .max(12, "password can't exceeds 12 characters"),
    }),
});
exports.default = User;
