import { model, Schema, Document } from "mongoose";

// Define the Cart document interface
interface ICart extends Document {
  user: Schema.Types.ObjectId;
  items: {
    product: Schema.Types.ObjectId;
    quantity: number;
  }[];
}

const cartSchema: Schema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const CartModel = model<ICart>("Cart", cartSchema);

export default CartModel;
