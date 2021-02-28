const express = require('express');
const lectureController = require('../controllers/lectureController');
const router = express.Router();

// api for create lecture 
router.post('/createLecture', lectureController.createLecture);
router.get('/getAllLectures', lectureController.getAllLectures);
router.get('/getLecturesById', lectureController.getLecturesById);
router.delete('/deleteLectureById', lectureController.deleteLectureById);

module.exports = router