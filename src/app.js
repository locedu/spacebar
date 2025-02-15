const express = require("express");
const cors = require("cors");
const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

const { registerRoutes, loginRoutes, profileRoutes } = require("./features");
const { healthDatabaseConnectRoutes, healthDatabaseMigrationRoutes, healthCorsRoutes } = require('./features/health'); 

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Health checks
app.use("/api/health/cors", healthCorsRoutes);
app.use("/api/health/database", healthDatabaseConnectRoutes);
app.use("/api/health/database/migration", healthDatabaseMigrationRoutes);  // Singular for the migration check



// auth routes: register, login, profile
app.use("/api/auth", registerRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/auth", profileRoutes);

module.exports = app;
