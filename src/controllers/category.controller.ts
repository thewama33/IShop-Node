import { Request, Response } from "express";
import CategoryModel from "../model/category.model";
import { DefaultResponse } from "../helpers/defaultResponse";

export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await CategoryModel.find();
    console.log(categories);

    return res.status(200).json(DefaultResponse.success(categories));
  } catch (err) {
    return res
      .status(500)
      .json(DefaultResponse.error("Internal Server Error", res.statusCode));
  }
}

export async function getCategoryById(req: Request, res: Response) {
  const { categoryId } = req.params;
  try {
    console.log(`Category ID ${categoryId}`);

    const category = await CategoryModel.findById(categoryId);

    console.log(`Category ${category}`);

    if (!category) {
      return res
        .status(404)
        .json(DefaultResponse.notFound("Category not found"));
    }
    return res.status(200).json(DefaultResponse.success(category));
  } catch (err) {
    return res
      .status(500)
      .json(DefaultResponse.error("Internal Server Error", res.statusCode));
  }
}

export async function createCategory(req: Request, res: Response) {
  const { name, image } = req.body;
  try {
    const category = await CategoryModel.create({ name, image });
    return res.status(201).json(DefaultResponse.success(category));
  } catch (err) {
    return res
      .status(500)
      .json(DefaultResponse.error("Internal Server Error", res.statusCode));
  }
}

export async function updateCategory(req: Request, res: Response) {
  const { categoryId } = req.params;
  const { name, image } = req.body;
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { name, image },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .json(DefaultResponse.notFound("Category not found"));
    }
    return res.status(200).json(DefaultResponse.success(null));
  } catch (err) {
    return res
      .status(500)
      .json(DefaultResponse.error("Internal Server Error", res.statusCode));
  }
}
export async function deleteCategory(req: Request, res: Response) {
  const { categoryId } = req.params;
  try {
    const category = await CategoryModel.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json(DefaultResponse.notFound());
    }
    return res.status(204).json(DefaultResponse.success(null));
  } catch (err) {
    return res
      .status(500)
      .json(DefaultResponse.error("Internal Server Error", res.statusCode));
  }
}
