import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            return res.status(401).send({ statusCode: 401, message: 'Not authorized', data: {} });
        }

        const token = req.headers.authorization.split(' ')[1];
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id });
        if (!user) {
            return res.status(404).send({ statusCode: 404, message: 'User not found', data: {} });
        }

        // assign to req params
        req.user = user;

        return next();
    } catch (error) {
        return res.status(401).send({ statusCode: 401, message: 'Not authorized', data: error });
    }
};
