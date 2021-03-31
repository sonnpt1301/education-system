import express from 'express';

import { validateRole, verifyToken, validateRequest } from '../middlewares/index.js';
import * as commentValidator from '../controllers/comment/comment.validator.js';
import * as commentController from '../controllers/comment/comment.handler.js';

const router = express.Router();

export default (prefix) => {
    prefix.use('/comments', verifyToken, router);

    router.get('/', commentController.listComment);
    router.post('/', commentValidator.createComment, validateRequest, commentController.createComment);
};
