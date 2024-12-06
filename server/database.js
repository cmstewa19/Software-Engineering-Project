const sqlite3 = require('sqlite3').verbose();
require('dotenv').config(); // Load environment variables

const db = new sqlite3.Database('./server/tickets.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      userid INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      phone_number VARCHAR(20),
      card_number INTEGER,
      billing_address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Tickets (
      ticketid INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      train_id INTEGER NOT NULL,
      departure_time DATETIME NOT NULL,
      arrival_time DATETIME NOT NULL,
      seat_number VARCHAR(60),
      qr_code TEXT,
      price DECIMAL(4, 2),
      purchase_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      scanned BOOLEAN DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES Users(userid)
    )
  `);

  console.log('Tables created or already exist.');
});

module.exports = db;
