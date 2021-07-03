import examModel from '../../models/student/examModel.js';
export function addExam(req, res) {
    const { userId, uniBoardId, courseId, sectionId, languageId, options, status, noOfAttempts } = req.body
    const newData = {
        userId, uniBoardId, courseId, sectionId, languageId, options, status, noOfAttempts
    }
    const _exam = new examModel(newData);
    _exam.save((error, data) => {
        if (error) {
            return res.json({
                message: error
            })
        }
        if (data) {
            return res.json({
                message: "Exam Attempted Successfully..."
            })
        }
    })
}