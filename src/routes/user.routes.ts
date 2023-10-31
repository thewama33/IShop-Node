import { Router } from "express";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateUser);

router
  .route("/user")
  .get(getUserById) // Get a specific user by ID
  .put(updateUser) // Update a user by ID
  .delete(deleteUser); // Delete a user by ID

export default router;
