import expressValidator from 'express-validator';

export const queryBuilder = (data) => {
    const result = {};
    if (data.title) {
        result.title = { $regex: `.*${data.title}.*`, $options: 'i' };
    }

    if (data.description) {
        result.description = { $regex: `.*${data.description}.*`, $options: 'i' };
    }

    if (data.status) {
        result.status = data.status;
    }

    if (data.category) {
        result.category = data.category;
    }

    return result;
};

export const sanitizeUpdateData = (data) => {
    const result = {};
    if (data.title) {
        result.title = data.title;
    }

    if (data.description) {
        result.description = data.description;
    }

    if (data.status) {
        result.status = data.status;
    }

    if (data.category) {
        result.category = data.category;
    }

    if (data.fromDate) {
        result.fromDate = data.fromDate;
    }

    if (data.toDate) {
        result.toDate = data.toDate;
    }

    if(data.assigned){
        result.assigned = data.assigned
    }

    return result;
};


export const createCourse = [
    expressValidator.body('title').notEmpty().withMessage('title is required'),
    expressValidator.body('description').notEmpty().withMessage('description is required'),
    expressValidator.body('fromDate').notEmpty().withMessage('fromDate is required'),
    expressValidator.body('toDate').notEmpty().withMessage('toDate is required')
]