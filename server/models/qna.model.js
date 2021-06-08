const mongoose = require("mongoose");
const { string } = require("joi");

const qnaSchema = new mongoose.Schema({
  course_id: {
    type: Number,
    required: true
  },
  posted_at_timestamp: {
    type: Date,
    default: Date.now()
  },
  question_posted: {
    type: String,
    minlength: 5,
    maxlength: 500
  },
  answer_posted: {
    type: String,
    minlength: 3,
    maxlength: 500
  },
  no_of_likes: {
    type: Number,
    default: 0
  },
  attachment: {
    type: Object
  },
  no_of_replies: {
    type: Number,
    default: 0
  },
  total_no_of_questions: {
    type: Number
  },
  total_no_of_answers: {
    type: Number
  }
});

const qnAnswerStudent = mongoose.model("qnAnswerStudent", qnaSchema);

module.exports.qnAnswerStudent = qnAnswerStudent;
