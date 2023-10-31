import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/products.controller";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware";
import { Roles } from "../model/user.model";

const router = Router();

router.route("/products").get(); //*Get: All Products

router.route("/products/filter").get(); //*Get: Products by Filter
router.route("/products/search").get(); //*Get: Search Products

router
  .route("/product")
  .get(getSingleProduct) //*Get: Single Product
  .post(
    authenticateUser,
    authorizeUser([Roles.Admin, Roles.Vendor]),
    addProduct
  ) //TODO: ADD Product
  .put(
    authenticateUser,
    authorizeUser([Roles.Admin, Roles.Vendor]),
    updateProduct
  ) //?PUT : Update Products
  .delete(
    authenticateUser,
    authorizeUser([Roles.Admin, Roles.Vendor]),
    deleteProduct
  ); //!DELETE : Product

export default router;
