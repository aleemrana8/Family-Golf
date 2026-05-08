const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const DB_DIR = path.join(__dirname, "..", "..", "data");
const DB_PATH = path.join(DB_DIR, "familygolf.db");

let db;

function getDb() {
  if (!db) throw new Error("Database not initialized. Call initialize() first.");
  return db;
}

// Save database to disk
function save() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

async function initialize() {
  const SQL = await initSqlJs();

  fs.mkdirSync(DB_DIR, { recursive: true });

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      activity TEXT NOT NULL,
      guests INTEGER DEFAULT 1,
      notes TEXT,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS newsletter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      subscribed_at TEXT DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      comment TEXT NOT NULL,
      approved INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Seed reviews if empty
  const countResult = db.exec("SELECT COUNT(*) as c FROM reviews");
  const count = countResult[0].values[0][0];
  if (count === 0) {
    const stmt = db.prepare("INSERT INTO reviews (name, rating, comment, approved) VALUES (?, ?, ?, 1)");
    stmt.run(["Sarah M.", 5, "Excellent couple of hours, relax and enjoy the fun. Staff were accommodating, friendly and very helpful. Café on site for refreshments. Will keep children entertained during the holidays!"]);
    stmt.run(["James P.", 5, "Best driving range in South East London! The TopTracer technology makes practice so much more fun. Kids loved the adventure golf too."]);
    stmt.run(["Emily R.", 4, "Great family day out. The crazy golf courses are brilliant and the coffee shop does great food. Will definitely be coming back!"]);
    stmt.run(["David K.", 5, "Had my first golf lesson here and it was fantastic. The instructor was patient and really helped me improve my swing. Highly recommend!"]);
    stmt.free();
  }

  save();
  console.log("  Database initialized successfully.");
}

module.exports = { getDb, initialize, save };
