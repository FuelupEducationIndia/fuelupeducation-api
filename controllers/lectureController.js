var formidable = require("formidable");
const fs = require("fs");
var dir = __dirname + '/../uploads/lectures/';
const {
    Lecture
} = require("../models/lecture.model");
const {
    mongo
} = require("mongoose");

// write code for lecture uploadto folder and save in database.

exports.createLecture = async(req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.send(err.message);
        }
        var newpath = '';
        if (files != '') {
            if (!fs.existsSync(dir)) {
                fs.mkdir(dir, {
                    recursive: true
                }, (err) => {
                    res.send(err);
                });
            }
            var oldpath = files.lecture_video.path;
            var newpath = __dirname + '/../uploads/lectures/' + files.lecture_video.name;

            fs.rename(oldpath, newpath, function(fileErr) {
                if (fileErr) throw fileErr;
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
            if (error) {
                res.send(error)
            } else {
                res.send(result);
            }

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
        if (err) {
            res.send(err);
        }
        if (result) {
            res.send(result);
        } else {
            res.send(JSON.stringify("Data not found!"));
        }

    })

}

// Api to get  lectures based on id
exports.getLecturesById = async(req, res, next) => {

    var lectureList = await Lecture.findById(req.param('id'), {
        created_at: 0
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result) {
            res.send(result);
        } else {
            res.send(JSON.stringify("Data not found!"));
        }

    })

}

// Api to update lecture using lecture id
// exports.updateLectureById = async(req, res, next) => {
//     var getLetcureById = await Lecture.findById(req.param('id'), (err, result) => {
//         if (err) {
//             res.send(err);
//         }
//         if (result) {
//             try {
//                 Lecture.updateOne({
//                     _id: new mongo.ObjectID(req.param('id'))
//                 }, (error) => {
//                     if (error) throw error;
//                 });
//                 res.send(JSON.stringify("Record deleted successfully!"));
//             } catch (e) {
//                 res.send(e);
//             }

//         } else {
//             res.send(JSON.stringify("Data not found!"));
//         }
//     })
// }

// Api to delete lecture using lecture id
exports.deleteLectureById = async(req, res, next) => {
    var getLetcureById = await Lecture.findById(req.param('id'), (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result) {
            try {
                Lecture.deleteOne({
                    _id: new mongo.ObjectID(req.param('id'))
                }, (error) => {
                    if (error) throw error;
                });
                res.send(JSON.stringify("Record deleted successfully!"));
            } catch (e) {
                res.send(e);
            }

        } else {
            res.send(JSON.stringify("Data not found!"));
        }
    })
}