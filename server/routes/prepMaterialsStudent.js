const express = require("express");
const prepMaterialStudent = require("../controllers/perpMaterialStudentController");
const router = express.Router();

router.post("/postPracticeTest", prepMaterialStudent.postPracticeTest);

router.get("/getPracticeTestData", prepMaterialStudent.getPracticeTestData);

router.get(
  "/getRecommendedReadings",
  prepMaterialStudent.getRecommendedReadings
);

router.get(
  "/getRecommendedPodcasts",
  prepMaterialStudent.getRecommendedPodcasts
);

module.exports = router;
