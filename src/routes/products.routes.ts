import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getSingleProduct,
} from "../controllers/products.controller";
import authVerify from "../middlewares/auth.middleware";

const router = Router();

router.route("/products").get(); //*Get: All Products

router.route("/products/filter").get(); //*Get: Products by Filter
router.route("/products/search").get(); //*Get: Search Products

router
  .route("/product")
  .get(getSingleProduct) //*Get: Single Product
  .post(authVerify, addProduct) //TODO: ADD Product
  .put(authVerify) //?PUT : Update Products
  .delete(authVerify, deleteProduct); //!DELETE : Product

export default router;
