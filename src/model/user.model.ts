import { Schema, model } from "mongoose";
import validator from "validator";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;
}

export enum Roles {
  Standard = "Standard",
  Vendor = "Vendor",
  Admin = "Admin",
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
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  role: {
    type: String,
    enum: Object.values(Roles),
    default: Roles.Standard,
  },
});

const UserModel = model<IUser>("Users", userSchema);

export default UserModel;
