import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model";
import Note from "../models/note.model";

// Get all notes
const getAllNotes = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, userId } = req.user;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Forbidden");
  }

  const notes = await Note.find({ user: userId });
  res.status(200).json({ message: "all notes ", notes });
});

// Add Note
const addNote = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, userId } = req.user;
  const { title, description } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Forbidden");
  }

  const note = await Note.create({ title, description, user: userId });
  res.status(201).json({ message: "note created successfully", note });
});

// Get particular note
const getParticularNote = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, userId } = req.user;
    const { noteId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Forbidden");
    }
    const note = await Note.findById(noteId);
    if (!note) {
      throw new Error("no such note found");
    }
    res.status(200).json({ message: "note found", note });
  }
);

// Update particular note
const updateNote = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, userId } = req.user;
  const { title, description, completed } = req.body;
  const { noteId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Forbidden");
  }

  const note = await Note.findById(noteId);
  if (!note) {
    throw new Error("no such note found");
  }

  note.title = title;
  note.description = description;
  note.completed = completed;
  await note.save();

  res.status(201).json({ message: "note updated successfully", note });
});

// Delete particular Note
const deleteNote = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, userId } = req.user;
  const { noteId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Forbidden");
  }
  const note = await Note.findById(noteId);
  if (!note) {
    throw new Error("no such note found");
  }
  await note.deleteOne();
  res.status(201).json({ message: "note deleted successfully" });
});

export const noteController = {
  getAllNotes,
  addNote,
  getParticularNote,
  updateNote,
  deleteNote,
};
