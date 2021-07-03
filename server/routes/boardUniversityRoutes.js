const express = require('express')
const router = express.Router()
const boardUniversityController = require('../controllers/boardUniversityController')
router.post('/addBoardUniversity', boardUniversityController.addBoardUniversity)
router.get('/getUniversities', boardUniversityController.getUniversities)
router.get('/getUniversityById', boardUniversityController.getUniversityById)
module.exports = router