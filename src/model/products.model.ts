import { model, Schema } from "mongoose";

export interface IProduct {
  id: string;
  images: string[];
  title: string;
  description: string;
  price: number;
  vendor: string;
  category: Schema.Types.ObjectId;
}

const ProductsSchema: Schema = new Schema<IProduct>({
  id: { type: String, required: true },
  images: [{ type: String, required: true }], //Array of Strings
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  vendor: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

const ProductsModel = model<IProduct>("Products", ProductsSchema);

export default ProductsModel;
