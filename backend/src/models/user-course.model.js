import mongoose from 'mongoose'

const UserCourseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
    isJoined: { type: Boolean, default: true }
}, { timestamps: true })

export const UserCourse = mongoose.model('users_courses', UserCourseSchema)
