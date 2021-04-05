import {
    loginAuthentication,
    listUserService,
    createUserService,
    updateUserService,
    deleteUserService,
    uploadUserAvatar,
    forgotPasswordService,
    createPasswordService
} from './user.process.js';
import { queryBuilder } from './user.validator.js';

export const login = async (req, res) => {
    const { statusCode, message, data } = await loginAuthentication({
        email: req.body.email,
        password: req.body.password
    });

    return res.status(statusCode).send({ statusCode, message, data });
};

export const listUser = async (req, res) => {
    const query = queryBuilder(req.query);

    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = parseInt(req.query.skip, 10) || 0;

    const { statusCode, message, data } = await listUserService(query, limit, skip, req.user);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const createUser = async (req, res) => {
    const { statusCode, message, data } = await createUserService(req.body);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const updateUser = async (req, res) => {
    // only admin can edit information all
    // or the user themselves
    if (req.user.profile.role !== 'admin' && req.user._id !== req.params.id) {
        return res.status(403).send({ statusCode: 403, message: 'Access denied', data: {} });
    }

    const { statusCode, message, data } = await updateUserService({ userId: req.params.id, data: req.body });

    return res.status(statusCode).send({ statusCode, message, data });
};

export const deleteUser = async (req, res) => {
    const { statusCode, message, data } = await deleteUserService({ userId: req.params.id });

    return res.status(statusCode).send({ statusCode, message, data });
};

export const uploadAvatar = async (req, res) => {
    const { statusCode, message, data } = await uploadUserAvatar({ userId: req.params.id, avatar: req.file });

    return res.status(statusCode).send({ statusCode, message, data });
};

export const forgotPassword = async (req, res) => {
    const { statusCode, message, data } = await forgotPasswordService({ email: req.body.email })

    return res.status(statusCode).send({ statusCode, message, data })
}

export const createPassword = async (req, res) => {
    const { statusCode, message, data } = await createPasswordService(req.body)

    return res.status(statusCode).send({ statusCode, message, data })
}
