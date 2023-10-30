import { Router } from "express";
import { addAddress, getAddress } from "../controllers/address.controller";
import authVerify from "../middlewares/auth.middleware";
import { Roles } from "../model/user.model";

const router = Router();

router.use(authVerify);
router.route("/addresses").get(getAddress).post(addAddress).put().delete();

export default router;
