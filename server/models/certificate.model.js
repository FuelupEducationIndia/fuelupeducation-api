const mongoose = require('mongoose');
const {
    date
} = require('joi');

const schema = new mongoose.Schema({
    instructor_name: {
        type: String,
        required: true
    },
    instructor_signature: {
        type: String
    },
    date: {
        type: Date,
    },
    university: {
        type: String
    },
    language: {
        type: String
    },
    background: {
        type: String
    },
    institute_info: {
        type: Object
    },
    student_info: {
        type: Object
    }

});

const Certificate = new mongoose.model('Certificate', schema);
module.exports.Certificate = Certificate;