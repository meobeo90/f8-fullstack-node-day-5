const db = require("@/config/db");

async function addUserToConversation(conversationId, userId) {
  const [{ insertId }] = await db.query(
    "INSERT INTO conversation_participants(conversation_id,user_id) VALUES (?,?)",
    [conversationId, userId],
  );
  return insertId;
}

async function findConversationsByUser(userId) {
  const [rows] = await db.query(
    `SELECT conv.* 
    FROM conversations conv 
    JOIN conversation_participants conv_part 
    ON conv.id = conv_part.conversation_id 
    WHERE conv_part.user_id = ?`,
    [userId],
  );
  return rows;
}
async function checkParticipant(conversationId, userId) {
  const [rows] = await db.query(
    `SELECT id
      FROM conversation_participants
      WHERE conversation_id = ? AND user_id = ?`,
    [conversationId, userId],
  );
  return rows.length > 0;
}

module.exports = {
  findConversationsByUser,
  addUserToConversation,
  checkParticipant
};
