import expressValidator from 'express-validator'

export const queryBuilder = (data) => {
    const result = {}
    if(data.status){
        result.status = data.status
    }
}

export const createActivity = [
    expressValidator.body('name').notEmpty().withMessage('Name is required'),
    expressValidator.body('description').notEmpty().withMessage('Description is required'),
    expressValidator.body('fromDate').notEmpty().withMessage('FromDate is required'),
    expressValidator.body('toDate').notEmpty().withMessage('ToDate is required'),
]