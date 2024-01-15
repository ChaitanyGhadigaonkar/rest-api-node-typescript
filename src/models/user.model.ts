import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { z } from "zod";

export interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "username is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this as UserDocument;
  const hashedPassword = await bcrypt.hash(
    user.password,
    await bcrypt.genSalt(10)
  );
  user.password = hashedPassword;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;
  const isMatched: Boolean = await bcrypt.compare(
    candidatePassword,
    user.password
  );
  return isMatched;
};

const User = mongoose.model<UserDocument>("user", userSchema);

export const userZodSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: "username is required",
      })
      .min(6, "username is too small")
      .max(20, "username should be less than 20 character"),
    email: z
      .string({
        required_error: "email is required",
      })
      .email("Email is not valid."),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(8, "password must of 8 characters")
      .max(12, "password can't exceeds 12 characters"),
  }),
});

export default User;
