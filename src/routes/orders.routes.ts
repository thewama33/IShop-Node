import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  updateOrder,
} from "../controllers/orders.controller";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware";
import { Roles } from "../model/user.model";

const router = Router();

router.use(authenticateUser);

router
  .route("/order/:orderId")
  .get(getOrderById)
  .put(authorizeUser([Roles.Admin, Roles.Vendor]), updateOrder)
  .delete(authorizeUser([Roles.Admin, Roles.Vendor]), deleteOrder);

router.route("/order").post(createOrder);

router.route("/orders").get(getUserOrders);
router
  .route("/all-orders")
  .get(authorizeUser([Roles.Admin, Roles.Vendor]), getAllOrders);

export default router;
