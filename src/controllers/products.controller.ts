import { Request, Response } from "express";
import ProductsModel from "../model/products.model";
import { DefaultResponse } from "../helpers/defaultResponse";

export async function addProduct(req: Request, res: Response) {
  try {
    const { title, description, vendor, price, category, images } = req.body;

    if (!title && !description && !vendor && !price && !category) {
      return res
        .status(402)
        .json(DefaultResponse.error("All Fields are required", 402));
    }
    const product = await ProductsModel.create({
      title,
      description,
      price,
      vendor,
      images,
      category,
    });

    return res.status(204).json(DefaultResponse.success(product));
  } catch (err: any) {
    return res
      .status(404)
      .json(DefaultResponse.error(String(err.message), res.statusCode));
  }
}

export async function getSingleProduct(req: Request, res: Response) {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.json(DefaultResponse.notFound());
    }
    const product = await ProductsModel.findById(productId);

    return res.status(200).json(DefaultResponse.success(product));
  } catch (err: any) {
    return res
      .status(404)
      .json(DefaultResponse.error(String(err.message), res.statusCode));
  }
}

export async function updateProduct(req: Request, res: Response) {
  const { productid } = req.body;
  const { title, description, price, vendor, images, category } = req.body;
  try {
    const user = await ProductsModel.findByIdAndUpdate(
      productid,
      {
        title,
        description,
        price,
        vendor,
        images,
        category,
        updatedAt: Date.now(),
      },
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
export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productid } = req.body;

    if (!productid) {
      return res.json(DefaultResponse.notFound());
    }
    await ProductsModel.findByIdAndRemove(productid);

    return res.status(200).json(DefaultResponse.success(null));
  } catch (err: any) {
    return res
      .status(404)
      .json(DefaultResponse.error(String(err.message), res.statusCode));
  }
}
