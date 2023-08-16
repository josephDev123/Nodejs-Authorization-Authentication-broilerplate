import mongoose, { Model } from "mongoose";
type userType = {
  name: string;
  email: string;
  password: string;
};
//user schema

const userSchema = new mongoose.Schema<userType>({
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },

  password: {
    type: String,
    required: true,
    unique: true,
  },
});

//user model

export const UserModel = mongoose.model("User", userSchema);
