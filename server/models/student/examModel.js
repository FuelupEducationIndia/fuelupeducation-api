import mongoose from 'mongoose';
const { Schema } = mongoose;
import { hashSync, compareSync } from 'bcrypt';
const examSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    uniBoardId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    sectionId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    languageId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    options: [
        {
            questionId: {
                type: mongoose.Types.ObjectId,
                required: true,
            },
            answerId: {
                type: mongoose.Types.ObjectId,
                required: true,
            },
        }
    ],
    status: {
        type: Number,
        required: true,
    },
    noOfAttempts: {
        type: Number,
        required: true,
    },
}, {timestamps:true});
export default mongoose.model('exam', examSchema)


