const conversationModel = require("@/models/conversation.model");
const participantModel = require("@/models/participant.model");
const mesageModel = require("@/models/message.model");
const HttpError = require("@/utils/HttpError");

exports.createConversation = async (data, userId) => {
  const { name, type, participant_ids = [] } = data;
  if (!type) {
    throw HttpError(400, "Type is required");
  }
  const conversation = await conversationModel.createConversation(
    name,
    type,
    userId,
  );
  //   ADD CREATOR
  await participantModel.addUserToConversation(conversation.id, userId);
  //   ADD PARTICIPANT
  for (const id of participant_ids) {
    if (id !== userId) {
      await participantModel.addUserToConversation(conversation.id, id);
    }
  }
  return conversation;
};

exports.findConversationsByUser = async (userId) => {
  return participantModel.findConversationsByUser(userId);
};

exports.addUserToConversation = async (conversationId, userId) => {
  const conversation =
    await conversationModel.findConversationById(conversationId);
  if (!conversation) {
    throw HttpError(404, "Conversation not found");
  }
  if (conversation.type !== "group") {
    throw HttpError(400, "Cannot add participant to direct conversation");
  }
  const existedParticipant = await participantModel.checkParticipant(
    conversationId,
    userId,
  );
  if (existedParticipant) {
    throw HttpError(400, "User already in conversation");
  }
  await participantModel.addUserToConversation(conversationId, userId);
  return { message: "Participant added" };
};

exports.sendMessage = async (conversationId, senderId, content) => {
  if (!content) {
    throw HttpError(400, "Content is required");
  }
  const conversation =
    await conversationModel.findConversationById(conversationId);
  if (!conversation) {
    throw HttpError(404, "Conversation not found");
  }
  const isParticipant = await participantModel.checkParticipant(
    conversationId,
    senderId,
  );
  if (!isParticipant) {
    throw HttpError(404, "You are not a participant of this conversation.");
  }

  return mesageModel.createMessage(conversationId, senderId, content);
};

exports.getMessage = async (conversationId, senderId) => {
  const conversation =
    await conversationModel.findConversationById(conversationId);
  if (!conversation) {
    throw HttpError(404, "Conversation not found");
  }
  const isParticipant = await participantModel.checkParticipant(
    conversationId,
    senderId,
  );
  if (!isParticipant) {
    throw HttpError(403, "You are not a participant of this conversation.");
  }
  return mesageModel.getMessages(conversationId);
};
