import express from 'express';
import multer from 'multer';

import { validateRequest, validateRole, verifyToken } from '../middlewares/index.js';
import * as chatValidator from '../controllers/chat/chat.validator.js';
import * as chatController from '../controllers/chat/chat.handler.js';

const router = express.Router();

export default (prefix) => {
    prefix.use('/chats', verifyToken, router);

    router.get('/', chatController.getListMessage);
    router.post('/', chatController.createMessage)
};
