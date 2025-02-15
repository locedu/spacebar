const express = require("express");
const cors = require("cors");
const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

const { registerRoutes, loginRoutes } = require('./features');

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Health checks
app.use("/health/database", require("./features/health/database/db.routes"));
app.use("/health/cors", require("./features/health/cors/cors.routes"));

// register
app.use('/api/auth', registerRoutes);
//login
app.use('/api/auth', loginRoutes);

module.exports = app;
