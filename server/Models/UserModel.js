import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const userModel = mongoose.Schema(
  {
    mobile: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestaps: true,
  }
);
export const User = mongoose.model(collections.USER_COLLECTION, userModel);
