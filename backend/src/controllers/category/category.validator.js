import expressValidator from 'express-validator';


export const queryBuilder = (data) => {
    const result = {};
    if (data.name) {
        result.name = { $regex: `.*${data.name}.*`, $options: 'i' };
    }
    return result;
};

export const createCategory = [
    expressValidator.body('name').notEmpty().withMessage('Name is required'),
]