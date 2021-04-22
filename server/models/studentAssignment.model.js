const { stat } = require('fs');
const { string } = require('joi');
const mongoose= require('mongoose')
const schema = new mongoose.Schema({
    owner_id:{
        type:String
    },
    comments:{
        type:String
    },
    document:{
            type:Object
        },
    originalAssignment_id:{
        type:String,
        required:true
    },
    originalAssignment_title:{
        type:String,
        required:true
    },
    originalAssignment_course:{
        type:String,
        required:true
    },
    flag:{
        type:String,
        enum:['Need to improve', "Good"],
        default:"Need to improve"
    },
    feedbackOwner_name:{
        type:String
    },
    feedback:{
        type:String
    },
    grade:{
        type:Number
    },
    gradingOwner_name:{
        type:String
    },
    status:{
        type:String,
        enum:["Submitted","Pending"],
        default:"Pending"
    },
    AskForClarification:{
        type:String
    }

})
const StudentAssignment = mongoose.model("StudentAssignment", schema);

module.exports = StudentAssignment;
