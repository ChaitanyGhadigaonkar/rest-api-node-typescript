import mongoose, { Document, ObjectId } from "mongoose";
import { z } from "zod";
import { UserDocument } from "./user.model";

export interface NoteDocument extends Document {
  user: UserDocument["_id"];
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

const Note = mongoose.model<NoteDocument>("notes", noteSchema);

export const noteZodSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "title is required" })
      .min(5, "title is too short")
      .max(18, "title does not exceeds 18 characters"),
    description: z
      .string({ required_error: "description is required" })
      .min(10, "description is too short")
      .max(60, "description does not exceeds 60 characters"),
    completed: z.boolean().optional(),
  }),
});

export default Note;
