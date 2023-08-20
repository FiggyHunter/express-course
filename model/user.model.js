import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  date: {
    type: Date,
    default: Date(),
  },
  _id: {
    type: String,
    default: uuidv4(),
  },
  password: { type: String, select: false },
});

const User = mongoose.model("users", userSchema);

export default User;
