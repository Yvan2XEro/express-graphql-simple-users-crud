const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('users.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      birth_date TEXT,
      gender TEXT
    )
  `);
});

module.exports = db;
