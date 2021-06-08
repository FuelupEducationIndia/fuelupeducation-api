const formidable = require("formidable");
const fs = require("fs");
const dir = __dirname + "/../uploads/qnaStudents/";
const { Qna } = require("../models/qna.model");
const { mongo } = require("mongoose");
const path = require("path");
const responseHelpers = require("../helpers/response.helpers");

// api to post a question from Student Account Login  :
exports.postQuestion = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      responseHelpers.errorMessage(err, res, 400);
    }

    const newPath = "";
    res.sendFiles(files);

    if (files != "") {
      if (!fs.existsSync(dir)) {
        fs.mkdir(
          dir,
          {
            recursive: true
          },
          err => {
            responseHelpers.errorMessage(err, res, 400);
          }
        );
      }
      const oldpath = files.attachment.path;
      const newpath = path.join(
        __dirname,
        "/../uploads/qnaAttachment/question/",
        files.attachment.name
      );

      fs.rename(oldpath, newpath, function(fileErr) {
        if (fileErr) responseHelpers.errorMessage(fileErr, res, 400);
      });
    }

    const insertQuestionData = {
      course_id: fields.course_id,
      posted_at_timestamp: fields.posted_at_timestamp,
      question_posted: fields.question_posted,
      answer_posted: fields.answer_posted,
      no_of_likes: fields.no_of_likes,
      attachment: newpath,
      no_of_replies: fields.no_of_replies,
      total_no_of_questions: fields.total_no_of_questions
    };

    Qna.insertMany([insertQuestionData], function(error, result) {
      if (error) responseHelpers.errorMessage(error, res, 400);
      responseHelpers.successMessage(
        result,
        res,
        200,
        "Question added successfully !"
      );
    });
  });
};

// api to post a question from Student Account Login  :
exports.postAnswer = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      responseHelpers.errorMessage(err, res, 400);
    }

    const newPath = "";
    res.sendFiles(files);

    if (files != "") {
      if (!fs.existsSync(dir)) {
        fs.mkdir(
          dir,
          {
            recursive: true
          },
          err => {
            responseHelpers.errorMessage(err, res, 400);
          }
        );
      }
      const oldpath = files.attachment.path;
      const newpath = path.join(
        __dirname,
        "/../uploads/qnaAttachment/",
        files.attachment.name
      );

      fs.rename(oldpath, newpath, function(fileErr) {
        if (fileErr) responseHelpers.errorMessage(fileErr, res, 400);
      });
    }

    const insertAnswerData = {
      course_id: fields.course_id,
      posted_at_timestamp: fields.posted_at_timestamp,
      answer_posted: fields.answer_posted,
      no_of_likes: fields.no_of_likes,
      attachment: newpath,
      no_of_replies: fields.no_of_replies,
      total_no_of_answers: fields.total_no_of_answers
    };

    Qna.insertMany([insertAnswerData], function(error, result) {
      if (error) responseHelpers.errorMessage(error, res, 400);
      responseHelpers.successMessage(
        result,
        res,
        200,
        "Answer added successfully !"
      );
    });
  });
};

// API to get Question details based on Id in the request Param :
exports.getQuestionById = async (req, res, next) => {
  const qnaList = await Qna.findById(
    req.param("id"),
    {
      posted_at_timestamp: 0
    },
    (err, result) => {
      if (err) responseHelpers.errorMessage(err, res, 400);
      responseHelpers.successMessage(
        result,
        res,
        200,
        "Qna's question retrieve successful !"
      );
    }
  );
};

//API to get answer details based on Id in the request param :
exports.getAnswerById = async (req, res, next) => {
  const qnaList = await Qna.findById(
    req.param("id"),
    {
      posted_at_timestamp: 0
    },
    (err, result) => {
      if (err) responseHelpers.errorMessage(err, res, 400);
      responseHelpers.successMessage(
        result,
        res,
        200,
        "Qna's answer retrieve successful !"
      );
    }
  );
};

//API to delete a question by Id in the request param :
exports.deleteQuestionById = async (req, res, next) => {
  //Student role is not authorized to delete any question:

  const deleteQuestionId = await Qna.findById(
    req.param("id"),
    (err, result) => {
      if (err) responseHelpers.errorMessage(err, res, 400);
      try {
        Qna.deleteOne(
          {
            _id: new mongo.ObjectID(req.param("id"))
          },
          err => {
            responseHelpers.errorMessage(err, res, 400);
          }
        );
        responseHelpers.successMessage(
          new mongo.ObjectID(req.param("id")),
          res,
          200,
          "Question deleted successfully"
        );
      } catch (err) {
        responseHelpers.errorMessage(err, res, 400);
      }
    }
  );
};

// API to delete an answer by Id in the request param :
exports.deleteAnswerById = async (req, res, next) => {
  //Student role is not authorized to delete any answer:
  const deleteAnswerId = await Qna.findById(req.param("id"), (err, result) => {
    if (err) responseHelpers.errorMessage(err, res, 400);
    try {
      Qna.deleteOne(
        {
          _id: new mongo.ObjectID(req.param("id"))
        },
        err => {
          responseHelpers.errorMessage(err, res, 400);
        }
      );
      responseHelpers.successMessage(
        new mongo.ObjectID(req.param("id")),
        res,
        200,
        "Answer deleted successfully"
      );
    } catch (err) {
      responseHelpers.errorMessage(err, res, 400);
    }
  });
};
