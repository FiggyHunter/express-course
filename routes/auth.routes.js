import express from "express";
import bodyParser from "body-parser";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", registerUser);

export default router;
