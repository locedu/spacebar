const express = require("express");
const cors = require("cors");
const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

const { registerRoutes, loginRoutes, profileRoutes, postRoutes, commentRoutes, likeRoutes } = require("./features");
const { healthDatabaseConnectRoutes, healthDatabaseMigrationRoutes, healthCorsRoutes } = require('./features/health'); 
// const {}

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Health checks
app.use("/api/health/cors", healthCorsRoutes);
app.use("/api/health/database/connect", healthDatabaseConnectRoutes);
app.use("/api/health/database/migration", healthDatabaseMigrationRoutes);

// auth (register, login, profile), post, comment
app.use("/api/auth", registerRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/auth", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

// Catch-all error handler (after all routes)
app.use((err, req, res, next) => {
  console.error(err);  // Log the error (you can customize this)
  
  // Handle malformed JSON (bad request body)
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Malformed JSON in request body" });
  }
  
  // Handle other errors
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
