const express = require("express");
const router = express.Router();
const journalController = require("../controllers/journal.controller");

router.post("/createJournal", journalController.createJournal);

module.exports = router;
