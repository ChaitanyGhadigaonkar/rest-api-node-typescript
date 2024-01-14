import dotenv from "dotenv";

dotenv.config();

export const { PORT, MONGODB_URI, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env;
