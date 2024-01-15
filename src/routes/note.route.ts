import { Router } from "express";
import validate from "../middleware/validate";
import { noteZodSchema } from "../models/note.model";
import verifyJWT from "../middleware/verifyJWT";
import { noteController } from "../controllers/note.controller";

const noteRouter = Router();

noteRouter.use(verifyJWT);
// all are protected routes

noteRouter
  .route("/")
  .get(noteController.getAllNotes)
  .post(validate(noteZodSchema), noteController.addNote);

noteRouter
  .route("/:noteId")
  .get(noteController.getParticularNote)
  .put(validate(noteZodSchema), noteController.updateNote)
  .delete(noteController.deleteNote);

export default noteRouter;
