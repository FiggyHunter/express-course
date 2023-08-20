import express from "express";
import bodyParser from "body-parser";
import {
  registerUser,
  loginUsers,
  validateToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/register", registerUser);
router.post("/login", loginUsers);
router.post("/validate", validateToken);

export default router;
