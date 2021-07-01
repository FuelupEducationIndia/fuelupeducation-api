const express = require('express')
const router = express.Router()
const validator = require('./validation/validator')
const { check, validationResult } = require('express-validator')
const { addSection, getSections } = require('../controllers/sectionController')


router.post('/addSection', 
[
    check('name').notEmpty().withMessage('Name is Required'),
], 
validator.isRequestValidated, addSection)

router.get('/getSections', getSections)

module.exports = router