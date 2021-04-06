const express = require('express');
const controller = require('../controllers/studentAssignmentController');
const router = express.Router();
const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null,path.resolve('./')+ '/uploads/student-assignment/'+req.params.folderName)},
    filename: function (req, file, cb) {
      var filename = file.originalname;
      cb(null, Date.now() + "." + filename);
  }})
const upload = multer({storage})
const auth = require('../middleware/auth')
router.post('/createStudentAssignment/:folderName', auth, upload.single('files'), controller.createStudentAssignment);
router.get('/getStudentAssignmentReview', auth, controller.getAssignmentReview)
router.put('/reSubmitAssignment', auth,controller.reSubmitAssignment)
router.get('/getAssignmentGrade', auth, controller.getAssignmentGrade)
module.exports = router