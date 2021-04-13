const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");

router.get("/getexams", examController.getExam);

module.exports = router;
