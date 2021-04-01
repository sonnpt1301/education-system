import express from 'express';
import multer from 'multer';

import { validateRequest, validateRole, verifyToken } from '../middlewares/index.js';
import * as userValidator from '../controllers/user/user.validator.js';
import * as userController from '../controllers/user/user.handler.js';

const router = express.Router();

export default (prefix) => {
    prefix.use('/users', verifyToken, router);

    router.get('/', userController.listUser);
    router.post('/', userValidator.createUser, validateRequest, userController.createUser);
    router.put('/:id', userController.updateUser);
    router.delete('/:id', validateRole(['admin']), userController.deleteUser);

    router.post('/:id/avatar', multer({}).single('avatar'), userController.uploadAvatar);
    router.post('/forgotPassword', userController.forgotPassword)
    router.put('/reset-password/:token', userController.createPassword)
};
