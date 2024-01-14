import mongoose from "mongoose";
import { MONGODB_URI } from "../config";

export const connectToMongo = async () => {
  try {
    const connect = mongoose.connect(MONGODB_URI as string);
    console.log(
      `connected to mongo db host : ${(await connect).connection.host}`
    );
  } catch (err: any) {
    console.log(err);
    // process.exit(1);
  }
};
