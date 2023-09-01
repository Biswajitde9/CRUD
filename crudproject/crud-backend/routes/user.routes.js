import express from "express";
import {
    deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  updateUser,
  userRegister,
} from "../controller/user.controller.js";
const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(loginUser);
router.route("/users").get(getAllUsers);
router
  .route("/:userId")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
