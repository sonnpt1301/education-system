import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        messages: String,
        file: String,
        createdAt: Date
    }]
}, { timestamps: true })

export const Chat = mongoose.model('chats', ChatSchema)
