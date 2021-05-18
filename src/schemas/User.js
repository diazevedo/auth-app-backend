import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uiid: {
    type: String,
  },
  name: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
  password: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", UserSchema);
