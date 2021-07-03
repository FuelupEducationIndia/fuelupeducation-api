const express = require('express')
const router = express.Router()
const expressValidator = require('express-validator');
const {check, validationResult} = expressValidator
const courseController = require('../controllers/courseController')
const validator = require('./validation/validator')
router.post('/addCourse', 
[
    check('name').notEmpty().withMessage('Name is Required'),
], 
validator.isRequestValidated, courseController.addCourse)
router.get('/getCourses', courseController.getCourses)
router.get('/getCourse', courseController.getCourse)
module.exports = router