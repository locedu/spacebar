const express = require("express");
const router = express.Router();
const corsController = require("./cors.controller");

router.get("/", corsController.testCors);

module.exports = router;
