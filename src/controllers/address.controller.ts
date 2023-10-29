import { Request, Response } from "express";
import AddressModel from "../model/address.model";
import jwt, { JwtPayload } from "jsonwebtoken";

require("dotenv").config();

export async function getAddress(req: Request, res: Response) {
  try {
    const { id, role } = res.locals;
    console.log("User ID " + id);
    console.log("User Role " + role);

    const address = await AddressModel.findById(id);

    if (!address) {
      return res
        .status(400)
        .json({ code: res.statusCode, message: "Address is Empty" });
    }

    return res.status(200).json({
      code: res.statusCode,
      message: "Results are retrieved successfully",
      data: address,
    });
  } catch (error) {
    return res.status(500).json({
      code: res.statusCode,
      message: "Internal Server Error",
      stack: error,
    });
  }
}
export async function addAddress(req: Request, res: Response) {}
export async function updateAddress(req: Request, res: Response) {}
export async function deleteAddress(req: Request, res: Response) {}
