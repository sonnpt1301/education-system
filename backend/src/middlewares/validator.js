import expressValidator from 'express-validator';
import _ from 'lodash';

export const validateRequest = (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).send({
            statusCode: 400,
            message: errors.array()[0].msg,
            data: {},
        });
    }

    return next();
};

export const validateRole = (role = []) => (req, res, next) => !_.includes(role, req.user.profile.role) ?
    res.status(403).send({ statusCode: 403, message: 'Access denied', data: {} }) : next();
