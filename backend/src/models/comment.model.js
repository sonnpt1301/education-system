import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'blogs' },
}, { timestamps: true })

export const Comment = mongoose.model('comments', CommentSchema)
