const {
    Certificate
} = require('../models/certificate.model');
const responseHelpers = require('../helpers/response.helpers');
const {
    mongo
} = require("mongoose");
/**
 * Create Certificate
 */
exports.createCertificate = async(req, res) => {
        try {
            let postData = processData(req);
            let certificate = await Certificate.create(postData)
            responseHelpers.successMessage(certificate, res, 200, "Certificate Added Successfully!");

        } catch (err) {
            responseHelpers.errorMessage(err, res, 400)
        }

    }
    /**
     * Get certificate list
     * @method POST
     * @param {*} req 
     * @param {*} res 
     */
exports.getCertificate = async(req, res) => {
        try {
            let certificate = await Certificate.find();
            responseHelpers.successMessage(certificate, res, 200, "Certificate List!");
        } catch (err) {
            responseHelpers.errorMessage(err, res, 400)
        }
    }
    /**
     * Delete certificate by certificateId
     * @param {*} req 
     * @param {*} res 
     */
exports.deleteCertificateById = async(req, res) => {
        try {
            let certificate = await Certificate.find({
                _id: new mongo.ObjectID(req.params.Id)
            }, (err, result) => {
                if (err) responseHelpers.errorMessage(err, res, 400);
                if (result) {
                    try {
                        Certificate.deleteOne({
                            "_id": new mongo.ObjectID(req.params.Id)
                        }, (err) => {
                            responseHelpers.errorMessage(err, res, 400);
                        });
                        responseHelpers.successMessage(new mongo.ObjectID(req.params.Id), res, 200, "Record Deleted Successfully!");
                    } catch (err) {
                        responseHelpers.errorMessage(err, res, 400);
                    }


                }
            });
        } catch (err) {
            responseHelpers.errorMessage(err, res, 400);
        }
    }
    /**
     * Update Certificate By Id
     * @param {*} req 
     * @param {*} res 
     */
exports.updateCertificateById = async(req, res) => {
        try {
            let certificate = await Certificate.find({
                _id: new mongo.ObjectID(req.params.Id)
            }, (err, result) => {
                if (err) responseHelpers.errorMessage(err, res, 400);
                if (result) {
                    try {
                        let updateData = processData(req);
                        Certificate.update({
                            _id: new mongo.ObjectID(req.params.Id)
                        }, {
                            $set: updateData
                        }).then(result => {
                            responseHelpers.successMessage(certificate, res, 200, "Record Updated Successfully!");
                        }).catch(err => {
                            responseHelpers.errorMessage(err, res, 400)
                        });

                    } catch (err) {
                        responseHelpers.errorMessage(err, res, 400);
                    }


                }
            });
        } catch (err) {
            responseHelpers.errorMessage(err, res, 400);
        }
    }
    /**
     * Return processed Data
     * @param {*} req 
     */
function processData(req) {
    if (Object.keys(req.body.institute_details).length > 0) {
        var instituteDetail = {
            institute_name: req.body.institute_details.instituteName,
            institute_address: req.body.institute_details.instituteAddress,
            city: req.body.institute_details.city,
            province: req.body.institute_details.province,
            postal_code: req.body.institute_details.postalCode,
            country: req.body.institute_details.country,
            email: req.body.institute_details.email,
            phone: req.body.institute_details.phone,
            tax: req.body.institute_details.tax,
        }
    }
    if (Object.keys(req.body.student_details).length > 0) {
        var studentDetail = {
            student_name: req.body.student_details.studentName,
            student_id: req.body.student_details.studentID,
            father_name: req.body.student_details.fatherName,
            mother_name: req.body.student_details.motherName,
            semester: req.body.student_details.semester,
            course: req.body.student_details.course,
            start_date: req.body.student_details.startDate,
            end_date: req.body.student_details.endDate,
            credit: req.body.student_details.credit,
            grade: req.body.student_details.grade,
        }
    }
    var processedData = {
        instructor_name: req.body.instructorName,
        instructor_signature: req.body.instructorSignature,
        date: req.body.date,
        university: req.body.university,
        language: req.body.language,
        background: req.body.background,
        institute_info: instituteDetail,
        student_info: studentDetail
    }
    return processedData;
}