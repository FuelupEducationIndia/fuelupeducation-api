const mongoose = require("mongoose");
const { string } = require("joi");

const prepMaterialSchema = new mongoose.Schema({
  create_quiz: {
    type: Boolean,
    default: "false"
  },
  quiz_title: {
    type: String
  },
  suggested_questions: {
    type: String,
    enum: ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
  },
  question_bank: {
    type: String,
    enum: ["Question1", "Question2", "Question3"]
  },
  question_type: {
    type: String,
    enum: ["Multiple Choice", "Free Text"]
  },
  points: {
    type: Number,
    default: 1
  },
  recommended_readings: {
    type: Boolean,
    default: "false"
  },
  recommended_podcasts: {
    type: Boolean,
    default: "false"
  },
  practice_questions: {
    type: Boolean,
    default: "false"
  },
  board_university: {
    type: String,
    enum: ["University1", "University2", "University3"]
  },
  lecture: {
    type: String,
    enum: ["Lecture 1", "Lecture 2", "Lecture 3"]
  },
  language: {
    type: String,
    enum: ["English", "Hindi", "Marathi"]
  },
  suggested_videos: {
    type: Object,
    enum: ["The Solar System", "link2", "link3", "link4", "link5"]
  },
  course_id: {
    type: Number,
    required: true
  },
  total_practice_question_numbers: {
    type: Number,
    default: 5
  },
  practice_question: {
    type: String,
    enum: ["Question1 ", "Question 2", "Question 3", "Question 4", "Question 5"]
  },
  practice_question_options: {
    type: String,
    enum: ["Option1", "Option 2", "Option3"]
  },
  practice_question_answer: {
    type: String,
    enum: ["Answer 1", "Answer 2", "Answer 3"]
  },
  podcast_title: {
    type: String
  },
  author: {
    type: String
  },
  short_description: {
    type: String
  },
  pasted_url: {
    type: String
  },
  attachment: {
    type: Object
  },
  create_quiz_question: {
    type: String,
    default: "Type Your question ...."
  },
  entered_captcha: {
    type: String
  },
  reading_title: {
    type: String
  }
});

const prepMaterialTeacher = mongoose.model(
  "prepMaterialTeacher",
  prepTeacherSchema
);

module.exports.prepMaterialTeacher = prepMaterialTeacher;
