import { getListMessageService, createMessageService } from './chat.process.js'

export const getListMessage = async (req, res) => {
    const { statusCode, message, data } = await getListMessageService(req.user)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const createMessage = async (req, res) => {
    const { statusCode, message, data } = await createMessageService(req.body, req.user)

    return res.status(statusCode).send({ statusCode, message, data })
}

