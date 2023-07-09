import mongoose from "mongoose";
const userModel = mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestaps: true,
  }
);
export const User = mongoose.model("user", userModel);