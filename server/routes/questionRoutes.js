const { Router } = require('express')
const router = Router()
const {isRequestValidated} = require('./validation/validator')
const { check, validationResult } = require('express-validator')
const { addQuestion, getQuestions, getOptions } = require('../controllers/questionController')


router.post('/addQuestion', 
[
    check('name').notEmpty().withMessage('Name is Required'),
], 
isRequestValidated, addQuestion)

router.get('/getQuestions', getQuestions)

router.get('/getOptions', getOptions)



module.exports = router