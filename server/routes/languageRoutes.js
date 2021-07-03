const express = require('express')
const router = express.Router()
const languageController = require('../controllers/languageController')
const validator = require('./validation/validator')
const { check, validationResult } = require('express-validator')
router.post('/addLanguage', 
[
    check('name').notEmpty().withMessage('Name is Required'),
], 
validator.isRequestValidated, languageController.addLanguage)
router.get('/getLanguages', languageController.getLanguages)
router.get('/getLanguage', languageController.getLanguage)
module.exports = router