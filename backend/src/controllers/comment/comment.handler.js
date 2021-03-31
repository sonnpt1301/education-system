import {
    listCommentService,
    createCommentService,
} from './comment.process.js';

export const listComment = async (req, res) => {
    if (!req.query.blog) {
        return res.status(400).send({ statusCode: 400, message: 'blog is required', data: {} });
    }

    const { statusCode, message, data } = await listCommentService(req.query);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const createComment = async (req, res) => {
    const { statusCode, message, data } = await createCommentService(req.body, req.user);

    return res.status(statusCode).send({ statusCode, message, data });
};
