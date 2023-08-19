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

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", getUsers);
router.get("/:id", getUserByID);
router.post("/", createUser);
router.put("/:id", updateUser);
router.patch("/:id", replaceUser);
router.delete("/:id", deleteUser);

export default router;
