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
exports.userController = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // register the user
    const { username, email, password } = req.body;
    if (!username && !email && !password) {
        throw new Error("All fields are required");
    }
    const user = yield user_model_1.default.findOne({ email });
    if (user) {
        throw new Error("Email is already taken.");
    }
    yield user_model_1.default.create({ username, email, password });
    res.status(201).json({ message: "account created successfully" });
}));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, email } = req.user;
    const { username, password } = req.body;
    if (!username && !password) {
        throw new Error("All fields are required");
    }
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new Error("User does not exists.");
    }
    user.username = username;
    user.password = password;
    const updatedUser = yield user.save();
    res.status(200).json({ message: "user updated successfully" });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, email } = req.user;
    yield user_model_1.default.findByIdAndDelete(userId);
    res.status(201).json({ message: "user deleted successfully" });
});
exports.deleteUser = deleteUser;
exports.userController = { createUser: exports.createUser, updateUser: exports.updateUser, deleteUser: exports.deleteUser };
