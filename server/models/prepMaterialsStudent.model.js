const mongoose = require("mongoose");
const { string } = require("joi");

const prepMaterialSchema = new mongoose.Schema({
  user_id: {
    type: Number
  },
  create_assignments: {
    type: Boolean,
    default: "false"
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
  }
});

const prepMaterialStudent = mongoose.model(
  "prepMaterialStudent",
  prepStudentSchema
);

module.exports.prepMaterialStudent = prepMaterialStudent;
