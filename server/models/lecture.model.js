const mongoose = require('mongoose');
const {
    string
} = require('joi');

const lectureSchema = new mongoose.Schema({
    course_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 225
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 300
    },
    lecture_video: {
        type: String
    },
    video_link: {
        type: String
    },
    user_id: {
        type: Number
    },
    status: {
        type: String,
        enum: ['1', '0'],
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});


const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports.Lecture = Lecture;