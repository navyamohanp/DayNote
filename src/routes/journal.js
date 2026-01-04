const express = require("express");
const router = express.Router();
const journalController = require("../controllers/journal.controller");

router.post("/createJournal", journalController.createJournal);
router.put("/editJournal/:journalId", journalController.editJournal);
router.get("/getJournals", journalController.getAllJournals);
router.delete("/deleteJournal/:journalId", journalController.deleteJournal);

module.exports = router;
