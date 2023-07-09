import mongoose from "mongoose";
const profileModal = mongoose.Schema(
  {
    mobile: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    activeDse: {
      _id: { type: mongoose.Schema.ObjectId, required: true, ref: "profile" },
    },
    dses: [
      {
        _id: { type: mongoose.Schema.ObjectId, required: true },
        startDate: { type: Date ,required:true},
        End:{type:Date}
      },
    ],
  },
  {
    timestaps: true,
  }
);
export const Profile = mongoose.model("profile", profileModal);  
