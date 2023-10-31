import { Request, Response } from "express";
import { DefaultResponse } from "../helpers/defaultResponse";
import AddressModel from "../model/address.model";
import CartModel from "../model/cart.model";
import UserModel from "../model/user.model";

// Create a new user

// Get all users

// Get a specific user by ID
export async function getUserById(req: Request, res: Response) {
  const userId = res.locals.id;
  try {
    const user = await UserModel.findById(userId).select({ password: false });
    // Fetch user addresses
    const addresses = await AddressModel.find({ user: userId });
    // // Fetch user orders
    //  const orders = await OrderModel.find({ user: userId });

    // Fetch user cart information
    const carts = await CartModel.find({ user: userId });

    // Construct the JSON response
    const userData = {
      user,
      addresses,
      //  orders,
      carts,
    };

    return res.status(200).json(DefaultResponse.success(userData));
  } catch (err: any) {
    return res
      .status(404)
      .json(DefaultResponse.error(String(err.message), 500));
  }
}

// Update a user by ID
export async function updateUser(req: Request, res: Response) {
  const userId = res.locals.id;
  const { firstName, lastName, email,phone } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, phone, updatedAt: Date.now() },
      {
        new: true,
      }
    ).select({ password: false, __v: false });

    if (!user) {
      res.status(402).json(DefaultResponse.notFound());
    }

    return res.status(200).json(DefaultResponse.success(user));
  } catch (err: any) {
    return res
      .status(400)
      .json(DefaultResponse.error(String(err.message), res.statusCode));
  }
}

// Delete a user by ID
export async function deleteUser(req: Request, res: Response) {
  try {
    const userId: string = res.locals.id;

    await UserModel.findByIdAndRemove(userId);
    await CartModel.findByIdAndRemove(userId);
    await AddressModel.findByIdAndRemove(userId);
    await UserModel.findByIdAndRemove(userId);

    return res.status(200).json(DefaultResponse.success(null));
  } catch (err: any) {
    return res
      .status(404)
      .json(DefaultResponse.error(String(err.message), res.statusCode));
  }
}
