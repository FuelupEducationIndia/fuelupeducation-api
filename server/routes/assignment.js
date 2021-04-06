const express = require('express');
const controller = require('../controllers/assignmentController');
const router = express.Router();
const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null,path.resolve('./')+ '/uploads/teacher-assignment/')},
    filename: function (req, file, cb) {
      var filename = file.originalname;
      cb(null, Date.now() + "." + filename);
    
  }})
const uploadTeacher = multer({storage})
const auth = require('../middleware/auth');
router.post('/createAssignment', auth, uploadTeacher.single('files'), controller.createAssignment);
router.get('/studentAssignment/:title', auth,controller.getStudentAssignmentsByTitle )
router.put('/reviewAssignment', auth, controller.reviewAssignment)
router.put('/gradingAssignment', auth, controller.gradingAssignment)
router.get('/studentAssignment/:id', auth,controller.getStudentAssignmentsByTitle )
module.exports = router