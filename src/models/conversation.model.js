const db = require("@/config/db");

async function createConversation(name, type, createdBy) {
  const [{ insertId }] = await db.query(
    "INSERT INTO conversations(name,type,created_by) VALUES (?,?,?)",
    [name, type, createdBy],
  );

  return {
    id: insertId,
    name,
    type,
    created_by: createdBy,
  };
}

async function findConversationById(id) {
  const [rows] = await db.query("SELECT * FROM conversations WHERE id = ?", [
    id,
  ]);
  return rows[0];
}

module.exports = { createConversation, findConversationById };
