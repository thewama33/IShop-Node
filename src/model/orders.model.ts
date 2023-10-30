import { model, Schema, Document } from "mongoose";

enum OrderStatus {
  PENDING = "Pending",
  PROCESSING = "Processing",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

interface IOrders extends Document {
  user: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
  status: OrderStatus; // Order status field with enum values
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema: Schema = new Schema<IOrders>({
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  products: [{ types: Schema.Types.ObjectId, ref: "Products" }],
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const OrderModel = model<IOrders>("Orders", orderSchema);

export default OrderModel;
