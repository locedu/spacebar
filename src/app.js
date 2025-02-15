const express = require("express");
const cors = require("cors");
const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

const { registerRoutes, loginRoutes, profileRoutes } = require("./features");

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Health checks
app.use("/health/database", require("./features/health/database/db.routes"));
app.use("/health/cors", require("./features/health/cors/cors.routes"));

// auth routes: register, login, profile
app.use("/api/auth", registerRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/auth", profileRoutes);

module.exports = app;
