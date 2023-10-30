import { Router } from "express";
import authVerify from "../middlewares/auth.middleware";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.use(authVerify);

router
  .route("/user")
  .get(getUserById) // Get a specific user by ID
  .put(updateUser) // Update a user by ID
  .delete(deleteUser); // Delete a user by ID

export default router;
