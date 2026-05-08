const express = require("express");
const path = require("path");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

const db = require("./db/database");
const pageRoutes = require("./routes/pages");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

// Security & performance middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());
app.use(morgan("dev"));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, try again later." },
});
app.use("/api", apiLimiter);

// Static files
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
app.use("/", pageRoutes);
app.use("/api", apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found", currentPage: "" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", {
    title: "Server Error",
    currentPage: "",
    message: "Something went wrong. Please try again later.",
  });
});

// Initialize database then start server
if (require.main === module) {
  db.initialize().then(() => {
    app.listen(PORT, () => {
      console.log(`\n  Family Golf is running at:`);
      console.log(`  -> Local:     http://localhost:${PORT}`);
      console.log(`  -> Lessons:   http://localhost:${PORT}/lessons`);
      console.log(`  -> Adventure: http://localhost:${PORT}/adventure`);
      console.log(`  -> Book:      http://localhost:${PORT}/book`);
      console.log(`  -> Contact:   http://localhost:${PORT}/contact`);
      console.log(`\n  API Endpoints:`);
      console.log(`  -> GET  /api/reviews`);
      console.log(`  -> POST /api/bookings`);
      console.log(`  -> POST /api/contact`);
      console.log(`  -> POST /api/newsletter\n`);
    });
  });
}

module.exports = { app, db };
