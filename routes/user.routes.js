import express from "express";
import bodyParser from "body-parser";
import {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  replaceUser,
  deleteUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router
  .route("/")
  .get(authMiddleware, roleMiddleware, getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUserByID)
  .put(authMiddleware, updateUser)
  .patch(replaceUser)
  .delete(deleteUser);

// router.get("/:id", getUserByID);
// router.put("/:id", updateUser);
// router.patch("/:id", replaceUser);
// router.delete("/:id", deleteUser);

export default router;
