import mongoose from "mongoose";
import { collections } from "../Config/Collections.js";
const profileModal = mongoose.Schema(
  {
    name: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.USER_COLLECTION,
      required: true,
      unique: true,
    },
    aleas: { type: String },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true },
    status: { type: String, default: "active" },
  },
  {
    timestaps: true,
  }
);
export const Profile = mongoose.model(
  collections.PROFILE_COLLECTION,
  profileModal
);
