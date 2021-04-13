const mongoose = require("mongoose");

const CollaboratorSchema = new mongoose.Schema({ name: String });
const examSectionSchema = new mongoose.Schema({ name: String });

const examSchema = new mongoose.Schema({
  examTitle: {
    type: String,
    trim: true,
  },
  language: { type: String },
  collegeName: { type: String },
  universityName: { type: String },
  course: { type: String },
  status: {
    type: String,
    enum: ["certificate", "Atempt no 1", "wait for checking"],
    default: "Pending",
  },
  totalQuestions: { type: Number },
  creator: { type: String },
  collaborators: { type: [CollaboratorSchema] },
  score: { type: String },
  submissionDate: {
    type: Date,
    default: Date.now(),
  },
  totalExamTime: { type: Number },
  totalExamNumber: { type: Number },
  examSection: {
    type: [examSectionSchema],
  },
});

const Exam = mongoose.model("Exam", examSchema);

module.exports.Exam = Exam;
