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
exports.noteController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_model_1 = __importDefault(require("../models/user.model"));
const note_model_1 = __importDefault(require("../models/note.model"));
// Get all notes
const getAllNotes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userId } = req.user;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new Error("Forbidden");
    }
    const notes = yield note_model_1.default.find({ user: userId });
    res.status(200).json({ message: "all notes ", notes });
}));
// Add Note
const addNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userId } = req.user;
    const { title, description } = req.body;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new Error("Forbidden");
    }
    const note = yield note_model_1.default.create({ title, description, user: userId });
    res.status(201).json({ message: "note created successfully", note });
}));
// Get particular note
const getParticularNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userId } = req.user;
    const { noteId } = req.params;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new Error("Forbidden");
    }
    const note = yield note_model_1.default.findById(noteId);
    if (!note) {
        throw new Error("no such note found");
    }
    res.status(200).json({ message: "note found", note });
}));
// Update particular note
const updateNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userId } = req.user;
    const { title, description, completed } = req.body;
    const { noteId } = req.params;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new Error("Forbidden");
    }
    const note = yield note_model_1.default.findById(noteId);
    if (!note) {
        throw new Error("no such note found");
    }
    note.title = title;
    note.description = description;
    note.completed = completed;
    yield note.save();
    res.status(201).json({ message: "note updated successfully", note });
}));
// Delete particular Note
const deleteNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userId } = req.user;
    const { noteId } = req.params;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new Error("Forbidden");
    }
    const note = yield note_model_1.default.findById(noteId);
    if (!note) {
        throw new Error("no such note found");
    }
    yield note.deleteOne();
    res.status(201).json({ message: "note deleted successfully" });
}));
exports.noteController = {
    getAllNotes,
    addNote,
    getParticularNote,
    updateNote,
    deleteNote,
};
