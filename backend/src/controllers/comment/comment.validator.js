import expressValidator from 'express-validator';

export const createComment = [
    expressValidator.body('content').notEmpty().withMessage('content is required'),
    expressValidator.body('blog').notEmpty().withMessage('blog is required'),
];
