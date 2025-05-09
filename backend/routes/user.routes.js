import express from "express";
import protectRoute from "../middlerware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.contoller.js";
const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;
