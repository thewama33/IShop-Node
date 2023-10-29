import { model, Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  image: string;
  products: Schema.Types.ObjectId[]; // Array of product IDs
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  products: [{ type: Schema.Types.ObjectId, ref: "Products" }], // Array of product IDs with reference to the Products model
});

const CategoryModel = model<ICategory>("Category", CategorySchema);

export default CategoryModel;
