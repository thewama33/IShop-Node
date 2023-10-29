import { Schema, model } from "mongoose";
import validator from "validator";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: role;
  createdAt: Date;
  updatedAt: Date;
  addresses: Schema.Types.ObjectId[];
  orders: Schema.Types.ObjectId[]; // Array of order IDs
}

enum role {
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
  addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    validate: [validator.isStrongPassword, "Password is weak "],
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  orders: { type: [Schema.Types.ObjectId], ref: "Orders" },
  role: {
    type: String,
    enum: Object.values(role),
    default: role.Standard,
  },
});

const UserModel = model<IUser>("Users", userSchema);

export default UserModel;
