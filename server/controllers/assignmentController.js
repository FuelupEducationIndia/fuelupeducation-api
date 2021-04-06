const Assignment = require('../models/assignment.model')
const StudentAssignment = require('../models/studentAssignment.model')
const responseHelpers = require('../helpers/response.helpers');
const path = require('path')
const fs = require('fs')
/**
 * Create Assignment
 */
exports.createAssignment = async(req, res) => {
    if (req.user.role = 'student'){
        console.log(req.user)
        return responseHelpers.errorMessage({message:'just teacher and admin can create assignment'}, res, 401)
    }
    const files = req.file
    if(!files){
        return responseHelpers.errorMessage({message:'upload file please'}, res, 401)
    }
    const info = req.body
    if(!info){
        return responseHelpers.errorMessage({message:'fill the info please'}, res, 401)
    }
    try {
        const newAssignment = {
            document : files,            
            university : info.boardOrUniversity,
            semester : info.classOrSemester,
            course : info.Course,
            instructors_name : info.yourName,
            studentOrGroup_name : info.studentOrGroup,
            assignment_type : info.assignmentType,
            max_grade : info.grade,
            language : info.language,
            due : info.due,
            assignment_title : info.assignmentTitle,
            overview : info. overview,
            notes : info.notes,
            deliverable : info.deliverable
        }
        const assignment = await Assignment.create(newAssignment)
        const dir = path.join(path.resolve('./'),'uploads','student-assignment',info.assignmentTitle);
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        responseHelpers.successMessage(assignment, res, 200, "Assignment created Successfully!");
    }catch (err) {
        responseHelpers.errorMessage(err, res, 400)
    }
}

/**
 * Get student Assignment by assignment title
 */
 exports.getStudentAssignmentsByTitle = async(req, res) => {
    if (req.user.role = 'student'){
        return responseHelpers.errorMessage({message:'just teacher and admin can get this req'}, res, 401)
    }
     try{
         const title = req.params.title
         const assignments = await StudentAssignment.find({originalAssignment_title:title})
         responseHelpers.successMessage(assignments, res, 200, "this is the assignment for the title");
     } catch (err) {
        responseHelpers.errorMessage(err, res, 400)    
    }
}

/**
 * Review an assignment to a student 
 */

 exports.reviewAssignment = async(req, res) => {
    if (req.user.role = 'student'){
        return responseHelpers.errorMessage({message:'just teacher and admin can review assignment'}, res, 401)
    }
    const info = req.body
    const studentAssignment_id = info.studentAssignment_id
    if(!info.feedback||!info.yourName||!info.flag||!info.studentOrGroup||info.studentAssignment_id){
        return responseHelpers.errorMessage({message:'incomplete info'}, res, 401)
    }
    try {
        const newReview = {
            feedback:info.feedback,
            feedbackOwner_name:info.yourName,
            flag:info.flag,
            studentOrGroup_name:info.studentOrGroup,
        }
        const review = await StudentAssignment.findByIdAndUpdate(studentAssignment_id,newReview)
        responseHelpers.successMessage(review, res, 200, "Review created Successfully!");
    }catch (err) {
        responseHelpers.errorMessage(err, res, 400)
    }
}


/**
 * Grading an assignment to a student 
 */


exports.gradingAssignment = async(req, res) => {
    if (req.user.role = 'student'){
        return responseHelpers.errorMessage({message:'just teacher and admin can review assignment'}, res, 401)
    }
    const info = req.body
    const studentAssignment_id = info.studentAssignment_id
    if(!info.grade||!info.yourName||!info.studentOrGroup||info.studentAssignment_id){
        return responseHelpers.errorMessage({message:'incomplete info'}, res, 401)
    }
    try {
        const newGrade = {
            grade:info.grade,
            gradingOwner_name:info.yourName,
            status:"Submitted",
            studentOrGroup_name:info.studentOrGroup,
        }
        const grade = await StudentAssignment.findByIdAndUpdate(studentAssignment_id,newGrade)
        responseHelpers.successMessage(grade, res, 200, "grading complete!");
    }catch (err) {
        responseHelpers.errorMessage(err, res, 400)
    }
}

/**
 * Get student Assignment by id
 */
 exports.getStudentAssignmentsById = async(req, res) => {
    const id = req.params.id     
    if(req.user.role= 'student' && req.user._id != id  ){
        return responseHelpers.errorMessage({message:'you do not have access for this req'}, res, 401)        
    }
    try{
        const assignment = await StudentAssignment.find({owner_id:id})
        responseHelpers.successMessage(assignment, res, 200, "this is the assignment for the title");
    } catch (err) {
       responseHelpers.errorMessage(err, res, 400)    
   }
}
