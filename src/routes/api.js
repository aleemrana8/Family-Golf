const express = require("express");
const router = express.Router();
const { getDb, save } = require("../db/database");

// Helper to run SELECT and get array of objects
function queryAll(sql, params = []) {
  const db = getDb();
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

// Helper to run INSERT/UPDATE
function runSql(sql, params = []) {
  const db = getDb();
  db.run(sql, params);
  save();
}

// ── Newsletter Subscribe ──
router.post("/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Valid email is required." });
  }
  try {
    runSql("INSERT OR IGNORE INTO newsletter (email) VALUES (?)", [email.trim().toLowerCase()]);
    res.json({ success: true, message: "Thanks for subscribing!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error. Try again." });
  }
});

// ── Create Booking ──
router.post("/bookings", (req, res) => {
  const { name, email, phone, date, time, activity, guests, notes } = req.body;

  if (!name || !email || !phone || !date || !time || !activity) {
    return res.status(400).json({ success: false, message: "All required fields must be filled." });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ success: false, message: "Valid email is required." });
  }

  try {
    runSql(
      "INSERT INTO bookings (name, email, phone, date, time, activity, guests, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name.trim(), email.trim().toLowerCase(), phone.trim(), date, time, activity, guests || 1, notes || ""]
    );
    res.json({ success: true, message: "Booking confirmed! We'll send a confirmation to your email." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Could not process booking. Try again." });
  }
});

// ── Get Bookings ──
router.get("/bookings", (req, res) => {
  try {
    const bookings = queryAll("SELECT * FROM bookings ORDER BY created_at DESC LIMIT 50");
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── Contact Form ──
router.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ success: false, message: "Valid email is required." });
  }

  try {
    runSql(
      "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name.trim(), email.trim().toLowerCase(), subject.trim(), message.trim()]
    );
    res.json({ success: true, message: "Message sent! We'll get back to you soon." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Could not send message. Try again." });
  }
});

// ── Submit Review ──
router.post("/reviews", (req, res) => {
  const { name, rating, comment } = req.body;

  if (!name || !rating || !comment) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  const r = parseInt(rating);
  if (isNaN(r) || r < 1 || r > 5) {
    return res.status(400).json({ success: false, message: "Rating must be 1-5." });
  }

  try {
    runSql("INSERT INTO reviews (name, rating, comment) VALUES (?, ?, ?)", [name.trim(), r, comment.trim()]);
    res.json({ success: true, message: "Review submitted! It will appear after approval." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Could not submit review. Try again." });
  }
});

// ── Get Approved Reviews ──
router.get("/reviews", (req, res) => {
  try {
    const reviews = queryAll("SELECT id, name, rating, comment, created_at FROM reviews WHERE approved = 1 ORDER BY created_at DESC");
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
