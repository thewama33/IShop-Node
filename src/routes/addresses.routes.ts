import { Router } from "express";
import { getAddress } from "../controllers/address.controller";
import authVerify from "../middlewares/auth.middleware";

const router = Router();

router.route("/addresses").get(authVerify, getAddress);

export default router;
