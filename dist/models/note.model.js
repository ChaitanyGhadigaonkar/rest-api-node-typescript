"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteZodSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const noteSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Note = mongoose_1.default.model("notes", noteSchema);
exports.noteZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({ required_error: "title is required" })
            .min(5, "title is too short")
            .max(18, "title does not exceeds 18 characters"),
        description: zod_1.z
            .string({ required_error: "description is required" })
            .min(10, "description is too short")
            .max(60, "description does not exceeds 60 characters"),
        completed: zod_1.z.boolean().optional(),
    }),
});
exports.default = Note;
