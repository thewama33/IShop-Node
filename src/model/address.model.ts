import { model, Schema, Document } from "mongoose";

interface IUserAddress {
  city: string;
  country: string;
  address: string;
  zipcode: string;
  lat: string;
  long: string;
  user: Schema.Types.ObjectId;
}
const userAddress: Schema = new Schema<IUserAddress>({
  city: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  zipcode: { type: String, required: true },
  lat: { type: String, required: true },
  long: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "Users" }, // Reference to the User model
});

const UserAddress = model<IUserAddress>("Address", userAddress);

export default UserAddress;
