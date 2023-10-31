import { Router } from "express";
import { addAddress, getAddress } from "../controllers/address.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateUser);
router.route("/addresses").get(getAddress).post(addAddress).put().delete();

export default router;
