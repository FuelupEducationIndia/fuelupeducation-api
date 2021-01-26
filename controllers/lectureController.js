var formidable = require("formidable");
const fs = require("fs");
var dir = __dirname + '/../uploads/lectures/';
const {
    Lecture
} = require("../models/lecture.model");
const {
    mongo
} = require("mongoose");

const path = require('path');
const responseHelpers = require('../helpers/response.helpers');

// write code for lecture uploadto folder and save in database.

exports.createLecture = async(req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            responseHelpers.errorMessage(err, res, 400);
        }
        var newpath = '';
        if (files != '') {
            if (!fs.existsSync(dir)) {
                fs.mkdir(dir, {
                    recursive: true
                }, (err) => {
                    responseHelpers.errorMessage(err, res, 400);
                });
            }
            var oldpath = files.lecture_video.path;
            var newpath = path.join(__dirname, '/../uploads/lectures/', files.lecture_video.name);

            fs.rename(oldpath, newpath, function(fileErr) {
                if (fileErr) responseHelpers.errorMessage(fileErr, res, 400);
            });
        }

        var insertData = {
            course_id: fields.course_id,
            title: fields.title,
            description: fields.description,
            lecture_video: newpath,
            video_link: fields.video_link,
            user_id: fields.user_id,
        };
        Lecture.insertMany([insertData], function(error, result) {
            if (error) responseHelpers.errorMessage(error, res, 400);
            responseHelpers.successMessage(result, res, 200, "Lecture Created Successfully!");
        });
    });
};
// Api to get all lectures based on user_id
exports.getAllLectures = async(req, res, next) => {

    var lectureList = await Lecture.find({
        user_id: req.param('user_id')
    }, {
        created_at: 0
    }, (err, result) => {
        if (err) responseHelpers.errorMessage(err, res, 400);
        responseHelpers.successMessage(result, res, 200, "Lectures List!");

    })

}

// Api to get  lectures based on id
exports.getLecturesById = async(req, res, next) => {

    var lectureList = await Lecture.findById(req.param('id'), {
        created_at: 0
    }, (err, result) => {
        if (err) responseHelpers.errorMessage(err, res, 400);
        responseHelpers.successMessage(result, res, 200, "Lectures Record!");

    })

}

// Api to delete lecture using lecture id
exports.deleteLectureById = async(req, res, next) => {
    var getLetcureById = await Lecture.findById(req.param('id'), (err, result) => {
        if (err) responseHelpers.errorMessage(err, res, 400);
        try {
            Lecture.deleteOne({
                _id: new mongo.ObjectID(req.param('id'))
            }, (err) => {
                responseHelpers.errorMessage(err, res, 400);
            });
            responseHelpers.successMessage(new mongo.ObjectID(req.param('id')), res, 200, "Record deleted successfully");
        } catch (err) {
            responseHelpers.errorMessage(err, res, 400);
        }
    })
}