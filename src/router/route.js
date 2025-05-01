import express from "express";
import { searchController, usernameController } from "../controller/indexcontroller.js";

const router = express();

router.get("/user/:username", usernameController);
router.get("/seacrh", searchController);

export default router;
