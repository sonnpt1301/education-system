import { Chat } from '../../models/chat.model.js'
import { AWS_FOLDER, EDUSYS_BUCKET } from '../../common/enum.js';
import md5 from 'md5'
import { downloadAWS, uploadAWS } from '../../common/aws.js';

export const getListMessageService = async (currentUser) => {
    const response = {
        statusCode: 200,
        message: 'Showing list messages successfully',
        data: {}
    }
    try {
        const messages = await Chat.find({
            $or: [
                { sender: currentUser._id }, { receiver: currentUser._id },
            ]
        })
            .populate({ path: 'sender', select: 'email profile' })
            .populate({ path: 'messages.sender', select: 'email profile' })
            .populate({ path: 'messages.receiver', select: 'email profile' })
            .populate({ path: 'receiver', select: 'email profile' })


        response.data = messages
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}


export const createMessageService = async (data, currentUser, file) => {
    const response = {
        statusCode: 201,
        message: 'Send message successfully',
        data: {}
    }
    try {
        const message = await Chat.findOne({
            $or: [
                { $and: [{ sender: currentUser._id }, { receiver: data.receiver }] },
                { $and: [{ receiver: currentUser._id }, { sender: data.receiver }] }
            ]
        })
        if (!message) {
            await Chat.create({
                sender: currentUser._id,
                receiver: data.receiver,
                messages: []
            })
        }
        const newMessage = await Chat.findOneAndUpdate({ _id: message._id }, {
            $push: { messages: { messages: data.messages, sender: currentUser._id, receiver: data.receiver } }
        }, { new: true })
        response.data = await newMessage
            .populate({ path: 'sender', select: 'email profile' })
            .populate({ path: 'messages.sender', select: 'email profile' })
            .populate({ path: 'messages.receiver', select: 'email profile' })
            .populate({ path: 'receiver', select: 'email profile' })
            .execPopulate()

    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}

export const uploadFileService = async (file) => {
    const response = {
        statusCode: 200,
        message: 'Upload file success',
        data: {}
    }
    try {
        const fileName = `${md5(Date.now())}.${md5(file.buffer)}.${file.originalname.split('.').pop()}`;
        await uploadAWS(EDUSYS_BUCKET, `${AWS_FOLDER.IMAGE}${fileName}`, file.buffer);
        response.data = { fileName }
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}