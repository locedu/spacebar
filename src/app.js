const express = require("express");
const cors = require("cors");

const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Health checks
app.use("/health/database", require("./features/health/database/db.routes"));
app.use("/health/cors", require("./features/health/cors/cors.routes"));

module.exports = app;
