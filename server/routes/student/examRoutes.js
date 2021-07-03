import { Router } from 'express'
const router = Router()
import {isRequestValidated} from '../validators/validator.js'
import { check, validationResult } from 'express-validator';
import { addExam } from '../../controllers/student/examController.js'
router.post('/addExam', addExam)
export default router