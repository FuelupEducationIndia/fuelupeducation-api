// import courseModel from '../models/courseModel.js';
const courseModel = require('../models/courseModel.js');


module.exports = {

    addCourse: function (req, res) {
        const inputData = req.body.name
        const name = inputData.toLowerCase()
        const newData = {
            name
        }
        courseModel.findOne({ name: name }).exec(function (err, course) {
            if (err)
                return res.json({ "err": err });

            if (course)
                return res.json({ "Course": "Course Already Exists..." });

            else {
                const _course = new courseModel(newData);

                _course.save((error, data) => {
                    if (error) {
                        return res.json({
                            message: error
                        })
                    }
                    if (data) {
                        return res.json({
                            message: "Course Added Successfully..."
                        })
                    }
                })
            }
        });
    },


    getCourses: function (req, res) {
        courseModel.find().exec(function (err, data) {
            if (err) return res.json({ "err": err })

            if (data) return res.json({ "courses": data })
        })
    },




    getCourse: function (req, res) {
        const inputData = req.body
        if (inputData.id !== '') {
            courseModel.findById(inputData.id).exec(function (err, data) {
                if (err) return res.json({ "err": err })

                if (data) return res.json({ "insititution": data })

                else {
                    return res.json({ "insititutions": "No Record Found..." })
                }
            })
        }
        else {
            return res.json({})
        }
    }




}



