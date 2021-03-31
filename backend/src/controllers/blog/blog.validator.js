import expressValidator from 'express-validator'

export const queryBuilder = (data) => {
    const result = {};
    if (data.title) {
        result.title = { $regex: `.*${data.title}.*`, $options: 'i' };
    }

    if (data.content) {
        result.content = { $regex: `.*${data.content}.*`, $options: 'i' };
    }

    if (data.status) {
        result.status = data.status;
    }

    return result;
};

export const sanitizeUpdateData = (data) => {
    const result = {}
    if (data.title) {
        result.title = data.title
    }

    if (data.content) {
        result.content = data.content
    }

    if (data.bgImage) {
        result.bgImage = data.bgImage
    }

    if (data.status) {
        result.status = data.status
    }

    if (data.files) {
        result.files = data.files
    }

    if (data.course) {
        result.course = data.course
    }

    return result
}

export const createBlog = [
    expressValidator.body('title').notEmpty().withMessage('title is required'),
    expressValidator.body('content').notEmpty().withMessage('content is required')
]