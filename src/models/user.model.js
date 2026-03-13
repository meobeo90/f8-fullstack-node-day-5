const db = require("@/config/db");

// Tìm user theo id
async function findById(id) {
  const [rows] = await db.query(
    "SELECT id, email FROM users WHERE id = ? LIMIT 1",
    [id],
  );
  return rows[0];
}

// Tìm chính xác user theo email
async function findByEmail(email) {
  const [rows] = await db.query(
    "SELECT id, email, password FROM users WHERE email = ? LIMIT 1",
    [email],
  );
  return rows[0];
}

// Tìm kiếm user theo từ khóa email
async function searchByEmail(emailKeyword) {
  const [rows] = await db.query(
    "SELECT id, email FROM users WHERE email LIKE ?",
    [`%${emailKeyword}%`],
  );
  return rows;
}

// CREATE
async function createUser(email, password) {
  const [{ insertId }] = await db.query(
    "INSERT INTO users(email, password) VALUES (?,?)",
    [email, password],
  );
  return {
    id: insertId,
    email,
  };
}

module.exports = {
  findByEmail,
  findById,
  searchByEmail,
  createUser,
};
