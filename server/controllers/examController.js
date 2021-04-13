const { Exam } = require("../models/exam.model.js");
const responseHelpers = require("../helpers/response.helpers");

exports.createExam = async (req, res) => {
  try {
  } catch (err) {
    responseHelpers.errorMessage(err, res, 400);
  }
};

exports.deleteExam = async (req, res) => {
  try {
  } catch (err) {
    responseHelpers.errorMessage(err, res, 400);
  }
};

exports.updateExam = async (req, res) => {
  try {
  } catch (err) {
    responseHelpers.errorMessage(err, res, 400);
  }
};

exports.getExam = async (req, res) => {
  try {
    await Exam.find(),
      (err, result) => {
        if (error) responseHelpers.errorMessage(err, res, 400);
        responseHelpers.successMessage(result, res, 200, "Exams List!");
      };
    return res.json({ msg: "Exam get request" });
  } catch (err) {
    responseHelpers.errorMessage(err, res, 400);
  }
};
