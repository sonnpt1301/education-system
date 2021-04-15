import expressValidator from 'express-validator'

export const createActivity = [
    expressValidator.body('name').notEmpty().withMessage('Name is required'),
    expressValidator.body('description').notEmpty().withMessage('Description is required'),
    expressValidator.body('fromDate').notEmpty().withMessage('FromDate is required'),
    expressValidator.body('toDate').notEmpty().withMessage('ToDate is required'),
]