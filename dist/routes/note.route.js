"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../middleware/validate"));
const note_model_1 = require("../models/note.model");
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const note_controller_1 = require("../controllers/note.controller");
const noteRouter = (0, express_1.Router)();
noteRouter.use(verifyJWT_1.default);
// all are protected routes
noteRouter
    .route("/")
    .get(note_controller_1.noteController.getAllNotes)
    .post((0, validate_1.default)(note_model_1.noteZodSchema), note_controller_1.noteController.addNote);
noteRouter
    .route("/:noteId")
    .get(note_controller_1.noteController.getParticularNote)
    .put((0, validate_1.default)(note_model_1.noteZodSchema), note_controller_1.noteController.updateNote)
    .delete(note_controller_1.noteController.deleteNote);
exports.default = noteRouter;
