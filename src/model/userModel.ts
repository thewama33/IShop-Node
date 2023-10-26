import { Schema, model } from "mongoose";
import validator from "validator";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  createdAt: Date;
  updatedAt: Date;
}

enum role {
  Standard,
  Vendor,
  Admin,
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email is not valid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    validate: [validator.isStrongPassword, "Password is weak "],
  },
  role: {
    type: Number,
    enum: role,
    default: role.Standard,
  },
});

export default model<IUser>("users", userSchema);
