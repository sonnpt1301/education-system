import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'on process', 'accomplish', 'reject', 'cancel'],
        default: 'pending'
    },
    bgImage: { type: String, default: 'course.jpg' },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    secretKey: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    assigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    reason: String
}, { timestamps: true });

export const Course = mongoose.model('courses', CourseSchema);
