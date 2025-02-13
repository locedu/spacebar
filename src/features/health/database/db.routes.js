const express = require("express");
const router = express.Router();
const dbController = require("./db.controller");

router.get("/", dbController.checkDatabase);

module.exports = router;
