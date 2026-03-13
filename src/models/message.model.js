const db = require("@/config/db");

async function createMessage(conversationId, senderId, content) {
  const [{ insertId }] = await db.query(
    "INSERT INTO messages(conversation_id,sender_id,content) VALUES (?,?,?)",
    [conversationId, senderId, content],
  );
  return { id: insertId };
}

async function getMessages(conversationId) {
  const [rows] = await db.query(
    `SELECT mess.*, users.email as sender_email
    FROM messages mess 
    JOIN users ON mess.sender_id = users.id
    WHERE mess.conversation_id =?
    ORDER BY mess.created_at`,
    [conversationId],
  );

  return rows;
}
module.exports = { createMessage, getMessages };
