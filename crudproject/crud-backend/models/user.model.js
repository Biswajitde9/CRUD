import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  gender: { type: String, required: true },
  active: { type: Boolean, default: true },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
