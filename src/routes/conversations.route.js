const express = require("express");
const router = express.Router();
const conversationController = require("@/controllers/conversation.controller");
const authMiddleware = require("@/middlewares/auth.middleware");

router.post("/", authMiddleware, conversationController.createConversation);
router.get("/", authMiddleware, conversationController.findConversationsByUser);

router.post(
  "/:id/participants",
  authMiddleware,
  conversationController.addUserToConversation,
);

router.post(
  "/:id/messages",
  authMiddleware,
  conversationController.sendMessage,
);
router.get("/:id/messages", authMiddleware, conversationController.getMessage);

module.exports = router;
