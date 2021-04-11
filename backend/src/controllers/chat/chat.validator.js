import expressValidator from 'express-validator'

export const newMessage = [
    expressValidator.body('messages').notEmpty().withMessage('Message is required')
]