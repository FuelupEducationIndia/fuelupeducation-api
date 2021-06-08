const formidable = require("formidable");
const { TeacherPrepMaterial } = require("../models/prepMaterialTeacher.model");
const responseHelpers = require("../helpers/response.helpers");

// API to post Practice Quiz Test from teacher side login  :
exports.postCreateQuiz = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    if (err) {
      responseHelpers.errorMessage(err, res, 400);
    }

    const insertCreateQuizData = {
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
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    if (err) {
      responseHelpers.errorMessage(err, res, 400);
    }

    const insertCreateRecommendedPodcastData = {
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
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    if (err) {
      responseHelpers.errorMessage(err, res, 400);
    }

    const insertRecommendedReadingData = {
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
