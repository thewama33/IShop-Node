import { Router } from "express";
import {
  updateCategory,
  createCategory,
  getCategories,
  deleteCategory,
  getCategoryById,
} from "../controllers/category.controller";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware";
import { Roles } from "../model/user.model";

const router = Router();

router.use(authenticateUser);

router
  .route("/category/:categoryId")
  .get(getCategoryById)
  .put(authorizeUser([Roles.Admin, Roles.Vendor]), updateCategory)
  .delete(authorizeUser([Roles.Admin, Roles.Vendor]), deleteCategory);

router
  .route("/category")
  .post(authorizeUser([Roles.Admin, Roles.Vendor]), createCategory);

router.route("/categories").get(getCategories);

export default router;
