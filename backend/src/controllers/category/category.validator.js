import expressValidator from 'express-validator';

export const createCategory = [
    expressValidator.body('name').notEmpty().withMessage('name is required'),
]