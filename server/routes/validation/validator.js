// import { check, validationResult } from 'express-validator';
const expressValidator = require('express-validator');
const {check, validationResult} = expressValidator



module.exports = {
    isRequestValidated: function(req, res, next){
        const errors = validationResult(req)
        if (errors.array().length > 0) {
            return res.status(400).json({ "errors": errors.array()[0].msg })
        }
        next()
    }
}


