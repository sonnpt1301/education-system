import expressValidator from 'express-validator'

export const joinCourse = [
    expressValidator.body('secretKey').notEmpty().withMessage('Secret key is required'),
];
