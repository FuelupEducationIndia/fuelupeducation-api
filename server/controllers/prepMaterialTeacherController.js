var formidable = require("formidable");
const fs = require("fs");
var dir = __dirname + "/../uploads/qnaStudents/";
const { TeacherPrepMaterial } = require("../models/prepMaterialTeacher.model");
const { mongo } = require("mongoose");

const path = require("path");
const responseHelpers = require("../helpers/response.helpers");

// API to post Practice Quiz Test from teacher side login  :
exports.postCreateQuiz = async (req, res, next) => {
  if (req.user.role == "teacher") {
    return responseHelpers.errorMessage(
      { message: "Only teachers are permitted to Create a Quiz : " },
      res,
      401
    );
  }

  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    if (err) {
      responseHelpers.errorMessage(err, res, 400);
    }

    var insertCreateQuizData = {
      course_id: fields.course_id,
      create_quiz: fields.create_quiz,
      board_university: fields.board_university,
      lecture: fields.lecture,
      language: fields.language,
      quiz_title: fields.quiz_title,
      create_quiz_question: fields.create_quiz_question,
      question_type: fields.question_type,
      practice_questions: fields.practice_questions,
      points: fields.points,
      suggested_questions: fields.suggested_questions,
      practice_question_answer: fields.practice_question_answer
    };

    TeacherPrepMaterial.insertMany([insertCreateQuizData], function(
      error,
      result
    ) {
      if (error) responseHelpers.errorMessage(error, res, 400);
      responseHelpers.successMessage(
        result,
        res,
        200,
        "Create Quiz Submitted successfully !"
      );
    });
  });
};

// API to post Recommended Podcast from teacher side login  :
exports.postRecommendedPodcast = async (req, res, next) => {
  if (req.user.role == "teacher") {
    return responseHelpers.errorMessage(
      {
        message: "Only teachers are permitted to Create Recommended Podcast : "
      },
      res,
      401
    );
  }
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    if (err) {
      responseHelpers.errorMessage(err, res, 400);
    }

    var insertCreateRecommendedPodcastData = {
      course_id: fields.course_id,
      recommended_podcasts: fields.recommended_podcasts,
      board_university: fields.board_university,
      lecture: fields.lecture,
      language: fields.language,
      podcast_title: fields.podcast_title,
      author: fields.author,
      short_description: fields.short_description,
      pasted_url: fields.pasted_url,
      entered_captcha: fields.entered_captcha
    };

    TeacherPrepMaterial.insertMany(
      [insertCreateRecommendedPodcastData],
      function(error, result) {
        if (error) responseHelpers.errorMessage(error, res, 400);
        responseHelpers.successMessage(
          result,
          res,
          200,
          "Recommended Podcast Submitted successfully !"
        );
      }
    );
  });
};

// API to post Recommended Readings from teacher side login  :
exports.postRecommendedReadings = async (req, res, next) => {
  if (req.user.role == "teacher") {
    return responseHelpers.errorMessage(
      {
        message:
          "Only teachers are permitted to Create a Recommended Reading : "
      },
      res,
      401
    );
  }
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    if (err) {
      responseHelpers.errorMessage(err, res, 400);
    }

    var insertRecommendedReadingData = {
      course_id: fields.course_id,
      recommended_readings: fields.recommended_readings,
      board_university: fields.board_university,
      lecture: fields.lecture,
      language: fields.language,
      reading_title: fields.reading_title,
      author: fields.author,
      short_description: fields.short_description,
      pasted_url: fields.pasted_url,
      attachment: fields.attachment,
      entered_captcha: fields.entered_captcha
    };

    TeacherPrepMaterial.insertMany([insertRecommendedReadingData], function(
      error,
      result
    ) {
      if (error) responseHelpers.errorMessage(error, res, 400);
      responseHelpers.successMessage(
        result,
        res,
        200,
        "Recommended Reading has been submitted successfully !"
      );
    });
  });
};
