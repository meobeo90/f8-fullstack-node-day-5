const conversationService = require("@/services/conversation.service");

exports.createConversation = async (req, res, next) => {
  try {
    const conversation = await conversationService.createConversation(
      req.body,
      req.user.sub,
    );
    res.success(conversation, 201);
  } catch (error) {
    next(error);
  }
};

exports.findConversationsByUser = async (req, res, next) => {
  try {
    const conversations = await conversationService.findConversationsByUser(
      req.user.sub,
    );
    res.success(conversations);
  } catch (error) {
    next(error);
  }
};

exports.addUserToConversation = async (req, res, next) => {
  try {
    const result = await conversationService.addUserToConversation(
      req.params.id,
      req.body.user_id,
    );
    console.log("conversationId:", req.params.id);
    console.log("userId:", req.body.user_id);
    res.success(result);
  } catch (error) {
    next(error);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const message = await conversationService.sendMessage(
      req.params.id,
      req.user.sub,
      req.body.content,
    );
    res.success(message, 201);
  } catch (error) {
    next(error);
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const messages = await conversationService.getMessage(req.params.id);
    res.success(messages);
  } catch (error) {
    next(error);
  }
};
