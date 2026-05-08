const express = require("express");
const router = express.Router();
const { getDb } = require("../db/database");

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

// Home
router.get("/", (req, res) => {
  const reviews = queryAll("SELECT * FROM reviews WHERE approved = 1 ORDER BY created_at DESC LIMIT 6");
  res.render("home", { title: "Family Golf — Eat. Drink. Play.", currentPage: "home", reviews });
});

// Lessons
router.get("/lessons", (req, res) => {
  res.render("lessons", { title: "Golf Lessons — Family Golf", currentPage: "lessons" });
});

// Adventure Golf
router.get("/adventure", (req, res) => {
  res.render("adventure", { title: "Adventure Golf — Family Golf", currentPage: "adventure" });
});

// Book
router.get("/book", (req, res) => {
  res.render("book", { title: "Book Now — Family Golf", currentPage: "book" });
});

// Contact
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us — Family Golf", currentPage: "contact" });
});

module.exports = router;
