import { getListMessageService, createMessageService, uploadFileService } from './chat.process.js'

export const getListMessage = async (req, res) => {
    const { statusCode, message, data } = await getListMessageService(req.user)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const createMessage = async (req, res) => {
    const { statusCode, message, data } = await createMessageService(req.body, req.user)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const uploadFile = async (req, res) => {
    const { statusCode, message, data } = await uploadFileService(req.file)

    return res.status(statusCode).send({ statusCode, message, data })
}

