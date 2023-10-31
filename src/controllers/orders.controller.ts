import { Request, Response } from "express";
import { DefaultResponse } from "../helpers/defaultResponse";
import OrderModel from "../model/orders.model";
import UserModel from "../model/user.model";

export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await OrderModel.find();
    return res.status(200).json(DefaultResponse.success(orders));
  } catch (err: any) {
    return res
      .status(500)
      .json(DefaultResponse.error("Internal Server Error", res.statusCode));
  }
}

export async function getUserOrders(req: Request, res: Response) {
  try {
    const orders = await OrderModel.find({ userid: res.locals.id });
    return res.status(200).json(DefaultResponse.success(orders));
  } catch (err: any) {
    return res
      .status(500)
      .json(DefaultResponse.error("Internal Server Error", res.statusCode));
  }
}

export async function getOrderById(req: Request, res: Response) {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json(DefaultResponse.notFound("Order not found"));
    }
    return res.status(200).json(DefaultResponse.success(order));
  } catch (err) {
    return res
      .status(500)
      .json(DefaultResponse.error("Internal Server Error", res.statusCode));
  }
}

export async function createOrder(req: Request, res: Response) {
  const { products } = req.body;
  const userId = res.locals.id;
  try {
    const user = await UserModel.findById(userId);

    console.log(user);

    if (!user) {
      return res.status(404).json(DefaultResponse.notFound("User not found"));
    }

    const order = await OrderModel.create({ userid: user.id, products });
    return res.status(201).json(DefaultResponse.success(order));
  } catch (err: any) {
    return res
      .status(500)
      .json(DefaultResponse.error("Internal Server Error", res.statusCode));
  }
}

export async function updateOrder(req: Request, res: Response) {
  const { orderId } = req.params;
  const { user, products, status } = req.body;
  try {
    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { user, products, status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json(DefaultResponse.notFound("Order not found"));
    }
    return res.status(200).json(DefaultResponse.success(order));
  } catch (err) {
    return res
      .status(500)
      .json(DefaultResponse.error("Internal Server Error", res.statusCode));
  }
}

export async function deleteOrder(req: Request, res: Response) {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json(DefaultResponse.notFound("Order not found"));
    }
    return res.status(204).json(DefaultResponse.success(order));
  } catch (err: any) {
    return res
      .status(500)
      .json(DefaultResponse.error("Internal Server Error", res.statusCode));
  }
}
