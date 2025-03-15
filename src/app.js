const express = require("express");
const cors = require("cors");
const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

const { 
  registerRoutes, 
  loginRoutes, 
  profileRoutes, 
  postRoutes, 
  commentRoutes, 
  likeRoutes, 
  userRoutes,  
  friendRoutes, 
  notificationRoutes, // Added Notification Routes
  activityRoutes // Added Activity Routes
} = require("./features");

const { 
  healthDatabaseConnectRoutes, 
  healthDatabaseMigrationRoutes, 
  healthCorsRoutes 
} = require('./features/health');

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Health checks
app.use("/api/health/cors", healthCorsRoutes);
app.use("/api/health/database/connect", healthDatabaseConnectRoutes);
app.use("/api/health/database/migration", healthDatabaseMigrationRoutes);

// auth (register, login, profile), post, comment, friend, notifications, activity
app.use("/api/auth", registerRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/users", userRoutes); // Registering User Routes
app.use("/api/friends", friendRoutes); // Registering Friend Routes
app.use("/api/notifications", notificationRoutes); // Registering Notification Routes
app.use("/api/activities", activityRoutes); // Registering Activity Routes

// Catch-all error handler (after all routes)
app.use((err, req, res, next) => {
  console.error(err);  

  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Malformed JSON in request body" });
  }
  
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
