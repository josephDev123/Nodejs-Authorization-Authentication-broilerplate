import mongoose, { Document, Schema, Types } from "mongoose";

type userType = {
  name: string;
  email: string;
  password: string;
  username: string;
  profile: Types.ObjectId;
  otp: number;
  confirm_otp: boolean;
  staging: number;
  status: boolean;
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
    // required: true,
    unique: true,
  },

  username: {
    type: String,
    unique: true,
    validate: {
      validator: function (value: any) {
        // Alphanumeric with a length between 3 and 20 characters
        return /^[a-zA-Z0-9]{3,20}$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid username. Must be alphanumeric and between 3 to 20 characters.`,
    },
  },

  profile: {
    type: Schema.Types.ObjectId,
    ref: "UserProfile",
  },

  otp: Number,

  confirm_otp: { type: Boolean, default: false },

  staging: { type: Number, default: 0 },
});

//user model

export const UserModel = mongoose.model("User", userSchema);
