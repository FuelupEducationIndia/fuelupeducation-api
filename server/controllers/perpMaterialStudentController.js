var formidable = require("formidable");
const fs = require("fs");
var dir = __dirname + "/../uploads/qnaStudents/";
const { StudentPrepMaterial } = require("../models/prepMaterialsStudent.model");
const { mongo } = require("mongoose");

const path = require("path");
const responseHelpers = require("../helpers/response.helpers");

// API to get the recommended reading details based on CourseId and board/lecture/lang details the request Param :
exports.getRecommendedReadings = async (req, res, next) => {
  var prepMaterialList = await StudentPrepMaterial.findById(
    req.param("course_id"),
    {
      board_university: "University1",
      lecture: "Lecture",
      language: "English"
    },
    (err, result) => {
      if (err) responseHelpers.errorMessage(err, res, 400);
      responseHelpers.successMessage(
        result,
        res,
        200,
        "Student getRecommendedReadings retrieve successful !"
      );
    }
  );
};

// API to get the recommended podcast details based on CourseId and board/lecture/lang details the request Param :
exports.getRecommendedPodcasts = async (req, res, next) => {
  var prepMaterialList = await StudentPrepMaterial.findById(
    req.param("course_id"),
    {
      board_university: "University1",
      lecture: "Lecture",
      language: "English"
    },
    (err, result) => {
      if (err) responseHelpers.errorMessage(err, res, 400);
      responseHelpers.successMessage(
        result,
        res,
        200,
        "Student getRecommendedReadings retrieve successful !"
      );
    }
  );
};

// API to get the practice test data details :
exports.getPracticeTestData = async (req, res, next) => {
  var practiceTestData = await StudentPrepMaterial.findById(
    req.param("course_id"),
    {
      practice_question: [
        "Question1 ",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5"
      ],
      practice_question_options: ["Option1", "Option 2", "Option3"],
      practice_question_answer: ["Answer 1", "Answer 2", "Answer 3"]
    },
    (err, result) => {
      if (err) responseHelpers.errorMessage(err, res, 400);
      responseHelpers.successMessage(
        result,
        res,
        200,
        "Student practice test data retrieve successful !"
      );
    }
  );
};

// API to post student Practice Test Answer sheet details  :
exports.postPracticeTest = async (req, res, next) => {
  if (req.user.role == "student") {
    return responseHelpers.errorMessage(
      { message: "Only students are permitted to Submit Practice Test : " },
      res,
      401
    );
  }

  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    if (err) {
      responseHelpers.errorMessage(err, res, 400);
    }

    var insertPracticeTestData = {
      user_id: fields.user_id,
      course_id: fields.course_id,
      practice_questions: fields.practice_questions,
      board_university: fields.board_university,
      lecture: fields.lecture,
      language: fields.language,
      practice_question: fields.practice_question,
      practice_question_options: fields.practice_question_options,
      practice_question_answer: fields.practice_question_answer
    };

    StudentPrepMaterial.insertMany([insertPracticeTestData], function(
      error,
      result
    ) {
      if (error) responseHelpers.errorMessage(error, res, 400);
      responseHelpers.successMessage(
        result,
        res,
        200,
        "Practice Test Data Submitted successfully !"
      );
    });
  });
};
