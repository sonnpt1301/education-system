import mongoose from 'mongoose'

const ActivitySchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'courses',
        required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    files: [{
        fileName: { type: String },
        filePath: { type: String },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, ref: 'users',
        },
    }],
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['onProcess', 'outDate', 'hidden'],
        default: 'onProcess'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
    },
}, { timestamps: true })

export const Activity = mongoose.model('activities', ActivitySchema)
