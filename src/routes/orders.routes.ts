import { Router } from "express";
import {
  updateOrder,
  createOrder,
  getOrders,
  deleteOrder,
  getOrderById,
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

router.route("/orders").get(getOrders);

export default router;
