const express = require("express");
const prepMaterialTeacher = require("../controllers/prepMaterialTeacherController");
const router = express.Router();

router.post("/postCreateQuiz", prepMaterialTeacher.postCreateQuiz);

router.post(
  "/postRecommendedPodcast",
  prepMaterialTeacher.postRecommendedPodcast
);

router.post(
  "/postRecommendedReadings",
  prepMaterialTeacher.postRecommendedReadings
);

module.exports = router;
