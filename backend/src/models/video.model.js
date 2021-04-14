import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
    },
    course: {
        type: mongoose.Schema.Types.ObjectId, ref: 'courses'
    },
    file: { type: String },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const Video = mongoose.model('videos', VideoSchema)
