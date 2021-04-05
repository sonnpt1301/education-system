import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    bgImage: { type: String, default: 'blog.jpg' },
    status: {
        type: String,
        enum: ['pending', 'approve', 'reject'],
        default: 'pending',
    },
    files: [{
        fileName: { type: String },
        filePath: { type: String },
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'courses',
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export const Blog = mongoose.model('blogs', BlogSchema);