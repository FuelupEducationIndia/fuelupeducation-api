const StudentAssignment = require('../models/studentAssignment.model')
const responseHelpers = require('../helpers/response.helpers');
/**
 * Create Student Assignment
 */
 exports.createStudentAssignment = async(req, res) => {
    if (!req.user.role == 'student'){
        return responseHelpers.errorMessage({message:'just student can create this assignment'}, res, 401)
    }

    const files = req.file

    if(!files){
        return responseHelpers.errorMessage({message:'upload file please'}, res, 401)
    }
    const info = req.body

    if(!info){
        return responseHelpers.errorMessage({message:'the body is empty'}, res, 401)
    }
    try {
        const newStudentAssignment = {
            owner_id:req.user._id,
            document : files
            ,comments:info.comments,
            originalAssignment_title:info.originalAssignment_title,
            originalAssignment_id:info.originalAssignment_id,
            originalAssignment_course:info.originalAssignment_course
        }
        const studentAssignment = await StudentAssignment.create(newStudentAssignment)
        res.status(200).send(studentAssignment)

    } catch (err) {
        responseHelpers.errorMessage(err, res, 400)
    }
}

/**
 * GeT review
 */
exports.getAssignmentReview= async(req, res) => {
    const id = req.user._id
    // if(req.user.role != 'student'){
    //     return responseHelpers.errorMessage({message:'this req for student only'}, res, 401)   
    // }
    try{
        const assignment = await StudentAssignment.find({owner_id:id})
        const review = {
            course:assignment.originalAssignment_course,
            flag:assignment.flag,
            reviewBy:assignment.feedbackOwner_name,
            feedback:assignment.feedback
        }
        if(!review.reviewBy){
            return responseHelpers.errorMessage({message:'no review yet'}, res, 401)
        }
        responseHelpers.successMessage(review, res, 200, "this is the review");
    } catch (err) {
       responseHelpers.errorMessage(err, res, 400)    
   }
}
/**
 * Re-submit assignment
 */
 exports.reSubmitAssignment = async(req, res) => {
    if (!req.user.role == 'student'){
        return responseHelpers.errorMessage({message:'just student can create this assignment'}, res, 401)
    }
    const id = req.user._id
    const files = req.file

    if(!files){
        return responseHelpers.errorMessage({message:'upload file please'}, res, 401)
    }

    const info = req.body
    try {
        const newStudentAssignment = {
            document : files,
            AskForClarification:info.AskForClarification
        }
        const studentAssignment = await StudentAssignment
        .findOneAndUpdate({owner_id:id},newStudentAssignment)
        if(!studentAssignment){
            return responseHelpers.errorMessage({message:"your original assignment un-found"}, res, 400)
        }
        responseHelpers.successMessage(studentAssignment, res, 200, "Re-submit is done!");
    } catch (err) {
        responseHelpers.errorMessage(err, res, 400)
    }
}
/**
 * GeT Grade
 */

 exports.getAssignmentGrade= async(req, res) => {
    const id = req.user._id
    try{
        const grade = await StudentAssignment.find({owner_id:id})
        if (grade.status = 'pending'){
            return responseHelpers.errorMessage({message:"your assignment have not final grade yet"}, res, 400)
        }
        const finalGrade = {
            course:grade.originalAssignment_course,
            gradingBy:grade.gradingOwner_name,
            grade:grade.grade
        }
        responseHelpers.successMessage(finalGrade, res, 200, "this is your grade");
    } catch (err) {
       responseHelpers.errorMessage(err, res, 400)    
   }
}