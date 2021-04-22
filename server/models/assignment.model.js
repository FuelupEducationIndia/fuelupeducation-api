const mongoose= require('mongoose')
const schema = new mongoose.Schema({

    university:{
        type: String,
        required:true
    },
    semester:{
        type: String,
        required: true
    },
    course:{
        type:String,
        required:true
    },
    instructors_name:{
        type: String,
        required:true
    },
    studentOrGroup_name:{
        type:String,
        required:true
    },
    assignment_type:{
        type: String,
        enum: ['Project', 'Report'],
        default: 'Project'
    },
    max_grade:{
        type:Number,
        required:true
    },
    language:{
        type:String,
        enum:['English','Hindi','Gujarati','marathi'],
        default:'English'
    },
    due:{
        type:Date
    },
    assignment_title:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        minlength: 10,
        maxlength: 225
    },
    notes:{
        type:String,
        minlength: 10,
        maxlength: 225
    },
    deliverable:{
        type:String
    },
    document:{
            type:Object
        }

})
const Assignment = mongoose.model("Assignment", schema);

module.exports = Assignment;
