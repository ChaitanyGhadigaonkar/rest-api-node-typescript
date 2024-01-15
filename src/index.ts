import express, { Request, Response, Express } from "express";
import cors from "cors";
import { connectToMongo } from "./db/connectToDb";
import { PORT } from "./config";
import { userRouter } from "./routes/user.route";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.route";
import noteRouter from "./routes/note.route";
import errorHandler from "./middleware/errorHandler";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("REST API with Typescript");
});
app.use("/api/users", userRouter);
app.use("/api/sessions", authRouter);
app.use("/api/notes", noteRouter);

// error handler
app.use(errorHandler);

app.listen(PORT || 8000, () => {
  console.log(`server is running http://localhost:${PORT} 🚀🚀`);
  connectToMongo();
});
