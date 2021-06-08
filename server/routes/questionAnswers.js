const express = require("express");
const qnaController = require("../controllers/qnaController");
const router = express.Router();

router.post("/postQuestion", qnaController.postQuestion);
router.post("/postAnswer", qnaController.postAnswer);
router.get("/getQuestionById", qnaController.getQuestionById);
router.get("/geAnswerById", qnaController.getAnswerById);
router.delete("/deleteQuestionById", qnaController.deleteQuestionById);
router.delete("/deleteAnswerById", qnaController.deleteAnswerById);

module.exports = router;
