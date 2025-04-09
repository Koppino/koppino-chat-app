import express from "express";
import {
  getMessages,
  sendMessage,
  getConversations,
  readConversation,
} from "../controllers/message.controller.js";
import protectRoute from "../middlerware/protectRoute.js";
const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);
router.get("/", protectRoute, getConversations);
router.get("/read/:id", protectRoute, readConversation);
export default router;
